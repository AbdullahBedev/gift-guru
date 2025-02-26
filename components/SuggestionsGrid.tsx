"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import ReactConfetti from 'react-confetti';
import { MOCK_GIFTS } from '../lib/mockData';
import { Gift } from '../types';
import { calculateConfidenceScore, formatCurrency } from '../lib/utils';
import { Button } from './ui/button';

const SuggestionsGrid = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [savedGifts, setSavedGifts] = useState<string[]>([]);
  const [expandedReasoning, setExpandedReasoning] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<'relevance' | 'priceLowToHigh' | 'priceHighToLow'>('relevance');
  
  const handleSave = (id: string) => {
    if (!savedGifts.includes(id)) {
      setSavedGifts([...savedGifts, id]);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setSavedGifts(savedGifts.filter(giftId => giftId !== id));
    }
  };

  const sortedGifts = [...MOCK_GIFTS].sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'priceHighToLow') {
      return b.price - a.price;
    } else {
      // Sort by confidence score for relevance
      return b.confidenceScore - a.confidenceScore;
    }
  });

  return (
    <section id="suggestions-section" className="py-16 px-4 md:px-8 bg-neutral">
      {showConfetti && <ReactConfetti recycle={false} numberOfPieces={200} />}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-geist font-medium text-primary mb-2">Personalized Suggestions</h2>
            <p className="text-primary/70">Based on their interests, these gifts are perfect for your recipient.</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <select 
              className="bg-accent text-primary rounded-lg px-4 py-2 border border-primary/10"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedGifts.map((gift) => (
            <motion.div
              key={gift.id}
              whileHover={{ 
                scale: 1.03, 
                rotate: 1,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
              }}
              transition={{ duration: 0.3 }}
              className="bg-neutral border border-primary/10 rounded-lg overflow-hidden h-full shadow-md"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={gift.imageUrl} 
                  alt={gift.name} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                <div className="absolute top-2 right-2">
                  <div className="bg-secondary text-primary text-xs font-semibold py-1 px-2 rounded-full flex items-center">
                    <Icon icon="streamlinehq:magic-wand-1-magic-fantasy-spell" className="mr-1 w-3 h-3" />
                    {gift.confidenceScore}% Match
                  </div>
                </div>
                
                <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                  {gift.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-background/80 backdrop-blur-sm text-primary px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg">{gift.name}</h3>
                  <span className="font-medium text-primary">{formatCurrency(gift.price)}</span>
                </div>
                
                <p className="text-primary/70 text-sm mb-4 line-clamp-3">{gift.description}</p>
                
                <div className="flex justify-between items-center">
                  <Button
                    onClick={() => handleSave(gift.id)}
                    variant={savedGifts.includes(gift.id) ? "default" : "outline"}
                    size="sm"
                    className="flex items-center"
                  >
                    {savedGifts.includes(gift.id) ? (
                      <>
                        <Icon icon="streamlinehq:check-circle-1-interface-essential" className="mr-1 w-4 h-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Icon icon="streamlinehq:bookmark-1-interface-content" className="mr-1 w-4 h-4" />
                        Save
                      </>
                    )}
                  </Button>
                  
                  <button
                    onClick={() => setExpandedReasoning(expandedReasoning === gift.id ? null : gift.id)}
                    className="text-primary/60 hover:text-primary text-sm flex items-center"
                  >
                    Why This?
                    <Icon 
                      icon={expandedReasoning === gift.id 
                        ? "streamlinehq:arrow-up-1-arrows-chevrons" 
                        : "streamlinehq:arrow-down-1-arrows-chevrons"} 
                      className="ml-1 w-4 h-4" 
                    />
                  </button>
                </div>
                
                <AnimatePresence>
                  {expandedReasoning === gift.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-3 bg-secondary/30 backdrop-blur-sm rounded-lg text-xs text-primary/80"
                    >
                      <ul className="space-y-2">
                        {gift.matchReasons?.map((reason, idx) => (
                          <li key={idx} className="flex items-start">
                            <Icon icon="streamlinehq:magic-wand-1-magic-fantasy-spell" className="mr-2 w-4 h-4 flex-shrink-0 mt-0.5 text-secondary" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuggestionsGrid; 