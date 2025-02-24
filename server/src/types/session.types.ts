export interface Interest {
  category: string;
  subcategory?: string;
  confidence: number;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'facebook' | 'tiktok' | 'pinterest';
  url: string;
  verified: boolean;
}

export interface GifteeInfo {
  age?: number;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  occasion?: string;
  relationship?: string;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
}

export interface Session {
  sessionId: string;
  interests: Interest[];
  socialLinks?: SocialLink[];
  gifteeInfo?: GifteeInfo;
  uploadedFiles?: string[]; // Array of file URLs
  status: 'active' | 'completed' | 'expired';
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  lastActivity: Date;
} 