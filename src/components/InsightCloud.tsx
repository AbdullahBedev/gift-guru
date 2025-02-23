'use client';

import React from 'react';
import { motion } from 'framer-motion';

const tags = [
  { text: 'Coffee Lovers', delay: 0 },
  { text: 'Tech Enthusiasts', delay: 1 },
  { text: 'Book Readers', delay: 2 },
  { text: 'Plant Parents', delay: 0.5 },
  { text: 'Fitness Buffs', delay: 1.5 },
  { text: 'Art Collectors', delay: 2.5 },
  { text: 'Foodies', delay: 0.8 },
  { text: 'Music Lovers', delay: 1.8 },
];

// Custom floating animation paths
const floatingAnimations = [
  {
    y: [0, -15, 0],
    x: [0, 10, 0],
  },
  {
    y: [0, 15, 0],
    x: [0, -10, 0],
  },
  {
    y: [-8, 8, -8],
    x: [8, -8, 8],
  },
  {
    y: [10, -10, 10],
    x: [-5, 5, -5],
  },
];

const getTagPosition = (index: number, isMobile: boolean) => {
  if (isMobile) {
    // Mobile positions - more compact layout
    return {
      left: `${15 + (index % 3) * 30}%`,
      top: `${15 + Math.floor(index / 3) * 20}%`,
    };
  }
  // Desktop positions - more spread out
  return {
    left: `${20 + (index % 4) * 25}%`,
    top: `${15 + Math.floor(index / 4) * 25}%`,
  };
};

export const InsightCloud = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center overflow-hidden">
      {tags.map((tag, index) => {
        const animation = floatingAnimations[index % floatingAnimations.length];
        const position = getTagPosition(index, isMobile);

        return (
          <motion.div
            key={tag.text}
            className="absolute bg-primary-light px-4 sm:px-6 py-2 rounded-[10px] text-sm sm:text-base text-black font-medium 
                       shadow-lg hover:bg-primary transition-colors cursor-pointer whitespace-nowrap"
            style={position}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              ...animation,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: tag.delay,
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
          >
            {tag.text}
          </motion.div>
        );
      })}

      {/* Background decorative elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-primary opacity-10 top-1/4 left-1/4" />
        <div className="absolute w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-primary opacity-10 bottom-1/3 right-1/3" />
        <div className="absolute w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-secondary opacity-5 top-1/3 right-1/4" />
      </motion.div>
    </div>
  );
}; 