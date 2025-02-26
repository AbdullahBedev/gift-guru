"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-neutral py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Icon icon="streamlinehq:gift-box-1-gift-box-present-surprise" className="mr-2 text-accent w-6 h-6" />
              <span className="font-geist text-2xl font-medium">Gift Guru</span>
            </div>
            <p className="text-neutral/70 mb-6 max-w-md">
              Gift Guru uses AI to analyze social media profiles and interests to recommend the perfect gifts for your loved ones.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral/70 hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <Icon icon="mdi:twitter" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral/70 hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Icon icon="mdi:instagram" className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-neutral/70 hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Icon icon="mdi:facebook" className="w-6 h-6" />
              </motion.a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral/70 hover:text-accent transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-accent transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral/70 hover:text-accent transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-medium text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-neutral/70">
                <Icon icon="lucide:mail" className="w-4 h-4 mr-2" />
                <a href="mailto:hello@giftguru.com" className="hover:text-accent transition-colors">
                  hello@giftguru.com
                </a>
              </li>
              <li className="flex items-center text-neutral/70">
                <Icon icon="lucide:phone" className="w-4 h-4 mr-2" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start text-neutral/70">
                <Icon icon="lucide:map-pin" className="w-4 h-4 mr-2 mt-1" />
                <span>
                  123 Gift Street<br />
                  San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral/50 text-sm">
            &copy; {currentYear} Gift Guru. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-neutral/50 text-sm hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="text-neutral/50 text-sm hover:text-accent transition-colors">
              Terms
            </a>
            <a href="#" className="text-neutral/50 text-sm hover:text-accent transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 