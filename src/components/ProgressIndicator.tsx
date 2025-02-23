import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

const processingSteps = [
  "Analyzing preferences...",
  "Exploring gift ideas...",
  "Calculating relevance scores...",
  "Curating perfect matches...",
];

export const ProgressIndicator = () => {
  const { isHighContrast } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processingSteps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const dotVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.5, 1], transition: { duration: 1, repeat: Infinity } },
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-4 w-full max-w-md mx-auto">
      {/* Processing text */}
      <div className="relative h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className={`text-center text-lg font-medium ${
              isHighContrast ? 'text-white' : 'text-black'
            }`}
          >
            {processingSteps[currentStep]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Animated dots */}
      <div className="flex justify-center items-center space-x-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.2 }}
            className={`w-3 h-3 rounded-full ${
              isHighContrast
                ? 'bg-white'
                : 'bg-primary'
            }`}
          >
            {/* Pulse effect */}
            <motion.div
              className={`absolute w-full h-full rounded-full ${
                isHighContrast
                  ? 'bg-white/30'
                  : 'bg-primary/30'
              }`}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Progress ring */}
      <motion.div
        className="relative w-32 h-32"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            stroke={isHighContrast ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
            className="absolute"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="4"
            stroke={isHighContrast ? 'white' : 'var(--color-dark-pink)'}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative z-10"
          />
        </svg>
      </motion.div>

      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className={`absolute w-64 h-64 rounded-full ${
            isHighContrast
              ? 'bg-white/5'
              : 'bg-primary/5'
          }`}
          style={{
            top: '20%',
            left: '10%',
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute w-48 h-48 rounded-full ${
            isHighContrast
              ? 'bg-white/5'
              : 'bg-secondary/5'
          }`}
          style={{
            bottom: '20%',
            right: '10%',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}; 