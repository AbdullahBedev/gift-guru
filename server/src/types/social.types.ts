export interface SocialMediaPost {
  platform: string;
  id: string;
  content: string;
  timestamp: string;
  likes?: number;
  shares?: number;
  comments?: number;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}

export interface SocialMediaProfile {
  platform: string;
  username: string;
  displayName?: string;
  bio?: string;
  followers?: number;
  following?: number;
  interests?: string[];
  lastUpdated: string;
}

export interface SocialDataCache {
  sessionId: string;
  profiles: SocialMediaProfile[];
  recentPosts: SocialMediaPost[];
  interests: {
    category: string;
    confidence: number;
    source: string;
  }[];
  metadata: {
    lastScraped: string;
    platforms: string[];
    totalPostsAnalyzed: number;
  };
} 