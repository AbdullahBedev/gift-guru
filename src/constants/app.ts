export const APP_CONFIG = {
  name: 'Gift Guru',
  version: '0.1.0',
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    timeout: 10000,
  },
  social: {
    platforms: ['instagram', 'twitter', 'facebook', 'tiktok', 'pinterest'] as const,
    urlPatterns: {
      twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
      instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}$/,
      facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{1,}$/,
      tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9_.]{1,24}$/,
      pinterest: /^https?:\/\/(www\.)?pinterest\.com\/[a-zA-Z0-9_-]+\/?$/,
    },
  },
  ui: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif'],
    maxFiles: 5,
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  validation: {
    age: {
      min: 0,
      max: 150,
    },
    budget: {
      min: 0,
      max: 1000000,
    },
  },
} as const;

export const OCCASIONS = [
  'Birthday',
  'Anniversary',
  'Wedding',
  'Christmas',
  'Hanukkah',
  'Valentine\'s Day',
  'Mother\'s Day',
  'Father\'s Day',
  'Graduation',
  'Baby Shower',
  'House Warming',
  'Other',
] as const;

export const RELATIONSHIPS = [
  'Friend',
  'Family',
  'Significant Other',
  'Colleague',
  'Acquaintance',
  'Other',
] as const;

export const GENDERS = [
  'male',
  'female',
  'non-binary',
  'prefer-not-to-say',
] as const;

export type Platform = typeof APP_CONFIG.social.platforms[number];
export type Occasion = typeof OCCASIONS[number];
export type Relationship = typeof RELATIONSHIPS[number];
export type Gender = typeof GENDERS[number]; 