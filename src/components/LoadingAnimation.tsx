'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[200px]">
      <div className="relative w-32 h-32">
        {/* Gift Box SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          stroke="black"
          strokeWidth="2"
        >
          {/* Box base */}
          <motion.path
            d="M20 40 L80 40 L80 90 L20 90 L20 40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          
          {/* Box lid */}
          <motion.path
            d="M15 40 L85 40 L85 30 L15 30 L15 40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
          />
          
          {/* Ribbon vertical */}
          <motion.path
            d="M50 20 L50 90"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1, ease: "easeInOut" }}
          />
          
          {/* Ribbon horizontal */}
          <motion.path
            d="M20 40 L80 40"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: "easeInOut" }}
          />
          
          {/* Bow */}
          <motion.path
            d="M40 20 C45 15, 50 15, 50 20 C50 15, 55 15, 60 20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ease: "easeInOut" }}
          />

          {/* Fill Animation */}
          <motion.rect
            x="20"
            y="40"
            width="60"
            height="50"
            fill="#F5E1E5"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2.5, delay: 1.7, ease: "easeInOut" }}
            style={{ transformOrigin: '50% 100%' }}
          />
          
          {/* Lid Fill */}
          <motion.rect
            x="15"
            y="30"
            width="70"
            height="10"
            fill="#F5E1E5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Loading text */}
        <motion.p
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Finding perfect gifts...
        </motion.p>
      </div>
    </div>
  );
}; 