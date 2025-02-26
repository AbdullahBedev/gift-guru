"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import MultiStepForm from './MultiStepForm';
import { Button } from './ui/button';

const HeroSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="bg-primary w-full py-24 px-4 md:px-8 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="font-geist text-4xl md:text-5xl font-medium text-neutral mb-6 leading-tight">
          Find the Perfect Gift with <span className="text-accent">Gift Guru</span>
        </h1>
        <p className="text-neutral/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Connect your social media. We'll analyze interests and recommend gifts they'll actually love.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "loop" 
          }}
          className="relative px-8 py-3 bg-accent text-primary font-medium rounded-lg shadow-subtle overflow-hidden"
          onClick={() => setIsFormOpen(true)}
        >
          <span className="relative z-10 flex items-center">
            Get Started <Icon icon="streamlinehq:gift-box-1-gift-box-present-surprise" className="ml-2 w-5 h-5" />
          </span>
        </motion.button>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <motion.div
            className="bg-secondary rounded-full px-4 py-2 text-sm text-primary flex items-center animate-float-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Icon icon="streamlinehq:travel-airport-baggage-baggage-bag-suitcase-travel" className="mr-2" />
            Travel Enthusiasts
          </motion.div>
          
          <motion.div
            className="bg-secondary rounded-full px-4 py-2 text-sm text-primary flex items-center animate-float-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ animationDelay: "0.5s" }}
          >
            <Icon icon="streamlinehq:coffee-cup-1-coffee-cup-cafe-beverage-drink" className="mr-2" />
            Coffee Lovers
          </motion.div>
          
          <motion.div
            className="bg-secondary rounded-full px-4 py-2 text-sm text-primary flex items-center animate-float-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{ animationDelay: "1s" }}
          >
            <Icon icon="streamlinehq:book-open-book-library-read-textbook" className="mr-2" />
            Book Worms
          </motion.div>
          
          <motion.div
            className="bg-secondary rounded-full px-4 py-2 text-sm text-primary flex items-center animate-float-tag"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ animationDelay: "1.5s" }}
          >
            <Icon icon="streamlinehq:music-note-music-sound-melody" className="mr-2" />
            Music Enthusiasts
          </motion.div>
        </div>
      </motion.div>
      
      {/* Multi-step form modal */}
      <MultiStepForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
};

export default HeroSection; 