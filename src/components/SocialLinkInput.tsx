import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

type SocialLinkInputProps = {
  platform: 'twitter' | 'instagram';
  value: string;
  onChange: (value: string) => void;
  onValidation: (isValid: boolean) => void;
};

const SOCIAL_PATTERNS = {
  twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
  instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}$/,
};

const SOCIAL_PLACEHOLDERS = {
  twitter: 'https://twitter.com/username',
  instagram: 'https://instagram.com/username',
};

export const SocialLinkInput = ({ platform, value, onChange, onValidation }: SocialLinkInputProps) => {
  const { isHighContrast } = useTheme();
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const validateLink = (url: string) => {
    if (!url) {
      setError('');
      onValidation(true);
      return;
    }

    if (!SOCIAL_PATTERNS[platform].test(url)) {
      setError(`Invalid ${platform} profile URL`);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 1000);
      onValidation(false);
      return;
    }

    setError('');
    onValidation(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    validateLink(newValue);
  };

  return (
    <div className="relative">
      <motion.div
        animate={isShaking ? { x: [-4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <input
          type="url"
          value={value}
          onChange={handleChange}
          placeholder={SOCIAL_PLACEHOLDERS[platform]}
          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : isHighContrast
              ? 'border-white focus:border-white focus:ring-white'
              : 'border-black focus:border-primary focus:ring-primary'
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? `${platform}-error` : undefined}
        />
      </motion.div>

      {/* Error Tooltip */}
      {error && (
        <div
          ref={tooltipRef}
          role="alert"
          id={`${platform}-error`}
          className={`absolute left-0 -bottom-2 transform translate-y-full px-3 py-1 rounded text-sm
                     bg-secondary text-black shadow-lg z-10`}
        >
          {error}
          <div className="absolute -top-1 left-4 w-2 h-2 bg-secondary transform rotate-45" />
        </div>
      )}
    </div>
  );
}; 