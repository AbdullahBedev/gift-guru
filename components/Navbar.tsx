"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from './ui/button';
import MultiStepForm from './MultiStepForm';

const Navbar = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-neutral py-4 px-4 md:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.a 
          href="/" 
          className="font-geist text-2xl font-medium flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon="streamlinehq:gift-box-1-gift-box-present-surprise" className="mr-2 text-accent w-6 h-6" />
          Gift Guru
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#suggestions-section" className="hover:text-accent transition-colors">Suggestions</a>
          <a href="#" className="hover:text-accent transition-colors">How It Works</a>
          <a href="#" className="hover:text-accent transition-colors">About</a>
          <Button 
            onClick={() => setIsFormOpen(true)}
            className="bg-accent text-primary hover:bg-accent/90"
          >
            Get Started
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <Icon 
            icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"} 
            className="w-6 h-6" 
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary border-t border-neutral/10 mt-4"
          >
            <nav className="flex flex-col space-y-4 py-4 px-4">
              <a 
                href="#suggestions-section" 
                className="hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Suggestions
              </a>
              <a 
                href="#" 
                className="hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#" 
                className="hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <Button 
                onClick={() => {
                  setIsFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-accent text-primary hover:bg-accent/90 w-full"
              >
                Get Started
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Multi-step form modal */}
      <MultiStepForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </header>
  );
};

export default Navbar; 