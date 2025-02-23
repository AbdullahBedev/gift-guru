'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

type FilterProps = {
  onFiltersChange: (filters: {
    priceRange: [number, number];
    categories: string[];
    isEcoFriendly: boolean;
  }) => void;
  isExpanded: boolean;
};

const categories = [
  'Electronics',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Art & Crafts',
  'Music',
];

export const FilterSidebar = ({ onFiltersChange, isExpanded }: FilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);

  const handlePriceChange = (value: number) => {
    const newRange: [number, number] = [0, value];
    setPriceRange(newRange);
    updateFilters(newRange, selectedCategories, isEcoFriendly);
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
    updateFilters(priceRange, newCategories, isEcoFriendly);
  };

  const handleEcoToggle = () => {
    const newValue = !isEcoFriendly;
    setIsEcoFriendly(newValue);
    updateFilters(priceRange, selectedCategories, newValue);
  };

  const updateFilters = (
    price: [number, number],
    categories: Set<string>,
    eco: boolean
  ) => {
    onFiltersChange({
      priceRange: price,
      categories: Array.from(categories),
      isEcoFriendly: eco,
    });
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ 
        width: isExpanded ? 280 : 0,
        opacity: isExpanded ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white border-r border-gray-200 h-full overflow-hidden"
    >
      <div className="p-6 space-y-8">
        {/* Price Range */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              min={0}
              max={200}
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none bg-gray-200 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-[#F5E1E5] [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:bg-[#F5E1E5] [&::-moz-range-thumb]:border-0
                [&::-webkit-slider-runnable-track]:bg-[#F5E1E5]/30"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors w-full text-left
                  ${selectedCategories.has(category)
                    ? 'bg-[#F4EBC1] text-black'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Eco-Friendly Toggle */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Preferences</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Eco-Friendly Only</span>
            <button
              onClick={handleEcoToggle}
              className={`w-12 h-6 rounded-full transition-colors relative
                ${isEcoFriendly ? 'bg-[#F4EBC1]' : 'bg-gray-200'}`}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-white shadow-sm absolute top-0.5"
                initial={false}
                animate={{ 
                  left: isEcoFriendly ? '1.5rem' : '0.125rem',
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>

        {/* Applied Filters */}
        {(selectedCategories.size > 0 || isEcoFriendly) && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600">Applied Filters</h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(selectedCategories).map((category) => (
                <motion.span
                  key={category}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="px-2 py-1 bg-[#F4EBC1] rounded-full text-xs"
                >
                  {category}
                </motion.span>
              ))}
              {isEcoFriendly && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="px-2 py-1 bg-[#F5E1E5] rounded-full text-xs"
                >
                  Eco-Friendly
                </motion.span>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}; 