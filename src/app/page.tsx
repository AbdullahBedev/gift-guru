'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MultiStepForm } from '@/components/MultiStepForm';
import { InsightCloud } from '@/components/InsightCloud';
import { SuggestionsGrid } from '@/components/SuggestionsGrid';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="w-full bg-black text-white py-4 fixed top-0 z-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-[500] font-borna">Gift Guru</h1>
          
          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-12 h-12 bg-white flex flex-col justify-center items-center gap-1.5 p-3 transition-colors hover:bg-green"
            aria-label="Menu"
          >
            <span className="w-full h-0.5 bg-black"></span>
            <span className="w-full h-0.5 bg-black"></span>
            <span className="w-full h-0.5 bg-black"></span>
          </button>

          {/* Menu Overlay */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 px-4 sm:px-6 md:pt-32">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-center md:text-left"
            >
              <h2 className="text-[32px] font-[500] font-borna leading-tight">
                Discover Perfect Gifts with
                <span className="text-pink block font-borna">AI-Powered Recommendations</span>
              </h2>
              <p className="text-lg text-black">
                Gift Guru uses advanced AI to analyze preferences and suggest thoughtful, 
                personalized gifts that will delight your loved ones. Say goodbye to generic 
                gift ideas and hello to meaningful presents.
              </p>
            </motion.div>

            {/* Right Side - Insight Cloud */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full h-[400px] md:h-[500px] relative"
            >
              <InsightCloud />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-4 sm:px-6 bg-green mt-8">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-[500] font-borna mb-4 text-black">
              Let's Find Your Perfect Gift
            </h3>
            <p className="text-black">
              Fill in the details below and let our AI work its magic
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MultiStepForm />
          </motion.div>
        </div>
      </section>

      {/* Suggestions Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-[500] font-borna mb-4 text-black">
              Recommended Gifts
            </h3>
            <p className="text-black">
              Here are some thoughtfully curated suggestions based on your preferences
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SuggestionsGrid />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
