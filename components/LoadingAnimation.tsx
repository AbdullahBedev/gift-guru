"use client";

import React from 'react';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-20 h-20 relative">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Box outline */}
          <motion.path
            d="M10 25H70V70H10V25Z"
            stroke="#000000"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          
          {/* Box lid */}
          <motion.path
            d="M5 25L40 10L75 25"
            stroke="#000000"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.8 }}
          />
          
          {/* Ribbon vertical */}
          <motion.path
            d="M40 10V70"
            stroke="#000000"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.6 }}
          />
          
          {/* Ribbon horizontal */}
          <motion.path
            d="M10 40H70"
            stroke="#000000"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 1.6 }}
          />
          
          {/* Fill animation */}
          <motion.rect
            x="10"
            y="70"
            width="60"
            height="45"
            fill="#F5E1E5"
            initial={{ y: 70, height: 0 }}
            animate={{ y: 25, height: 45 }}
            transition={{ duration: 2.5, ease: "easeInOut", delay: 2.1 }}
          />
          
          {/* Bow */}
          <motion.path
            d="M32 15C32 15 36 5 40 10C44 15 48 5 48 15"
            stroke="#000000"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 2.2 }}
          />
          
          {/* Sparkles */}
          <motion.circle
            cx="20"
            cy="30"
            r="2"
            fill="#F5E1E5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.2 }}
          />
          <motion.circle
            cx="60"
            cy="50"
            r="2"
            fill="#F5E1E5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.8, delay: 0.3 }}
          />
          <motion.circle
            cx="30"
            cy="60"
            r="2"
            fill="#F5E1E5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1, delay: 0.6 }}
          />
        </svg>
      </div>
      
      <motion.p
        className="mt-4 text-sm font-medium text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Unwrapping gift ideas...
      </motion.p>
      
      <motion.div 
        className="mt-2 w-36 h-1 bg-neutral/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="h-full bg-secondary"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ 
            duration: 3, 
            ease: "easeInOut",
            repeat: Infinity
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation; 