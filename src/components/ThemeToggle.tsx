import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeToggle = () => {
  const { isHighContrast, toggleHighContrast } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleHighContrast();
    }
  };

  return (
    <motion.button
      onClick={toggleHighContrast}
      onKeyDown={handleKeyDown}
      className="fixed top-20 right-4 z-50 p-3 rounded-full bg-white border border-gray-200 shadow-lg
                focus:outline-none focus:ring-2 focus:ring-[#F5E1E5] focus:ring-offset-2
                hover:bg-gray-50 transition-colors"
      aria-label={`Switch to ${isHighContrast ? 'normal' : 'high contrast'} mode`}
      role="switch"
      aria-checked={isHighContrast}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={false}
    >
      <motion.div
        animate={{ rotate: isHighContrast ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isHighContrast ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}; 