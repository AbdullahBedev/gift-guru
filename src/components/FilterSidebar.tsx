'use client';

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useTheme } from '@/contexts/ThemeContext';

type FilterProps = {
  onFiltersChange: (filters: {
    priceRange: [number, number];
    categories: string[];
    isEcoFriendly: boolean;
  }) => void;
};

export const FilterSidebar: React.FC<FilterProps> = ({ onFiltersChange }) => {
  const { isHighContrast } = useTheme();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isEcoFriendly, setIsEcoFriendly] = useState(false);

  const categories = [
    { id: 'tech', label: 'Technology', icon: 'streamline-emojis:laptop-computer' },
    { id: 'home', label: 'Home & Living', icon: 'streamline-emojis:house' },
    { id: 'fashion', label: 'Fashion', icon: 'streamline-emojis:t-shirt' },
    { id: 'hobby', label: 'Hobbies', icon: 'streamline-emojis:artist-palette' },
    { id: 'books', label: 'Books & Media', icon: 'streamline-emojis:books' },
  ];

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    onFiltersChange({ priceRange: value, categories: selectedCategories, isEcoFriendly });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newCategories);
    onFiltersChange({ priceRange, categories: newCategories, isEcoFriendly });
  };

  const handleEcoFriendlyToggle = () => {
    const newValue = !isEcoFriendly;
    setIsEcoFriendly(newValue);
    onFiltersChange({ priceRange, categories: selectedCategories, isEcoFriendly: newValue });
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Icon icon="streamline-emojis:money-bag" className="w-5 h-5" />
          Price Range
        </h4>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[0]}
            onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Icon icon="streamline-emojis:bookmark-tabs" className="w-5 h-5" />
          Categories
        </h4>
        <div className="space-y-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                selectedCategories.includes(category.id)
                  ? 'bg-[#F5E1E5] text-black'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <Icon icon={category.icon} className="w-5 h-5" />
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <button
          onClick={handleEcoFriendlyToggle}
          className={`w-full px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            isEcoFriendly
              ? 'bg-[#F5E1E5] text-black'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Icon icon="streamline-emojis:recycling-symbol" className="w-5 h-5" />
          Eco-Friendly Only
        </button>
      </div>
    </div>
  );
}; 