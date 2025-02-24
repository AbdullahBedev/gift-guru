import { APP_CONFIG } from '@/constants/app';
import type { Platform } from '@/constants/app';

type AllowedFileType = typeof APP_CONFIG.ui.allowedFileTypes[number];

export const validateSocialLink = (url: string, platform: Platform): boolean => {
  if (!url) return false;
  const pattern = APP_CONFIG.social.urlPatterns[platform];
  return pattern.test(url);
};

export const validateAge = (age: number): boolean => {
  return age >= APP_CONFIG.validation.age.min && age <= APP_CONFIG.validation.age.max;
};

export const validateBudget = (amount: number): boolean => {
  return amount >= APP_CONFIG.validation.budget.min && amount <= APP_CONFIG.validation.budget.max;
};

export const validateFileUpload = (file: File): string | null => {
  if (file.size > APP_CONFIG.ui.maxFileSize) {
    return `File size must be less than ${APP_CONFIG.ui.maxFileSize / (1024 * 1024)}MB`;
  }
  
  if (!APP_CONFIG.ui.allowedFileTypes.includes(file.type as AllowedFileType)) {
    return `File type must be one of: ${APP_CONFIG.ui.allowedFileTypes.join(', ')}`;
  }
  
  return null;
};

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, '');
}; 