'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { SocialLinkInput } from './SocialLinkInput';
import { useTheme } from '@/contexts/ThemeContext';

type FormData = {
  recipientName: string;
  recipientAge: string;
  occasion: string;
  relationship: string;
  socialLink: string;
  attachments: File[];
  notes: string;
};

const initialFormData: FormData = {
  recipientName: '',
  recipientAge: '',
  occasion: '',
  relationship: '',
  socialLink: '',
  attachments: [],
  notes: '',
};

const validateSocialLink = (url: string): boolean => {
  if (!url) return true; // Empty is valid
  const socialPatterns = {
    twitter: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,15}$/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]{1,30}$/,
    facebook: /^https?:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9.]{1,}$/,
    tiktok: /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9_.]{1,24}$/,
    linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]{1,100}$/,
  };

  return Object.values(socialPatterns).some(pattern => pattern.test(url));
};

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLinkValid, setIsLinkValid] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isHighContrast } = useTheme();

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleSocialLinkChange = (value: string) => {
    updateFormData('socialLink', value);
    setIsLinkValid(validateSocialLink(value));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLinkValid) {
      return; // Don't submit if social link is invalid
    }
    console.log('Form submitted:', formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="streamline-emojis:sparkling-heart" className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Let's Get Started! ✨</h2>
            </div>
            <div className="relative">
              <label htmlFor="recipientName" className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Icon icon="streamline-emojis:waving-hand" className="w-5 h-5" />
                Recipient's Name
              </label>
              <input
                type="text"
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => updateFormData('recipientName', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors rounded-lg"
                placeholder="Enter their name"
              />
            </div>
            <div className="relative">
              <label htmlFor="recipientAge" className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Icon icon="streamline-emojis:birthday-cake" className="w-5 h-5" />
                Age Group
              </label>
              <select
                id="recipientAge"
                value={formData.recipientAge}
                onChange={(e) => updateFormData('recipientAge', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors rounded-lg"
              >
                <option value="">Select age group</option>
                <option value="Under 18">Under 18 🌱</option>
                <option value="18-30">18-30 ⭐</option>
                <option value="31-50">31-50 🌟</option>
                <option value="Over 50">Over 50 👑</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="streamline-emojis:party-popper" className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Tell us more! 🎉</h2>
            </div>
            <div className="relative">
              <label htmlFor="occasion" className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Icon icon="streamline-emojis:wrapped-gift" className="w-5 h-5" />
                Occasion
              </label>
              <select
                id="occasion"
                value={formData.occasion}
                onChange={(e) => updateFormData('occasion', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors rounded-lg"
              >
                <option value="">Select occasion</option>
                <option value="Birthday">Birthday 🎂</option>
                <option value="Anniversary">Anniversary 💑</option>
                <option value="Holiday">Holiday 🎄</option>
                <option value="Other">Other 🎁</option>
              </select>
            </div>
            <div className="relative">
              <label htmlFor="relationship" className="block text-sm font-medium mb-1 flex items-center gap-2">
                <Icon icon="streamline-emojis:red-heart" className="w-5 h-5" />
                Relationship
              </label>
              <select
                id="relationship"
                value={formData.relationship}
                onChange={(e) => updateFormData('relationship', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors rounded-lg"
              >
                <option value="">Select relationship</option>
                <option value="Family">Family 👨‍👩‍👧‍👦</option>
                <option value="Friend">Friend 🤝</option>
                <option value="Colleague">Colleague 💼</option>
                <option value="Other">Other 💝</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Icon icon="streamline-emojis:magnifying-glass" className="w-8 h-8" />
              <h2 className="text-xl font-semibold">Last step! 🎯</h2>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Icon icon="streamline-emojis:mobile-phone" className="w-5 h-5" />
                Social Media Profile
              </label>
              <input
                type="url"
                value={formData.socialLink}
                onChange={(e) => handleSocialLinkChange(e.target.value)}
                placeholder="Paste any social media profile URL"
                className={`w-full px-4 py-2 rounded-lg border transition-colors ${
                  !isLinkValid
                    ? 'border-red-500 focus:border-red-500'
                    : isHighContrast
                    ? 'border-white focus:border-white'
                    : 'border-black focus:border-primary'
                }`}
              />
              {!isLinkValid && (
                <p className="mt-1 text-sm text-red-500 flex items-center gap-2">
                  <Icon icon="streamline-emojis:warning-sign" className="w-4 h-4" />
                  Please enter a valid social media profile URL
                </p>
              )}
            </div>

            <div className="text-center py-4">
              <p className={`text-sm ${isHighContrast ? 'text-gray-300' : 'text-gray-600'} flex items-center justify-center gap-2`}>
                <Icon icon="streamline-emojis:locked" className="w-5 h-5" />
                Their account is private? No problem, show us some screenshots
              </p>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                  transition-colors hover:bg-gray-50 ${
                    isHighContrast
                      ? 'border-white hover:bg-gray-900'
                      : 'border-gray-300 hover:border-primary'
                  }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="space-y-2">
                  <svg
                    className={`w-8 h-8 mx-auto ${
                      isHighContrast ? 'text-white' : 'text-gray-400'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className={`text-sm ${
                    isHighContrast ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    Click to upload screenshots
                  </p>
                </div>
              </div>

              {formData.attachments.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {formData.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="relative group rounded-lg overflow-hidden"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                      <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white
                                 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Additional Notes
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors resize-none"
                rows={3}
                placeholder="Any additional information..."
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="relative h-1 mb-8 bg-gray-200 rounded">
        <motion.div
          className="absolute left-0 top-0 h-1 bg-secondary rounded"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">
          Step {step}: {step === 1 ? 'Recipient Details' : step === 2 ? 'Occasion' : 'Social Links'}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleBack}
            className={`px-4 py-2 rounded transition-colors ${
              step === 1
                ? 'opacity-50 cursor-not-allowed bg-gray-200'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            disabled={step === 1}
          >
            Back
          </button>
          <button
            type={step === 3 ? 'submit' : 'button'}
            onClick={step === 3 ? undefined : handleNext}
            className={`px-4 py-2 rounded transition-colors ${
              step === 3 && !isLinkValid
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
            disabled={step === 3 && !isLinkValid}
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}; 