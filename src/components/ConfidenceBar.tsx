import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

type ConfidenceBarProps = {
  confidence: number;
  className?: string;
};

export const ConfidenceBar = ({ confidence, className = '' }: ConfidenceBarProps) => {
  const { isHighContrast } = useTheme();

  return (
    <div 
      className={`relative h-2 w-24 rounded-full overflow-hidden ${className} ${
        isHighContrast ? 'bg-gray-800' : 'bg-gray-200'
      }`}
      role="progressbar"
      aria-valuenow={confidence}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${confidence}% confidence score`}
    >
      <div className={`absolute inset-0 ${
        isHighContrast 
          ? 'bg-gradient-to-r from-white/30 to-white/10'
          : 'bg-gradient-to-r from-primary/30 to-primary/10'
      }`} />
      <motion.div 
        className={`relative h-full rounded-full ${
          isHighContrast ? 'bg-white' : 'bg-primary'
        }`}
        initial={{ width: '0%' }}
        animate={{ width: `${confidence}%` }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className={`absolute inset-0 ${
          isHighContrast
            ? 'bg-gradient-to-r from-white to-white/80'
            : 'bg-gradient-to-r from-primary to-primary/80'
        }`} />
      </motion.div>
    </div>
  );
}; 