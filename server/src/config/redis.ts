import { createClient } from 'redis';
import logger from './logger.js';
import { SocialDataCache } from '../types/social.types.js';
import { GiftSuggestion } from '../services/gemini.service.js';

class RedisService {
  private static instance: RedisService;
  private client;
  private retryAttempts: number = 0;
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY_MS = 1000;
  private readonly DEFAULT_CACHE_TTL = parseInt(process.env.REDIS_CACHE_TTL || '86400');

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
      socket: {
        tls: process.env.REDIS_TLS_ENABLED === 'true',
        rejectUnauthorized: true,
        reconnectStrategy: (retries) => {
          if (retries >= this.MAX_RETRY_ATTEMPTS) {
            logger.error('Max Redis reconnection attempts reached');
            return new Error('Max reconnection attempts reached');
          }
          
          const delay = Math.min(retries * this.RETRY_DELAY_MS, 3000);
          logger.warn(`Retrying Redis connection in ${delay}ms... (Attempt ${retries + 1}/${this.MAX_RETRY_ATTEMPTS})`);
          return delay;
        }
      }
    });

    this.initializeClient();
  }

  private async initializeClient() {
    try {
      // Error handling
      this.client.on('error', (err) => {
        logger.error('Redis Client Error:', err);
      });

      this.client.on('connect', () => {
        logger.info('Redis Client Connected');
        this.retryAttempts = 0;
      });

      this.client.on('reconnecting', () => {
        this.retryAttempts++;
        logger.warn(`Redis Client Reconnecting... (Attempt ${this.retryAttempts}/${this.MAX_RETRY_ATTEMPTS})`);
      });

      await this.client.connect();
    } catch (error) {
      logger.error('Failed to initialize Redis client:', error);
      throw error;
    }
  }

  public static getInstance(): RedisService {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }
    return RedisService.instance;
  }

  // Cache social data with expiration
  public async cacheSocialData(
    sessionId: string, 
    data: SocialDataCache, 
    expirationSeconds: number = this.DEFAULT_CACHE_TTL
  ): Promise<void> {
    try {
      const key = `session:${sessionId}:social`;
      await this.client.setEx(key, expirationSeconds, JSON.stringify({
        ...data,
        metadata: {
          ...data.metadata,
          cachedAt: new Date().toISOString()
        }
      }));
      logger.debug(`Cached social data for session ${sessionId}, expires in ${expirationSeconds}s`);
    } catch (error) {
      logger.error(`Failed to cache social data for session ${sessionId}:`, error);
      throw error;
    }
  }

  // Get cached social data
  public async getSocialData(sessionId: string): Promise<SocialDataCache | null> {
    try {
      const key = `session:${sessionId}:social`;
      const data = await this.client.get(key);
      if (!data) {
        logger.debug(`No cached social data found for session ${sessionId}`);
        return null;
      }
      return JSON.parse(data) as SocialDataCache;
    } catch (error) {
      logger.error(`Failed to get social data for session ${sessionId}:`, error);
      throw error;
    }
  }

  // Delete cached social data
  public async deleteSocialData(sessionId: string): Promise<void> {
    try {
      const key = `session:${sessionId}:social`;
      await this.client.del(key);
      logger.debug(`Deleted social data for session ${sessionId}`);
    } catch (error) {
      logger.error(`Failed to delete social data for session ${sessionId}:`, error);
      throw error;
    }
  }

  // Cache gift suggestions
  public async cacheGiftSuggestions(
    sessionId: string,
    ageGroup: string,
    interests: string[],
    budget: number,
    suggestions: GiftSuggestion[],
    expirationSeconds: number = this.DEFAULT_CACHE_TTL
  ): Promise<void> {
    try {
      const key = this.buildSuggestionsCacheKey(sessionId, ageGroup, interests, budget);
      await this.client.setEx(key, expirationSeconds, JSON.stringify(suggestions));
      logger.debug(`Cached gift suggestions for session ${sessionId}`);
    } catch (error) {
      logger.error(`Failed to cache gift suggestions for session ${sessionId}:`, error);
      throw error;
    }
  }

  // Get cached gift suggestions
  public async getGiftSuggestions(
    sessionId: string,
    ageGroup: string,
    interests: string[],
    budget: number
  ): Promise<GiftSuggestion[] | null> {
    try {
      const key = this.buildSuggestionsCacheKey(sessionId, ageGroup, interests, budget);
      const data = await this.client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Failed to get gift suggestions for session ${sessionId}:`, error);
      throw error;
    }
  }

  // Delete all gift suggestions for a session
  public async deleteGiftSuggestions(sessionId: string): Promise<number> {
    try {
      const pattern = `suggestions:${sessionId}:*`;
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
      return keys.length;
    } catch (error) {
      logger.error(`Failed to delete gift suggestions for session ${sessionId}:`, error);
      throw error;
    }
  }

  private buildSuggestionsCacheKey(
    sessionId: string,
    ageGroup: string,
    interests: string[],
    budget: number
  ): string {
    return `suggestions:${sessionId}:${ageGroup}:${budget}:${interests.sort().join(',')}`;
  }

  // Check if client is connected
  public isConnected(): boolean {
    return this.client.isOpen;
  }

  // Graceful shutdown
  public async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      logger.info('Redis client disconnected');
    } catch (error) {
      logger.error('Error disconnecting Redis client:', error);
      throw error;
    }
  }
}

export default RedisService; 