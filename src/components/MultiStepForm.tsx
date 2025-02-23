'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialLinkInput } from './SocialLinkInput';

type FormData = {
  recipientName: string;
  recipientAge: string;
  occasion: string;
  relationship: string;
  socialLinks: {
    twitter: string;
    instagram: string;
  };
  notes: string;
};

const initialFormData: FormData = {
  recipientName: '',
  recipientAge: '',
  occasion: '',
  relationship: '',
  socialLinks: {
    twitter: '',
    instagram: '',
  },
  notes: '',
};

export const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [socialValidation, setSocialValidation] = useState({
    twitter: true,
    instagram: true,
  });

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSocialLink = (platform: 'twitter' | 'instagram', value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSocialValidation = (platform: 'twitter' | 'instagram', isValid: boolean) => {
    setSocialValidation(prev => ({
      ...prev,
      [platform]: isValid,
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialValidation.twitter || !socialValidation.instagram) {
      return; // Don't submit if social links are invalid
    }
    console.log('Form submitted:', formData);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="recipientName" className="block text-sm font-medium mb-1">
                Recipient's Name
              </label>
              <input
                type="text"
                id="recipientName"
                value={formData.recipientName}
                onChange={(e) => updateFormData('recipientName', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="recipientAge" className="block text-sm font-medium mb-1">
                Age Group
              </label>
              <select
                id="recipientAge"
                value={formData.recipientAge}
                onChange={(e) => updateFormData('recipientAge', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors"
              >
                <option value="">Select age group</option>
                <option value="Under 18">Under 18</option>
                <option value="18-30">18-30</option>
                <option value="31-50">31-50</option>
                <option value="Over 50">Over 50</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="occasion" className="block text-sm font-medium mb-1">
                Occasion
              </label>
              <select
                id="occasion"
                value={formData.occasion}
                onChange={(e) => updateFormData('occasion', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors"
              >
                <option value="">Select occasion</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Holiday">Holiday</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="relationship" className="block text-sm font-medium mb-1">
                Relationship
              </label>
              <select
                id="relationship"
                value={formData.relationship}
                onChange={(e) => updateFormData('relationship', e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-b-2 border-gray-200 focus:border-[#F5E1E5] focus:outline-none transition-colors"
              >
                <option value="">Select relationship</option>
                <option value="Family">Family</option>
                <option value="Friend">Friend</option>
                <option value="Colleague">Colleague</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">
                Social Media Links
              </label>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Twitter Profile</label>
                  <SocialLinkInput
                    platform="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(value) => updateSocialLink('twitter', value)}
                    onValidation={(isValid) => handleSocialValidation('twitter', isValid)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Instagram Profile</label>
                  <SocialLinkInput
                    platform="instagram"
                    value={formData.socialLinks.instagram}
                    onChange={(value) => updateSocialLink('instagram', value)}
                    onValidation={(isValid) => handleSocialValidation('instagram', isValid)}
                  />
                </div>
              </div>
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
      {/* Progress bar */}
      <div className="relative h-1 mb-8 bg-gray-200 rounded">
        <motion.div
          className="absolute left-0 top-0 h-1 bg-secondary rounded"
          initial={{ width: '0%' }}
          animate={{ width: `${(step / 3) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step indicator */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-semibold">
          Step {step}: {step === 1 ? 'Recipient Details' : step === 2 ? 'Occasion' : 'Social Links'}
        </h2>
      </div>

      {/* Form */}
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

        {/* Navigation buttons */}
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
              step === 3 && (!socialValidation.twitter || !socialValidation.instagram)
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
            disabled={step === 3 && (!socialValidation.twitter || !socialValidation.instagram)}
          >
            {step === 3 ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}; 