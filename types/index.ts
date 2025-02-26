// Define person-related types
export type Person = {
  id: string;
  name: string;
  age?: number;
  gender?: string;
  interests: string[];
  relationship?: string;
  budget?: number;
  occasion?: string;
  socialMediaProfiles?: SocialMediaProfile[];
};

export type SocialMediaProfile = {
  platform: 'instagram' | 'twitter' | 'facebook' | 'linkedin' | 'tiktok' | 'pinterest';
  username: string;
  profileUrl?: string;
  insights?: SocialMediaInsights;
};

export type SocialMediaInsights = {
  topInterests?: string[];
  recentActivity?: string[];
  followedAccounts?: string[];
  engagementTopics?: string[];
};

// Define gift-related types
export type Gift = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  affiliateLink?: string;
  tags: string[];
  confidenceScore: number;
  matchReasons?: string[];
};

export type GiftCollection = {
  id: string;
  title: string;
  description: string;
  gifts: Gift[];
};

// Define form and user interaction types
export type FormStepType = 
  | 'basicInfo' 
  | 'interests' 
  | 'socialMedia' 
  | 'budget' 
  | 'occasion' 
  | 'additional';

export type FormState = {
  currentStep: FormStepType;
  person: Person;
  isSubmitting: boolean;
  errors: Record<string, string>;
};

export type SortOption = 'relevance' | 'priceLowToHigh' | 'priceHighToLow';

export type FilterOptions = {
  priceRange: [number, number];
  categories: string[];
  sort: SortOption;
}; 