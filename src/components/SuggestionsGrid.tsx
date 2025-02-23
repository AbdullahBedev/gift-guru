'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { LoadingAnimation } from './LoadingAnimation';
import { FilterSidebar } from './FilterSidebar';
import { ConfidenceBar } from './ConfidenceBar';
import { useTheme } from '@/contexts/ThemeContext';
import { LazyImage } from './LazyImage';
import { ShareModal } from './ShareModal';
import { ProgressIndicator } from './ProgressIndicator';

type Suggestion = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  confidence: number;
  reasoning: {
    points: string[];
    matchScore: number;
  };
};

const mockSuggestions: Suggestion[] = [
  {
    id: '1',
    title: 'Premium Coffee Maker',
    description: 'Perfect for coffee enthusiasts. Features precision temperature control and timer.',
    price: '$149.99',
    imageUrl: '/coffee-maker.jpg', // Will be added later
    confidence: 92,
    reasoning: {
      points: [
        'Matches their daily coffee ritual mentioned in social posts',
        'Aligns with their interest in premium kitchen gadgets',
        'Perfect for their morning routine based on Twitter activity'
      ],
      matchScore: 92
    }
  },
  {
    id: '2',
    title: 'Wireless Noise-Canceling Headphones',
    description: 'High-quality sound with active noise cancellation for immersive listening.',
    price: '$199.99',
    imageUrl: '/headphones.jpg',
    confidence: 88,
    reasoning: {
      points: [
        'Frequent posts about music and podcasts',
        'Mentions of working in noisy environments',
        'Complements their tech-savvy lifestyle'
      ],
      matchScore: 88
    }
  },
  {
    id: '3',
    title: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance indoor plants perfect for any space.',
    price: '$79.99',
    imageUrl: '/plants.jpg',
    confidence: 85,
    reasoning: {
      points: [
        'Instagram posts show interest in home decoration',
        'Recent likes on sustainable living content',
        'Mentioned wanting to improve home air quality'
      ],
      matchScore: 85
    }
  },
  {
    id: '4',
    title: 'Art Print Set',
    description: 'Collection of 3 modern art prints with elegant frames.',
    price: '$129.99',
    imageUrl: '/art-prints.jpg',
    confidence: 82,
    reasoning: {
      points: [
        'Follows multiple art-related accounts',
        'Recently moved to a new space (based on posts)',
        'Expressed interest in modern design'
      ],
      matchScore: 82
    }
  },
  {
    id: '5',
    title: 'Gourmet Cooking Set',
    description: 'Professional-grade cooking utensils and spices collection.',
    price: '$169.99',
    imageUrl: '/cooking-set.jpg',
    confidence: 90,
    reasoning: {
      points: [
        'Frequently shares cooking recipes on social media',
        'Recently started following celebrity chefs',
        'Mentioned wanting to improve cooking skills'
      ],
      matchScore: 90
    }
  },
  {
    id: '6',
    title: 'Vinyl Record Player',
    description: 'Classic turntable with modern Bluetooth connectivity.',
    price: '$159.99',
    imageUrl: '/record-player.jpg',
    confidence: 87,
    reasoning: {
      points: [
        'Strong engagement with vinyl collecting communities',
        'Posts about vintage music appreciation',
        'Interest in both classic and modern audio tech'
      ],
      matchScore: 87
    }
  },
];

// Add this new component for the ripple effect
const RippleButton = ({ onClick, disabled, children, className, ariaLabel }: {
  onClick: (e: React.MouseEvent) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const { isHighContrast } = useTheme();

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = Date.now();
    setRipples(prev => [...prev, { x, y, id }]);
    onClick(e);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#F5E1E5] focus:ring-offset-2 ${className}`}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute rounded-full w-4 h-4 pointer-events-none ${
            isHighContrast ? 'bg-black' : 'bg-white'
          }`}
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
          }}
        />
      ))}
      {children}
    </button>
  );
};

// Add the WhyThisToggle component
const WhyThisToggle = ({ reasoning }: { reasoning: Suggestion['reasoning'] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isHighContrast } = useTheme();

  return (
    <div className="absolute top-2 right-2 z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-2 py-1 text-sm font-medium rounded-lg transition-colors
          ${isHighContrast
            ? 'bg-white text-black hover:bg-gray-200'
            : 'bg-black/5 hover:bg-black/10 text-black'
          }`}
        aria-expanded={isOpen}
      >
        Why This?
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-64 p-4 rounded-lg bg-[#F4EBC1] shadow-lg"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-black">Match Score</span>
                <span className="text-sm font-bold text-black">{reasoning.matchScore}%</span>
              </div>
              <ul className="space-y-2">
                {reasoning.points.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-sm text-black/80 flex items-start gap-2"
                  >
                    <span className="mt-1">•</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SuggestionsGrid = () => {
  const { isHighContrast } = useTheme();
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState(mockSuggestions);
  const [shareModalData, setShareModalData] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: '',
    url: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2700);

    return () => clearTimeout(timer);
  }, []);

  const handleFiltersChange = (filters: {
    priceRange: [number, number];
    categories: string[];
    isEcoFriendly: boolean;
  }) => {
    const filtered = mockSuggestions.filter(suggestion => {
      const price = parseFloat(suggestion.price.replace('$', ''));
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];
      
      const matchesCategory = filters.categories.length === 0 || filters.categories.some(cat => 
        suggestion.title.toLowerCase().includes(cat.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(cat.toLowerCase())
      );

      // For demo purposes, consider items under $100 as eco-friendly
      const isEco = parseFloat(suggestion.price.replace('$', '')) < 100;
      const matchesEco = !filters.isEcoFriendly || isEco;

      return matchesPrice && matchesCategory && matchesEco;
    });

    setFilteredSuggestions(filtered);
  };

  const handleSave = (id: string, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setConfettiPosition({
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    });
    
    setSavedItems(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleShare = (suggestion: Suggestion) => {
    setShareModalData({
      isOpen: true,
      title: suggestion.title,
      url: `${window.location.origin}/gift/${suggestion.id}`,
    });
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="status"
          aria-label="Loading suggestions"
          className="min-h-[500px] flex items-center justify-center"
        >
          <ProgressIndicator />
        </motion.div>
      ) : (
        <div className="relative flex">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`fixed left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-r-lg shadow-lg z-10
                     border border-l-0 focus:outline-none focus:ring-2 focus:ring-[#F5E1E5] focus:ring-offset-2
                     transition-colors ${
                       isHighContrast 
                         ? 'bg-black text-white hover:bg-gray-900 border-white' 
                         : 'bg-white text-black hover:bg-gray-50 border-gray-200'
                     }`}
            aria-expanded={isFilterOpen}
            aria-controls="filter-sidebar"
            aria-label={`${isFilterOpen ? 'Hide' : 'Show'} filters`}
          >
            <svg
              className={`w-6 h-6 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </button>

          {/* Filter Sidebar */}
          <FilterSidebar
            isExpanded={isFilterOpen}
            onFiltersChange={handleFiltersChange}
          />

          {/* Grid */}
          <motion.div
            key="suggestions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
            role="grid"
            aria-label="Gift suggestions"
          >
            {showConfetti && (
              <Confetti
                numberOfPieces={100}
                recycle={false}
                colors={isHighContrast ? ['#FFFFFF', '#000000'] : ['var(--color-dark-pink)', 'var(--color-dark-yellow)', '#000000']}
                confettiSource={{
                  x: confettiPosition.x,
                  y: confettiPosition.y,
                  w: 0,
                  h: 0,
                }}
              />
            )}
            
            {filteredSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.2 }
                }}
                role="gridcell"
                tabIndex={0}
              >
                <div 
                  className={`relative w-full h-[320px] rounded-lg overflow-hidden shadow-sm hover:shadow-lg 
                           transition-shadow duration-200 ${
                             isHighContrast 
                               ? 'bg-black text-white border-2 border-white' 
                               : 'bg-white text-black border border-black'
                           }`}
                >
                  <WhyThisToggle reasoning={suggestion.reasoning} />
                  
                  {/* Replace image placeholder with LazyImage */}
                  <LazyImage
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-full h-40"
                  />

                  {/* Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-lg leading-tight">{suggestion.title}</h3>
                      <span className="text-sm font-medium">{suggestion.price}</span>
                    </div>
                    
                    <p className={`text-sm line-clamp-2 ${
                      isHighContrast ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {suggestion.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2" aria-label={`${suggestion.confidence}% confidence score`}>
                        <ConfidenceBar confidence={suggestion.confidence} />
                        <span className={`text-sm ${
                          isHighContrast ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {suggestion.confidence}%
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <RippleButton
                          onClick={(e) => handleSave(suggestion.id, e)}
                          disabled={savedItems.has(suggestion.id)}
                          ariaLabel={`${savedItems.has(suggestion.id) ? 'Already saved' : 'Save'} ${suggestion.title}`}
                          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                            savedItems.has(suggestion.id)
                              ? isHighContrast
                                ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : isHighContrast
                                ? 'bg-white text-black hover:bg-gray-200'
                                : 'bg-[#F5E1E5] hover:bg-[#f0d0d4] text-black'
                          }`}
                        >
                          {savedItems.has(suggestion.id) ? 'Saved' : 'Save'}
                        </RippleButton>

                        <RippleButton
                          onClick={() => handleShare(suggestion)}
                          ariaLabel={`Share ${suggestion.title}`}
                          className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                            isHighContrast
                              ? 'bg-white text-black hover:bg-gray-200'
                              : 'bg-black text-white hover:bg-gray-900'
                          }`}
                        >
                          Share
                        </RippleButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Share Modal */}
          <ShareModal
            isOpen={shareModalData.isOpen}
            onClose={() => setShareModalData(prev => ({ ...prev, isOpen: false }))}
            title={shareModalData.title}
            url={shareModalData.url}
          />
        </div>
      )}
    </AnimatePresence>
  );
}; 