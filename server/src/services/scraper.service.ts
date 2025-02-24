import axios, { AxiosError } from 'axios';
import natural from 'natural';
import { backOff } from 'exponential-backoff';
import RedisService from '../config/redis';
import logger from '../config/logger';
import { SocialMediaPost, SocialMediaProfile, SocialDataCache } from '../types/social.types';

export class SocialMediaScraper {
  private readonly tokenizer: natural.WordTokenizer;
  private readonly tfidf: natural.TfIdf;
  private readonly redis: RedisService;
  private readonly stopwords: Set<string>;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.tfidf = new natural.TfIdf();
    this.redis = RedisService.getInstance();
    this.stopwords = new Set(natural.stopwords);
  }

  private async fetchWithRetry<T>(url: string, options: any = {}): Promise<T> {
    const operation = async () => {
      try {
        const response = await axios.get<T>(url, {
          ...options,
          headers: {
            'Accept': 'application/json',
            ...options.headers
          }
        });
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 429) {
          logger.warn(`Rate limit hit for ${url}, retrying...`);
          throw error; // This will trigger backoff retry
        }
        throw error;
      }
    };

    return backOff(operation, {
      numOfAttempts: parseInt(process.env.SCRAPER_RETRY_COUNT || '3'),
      startingDelay: parseInt(process.env.SCRAPER_INITIAL_DELAY || '500'),
      timeMultiple: 2,
      maxDelay: 4000,
      retry: (error: any) => {
        return error instanceof AxiosError && error.response?.status === 429;
      }
    });
  }

  private async fetchInstagramPosts(userId: string, maxPosts: number = 50): Promise<SocialMediaPost[]> {
    const posts: SocialMediaPost[] = [];
    let nextCursor = '';

    try {
      while (posts.length < maxPosts) {
        const url = `${process.env.INSTAGRAM_BASE_URL}/${process.env.INSTAGRAM_API_VERSION}/${userId}/media`;
        const response = await this.fetchWithRetry<any>(url, {
          params: {
            access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
            fields: 'id,caption,media_type,media_url,timestamp,like_count,comments_count',
            limit: Math.min(25, maxPosts - posts.length),
            after: nextCursor
          }
        });

        const newPosts = response.data.map((post: any) => ({
          platform: 'instagram',
          id: post.id,
          content: post.caption || '',
          timestamp: post.timestamp,
          likes: post.like_count,
          comments: post.comments_count,
          media: post.media_url ? [{
            type: post.media_type.toLowerCase(),
            url: post.media_url
          }] : undefined
        }));

        posts.push(...newPosts);

        if (!response.paging?.cursors?.after || posts.length >= maxPosts) {
          break;
        }
        nextCursor = response.paging.cursors.after;
      }

      return posts.slice(0, maxPosts);
    } catch (error) {
      logger.error('Error fetching Instagram posts:', error);
      throw error;
    }
  }

  private async fetchInstagramProfile(userId: string): Promise<SocialMediaProfile> {
    try {
      const url = `${process.env.INSTAGRAM_BASE_URL}/${process.env.INSTAGRAM_API_VERSION}/${userId}`;
      const response = await this.fetchWithRetry<any>(url, {
        params: {
          access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
          fields: 'username,name,biography,followers_count,follows_count'
        }
      });

      return {
        platform: 'instagram',
        username: response.username,
        displayName: response.name,
        bio: response.biography,
        followers: response.followers_count,
        following: response.follows_count,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      logger.error('Error fetching Instagram profile:', error);
      throw error;
    }
  }

  private extractKeywords(posts: SocialMediaPost[]): { category: string; confidence: number; source: string; }[] {
    // Combine all post content
    const allContent = posts.map(post => post.content).join(' ');
    
    // Tokenize and remove stopwords
    const tokens = this.tokenizer.tokenize(allContent)
      ?.filter(token => !this.stopwords.has(token.toLowerCase())) || [];

    // Add document to TF-IDF
    this.tfidf.addDocument(tokens);

    // Get terms with their weights
    const terms: { term: string; weight: number }[] = [];
    this.tfidf.listTerms(0).forEach(item => {
      terms.push({ term: item.term, weight: item.tfidf });
    });

    // Sort by weight and get top 10
    return terms
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 10)
      .map(term => ({
        category: term.term,
        confidence: Math.min(term.weight / Math.max(...terms.map(t => t.weight)), 1),
        source: 'tf-idf-analysis'
      }));
  }

  public async scrapeAndAnalyze(sessionId: string, instagramUserId: string): Promise<void> {
    try {
      // Check cache first
      const cachedData = await this.redis.getSocialData(sessionId);
      if (cachedData) {
        logger.info(`Using cached social data for session ${sessionId}`);
        return;
      }

      // Fetch data
      const [posts, profile] = await Promise.all([
        this.fetchInstagramPosts(instagramUserId),
        this.fetchInstagramProfile(instagramUserId)
      ]);

      // Extract interests using TF-IDF
      const interests = this.extractKeywords(posts);

      // Prepare cache data
      const socialData: SocialDataCache = {
        sessionId,
        profiles: [profile],
        recentPosts: posts,
        interests,
        metadata: {
          lastScraped: new Date().toISOString(),
          platforms: ['instagram'],
          totalPostsAnalyzed: posts.length
        }
      };

      // Cache the results
      await this.redis.cacheSocialData(
        sessionId,
        socialData,
        parseInt(process.env.SCRAPER_CACHE_TTL || '3600')
      );

      logger.info(`Successfully scraped and analyzed social data for session ${sessionId}`);
    } catch (error) {
      logger.error(`Error in scrapeAndAnalyze for session ${sessionId}:`, error);
      throw error;
    }
  }
}

export default new SocialMediaScraper(); 