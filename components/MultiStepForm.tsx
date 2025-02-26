"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useForm, validateName, validateInterests, validateBudget, validateOccasion, validateSocialUsername } from './FormProvider';
import { FormStepType, SocialMediaProfile } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import LoadingAnimation from './LoadingAnimation';

// Common interests for selection
const COMMON_INTERESTS = [
  'Music', 'Reading', 'Travel', 'Cooking', 'Fitness', 'Gaming', 
  'Art', 'Photography', 'Technology', 'Fashion', 'Sports', 'Movies',
  'Gardening', 'Hiking', 'Yoga', 'Coffee', 'Wine', 'Pets', 'DIY',
  'Meditation', 'Dancing', 'Writing', 'Cycling', 'Camping'
];

// Common occasions
const OCCASIONS = [
  'Birthday', 'Anniversary', 'Wedding', 'Graduation', 'Christmas',
  'Housewarming', 'Baby Shower', 'Retirement', 'Valentine\'s Day',
  'Mother\'s Day', 'Father\'s Day', 'Just Because', 'Thank You'
];

// Social media platforms
const SOCIAL_PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: 'mdi:instagram' },
  { id: 'twitter', name: 'Twitter', icon: 'mdi:twitter' },
  { id: 'facebook', name: 'Facebook', icon: 'mdi:facebook' },
  { id: 'tiktok', name: 'TikTok', icon: 'ic:baseline-tiktok' },
  { id: 'pinterest', name: 'Pinterest', icon: 'mdi:pinterest' },
  { id: 'linkedin', name: 'LinkedIn', icon: 'mdi:linkedin' }
];

const MultiStepForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { state, dispatch } = useForm();
  const [customInterest, setCustomInterest] = useState('');
  const [socialPlatform, setSocialPlatform] = useState<string>('instagram');
  const [socialUsername, setSocialUsername] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Reset form when dialog is opened
  useEffect(() => {
    if (isOpen) {
      dispatch({ type: 'RESET_FORM' });
    }
  }, [isOpen, dispatch]);

  const handleNextStep = () => {
    const currentStep = state.currentStep;
    let isValid = true;
    let nextStep: FormStepType = 'basicInfo';

    // Validate current step
    switch (currentStep) {
      case 'basicInfo':
        const nameError = validateName(state.person.name);
        if (nameError) {
          dispatch({ 
            type: 'SET_ERROR', 
            payload: { field: 'name', message: nameError } 
          });
          isValid = false;
        }
        nextStep = 'interests';
        break;
      
      case 'interests':
        const interestsError = validateInterests(state.person.interests);
        if (interestsError) {
          dispatch({ 
            type: 'SET_ERROR', 
            payload: { field: 'interests', message: interestsError } 
          });
          isValid = false;
        }
        nextStep = 'socialMedia';
        break;
      
      case 'socialMedia':
        nextStep = 'budget';
        break;
      
      case 'budget':
        const budgetError = validateBudget(state.person.budget);
        if (budgetError) {
          dispatch({ 
            type: 'SET_ERROR', 
            payload: { field: 'budget', message: budgetError } 
          });
          isValid = false;
        }
        nextStep = 'occasion';
        break;
      
      case 'occasion':
        const occasionError = validateOccasion(state.person.occasion);
        if (occasionError) {
          dispatch({ 
            type: 'SET_ERROR', 
            payload: { field: 'occasion', message: occasionError } 
          });
          isValid = false;
        }
        nextStep = 'additional';
        break;
      
      case 'additional':
        // Submit the form
        handleSubmit();
        return;
    }

    if (isValid) {
      dispatch({ type: 'SET_STEP', payload: nextStep });
    }
  };

  const handlePrevStep = () => {
    const currentStep = state.currentStep;
    let prevStep: FormStepType = 'basicInfo';

    switch (currentStep) {
      case 'interests':
        prevStep = 'basicInfo';
        break;
      case 'socialMedia':
        prevStep = 'interests';
        break;
      case 'budget':
        prevStep = 'socialMedia';
        break;
      case 'occasion':
        prevStep = 'budget';
        break;
      case 'additional':
        prevStep = 'occasion';
        break;
      default:
        prevStep = 'basicInfo';
    }

    dispatch({ type: 'SET_STEP', payload: prevStep });
  };

  const handleSubmit = () => {
    dispatch({ type: 'SET_SUBMITTING', payload: true });
    setIsAnalyzing(true);
    
    // Simulate API call to analyze data and generate recommendations
    setTimeout(() => {
      setIsAnalyzing(false);
      dispatch({ type: 'SET_SUBMITTING', payload: false });
      onClose();
      
      // Scroll to suggestions section
      const suggestionsSection = document.getElementById('suggestions-section');
      if (suggestionsSection) {
        suggestionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 3000);
  };

  const handleInterestToggle = (interest: string) => {
    const currentInterests = [...state.person.interests];
    const index = currentInterests.indexOf(interest);
    
    if (index === -1) {
      // Add interest
      dispatch({ 
        type: 'UPDATE_PERSON', 
        payload: { interests: [...currentInterests, interest] } 
      });
    } else {
      // Remove interest
      currentInterests.splice(index, 1);
      dispatch({ 
        type: 'UPDATE_PERSON', 
        payload: { interests: currentInterests } 
      });
    }
  };

  const handleAddCustomInterest = () => {
    if (customInterest.trim() && !state.person.interests.includes(customInterest.trim())) {
      dispatch({ 
        type: 'UPDATE_PERSON', 
        payload: { interests: [...state.person.interests, customInterest.trim()] } 
      });
      setCustomInterest('');
    }
  };

  const handleAddSocialProfile = () => {
    const error = validateSocialUsername(socialUsername);
    if (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: { field: 'socialUsername', message: error } 
      });
      return;
    }

    dispatch({ 
      type: 'ADD_SOCIAL_PROFILE', 
      payload: { platform: socialPlatform, username: socialUsername } 
    });
    
    setSocialUsername('');
    dispatch({ type: 'CLEAR_ERROR', payload: 'socialUsername' });
  };

  const handleRemoveSocialProfile = (platform: string) => {
    dispatch({ type: 'REMOVE_SOCIAL_PROFILE', payload: platform });
  };

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 'basicInfo':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipientName">Who are you shopping for?</Label>
              <Input
                id="recipientName"
                placeholder="Enter their name"
                value={state.person.name}
                onChange={(e) => {
                  dispatch({ 
                    type: 'UPDATE_PERSON', 
                    payload: { name: e.target.value } 
                  });
                  dispatch({ type: 'CLEAR_ERROR', payload: 'name' });
                }}
                className={state.errors.name ? 'border-red-500' : ''}
              />
              {state.errors.name && (
                <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="relationship">What's your relationship?</Label>
              <select
                id="relationship"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={state.person.relationship || ''}
                onChange={(e) => dispatch({ 
                  type: 'UPDATE_PERSON', 
                  payload: { relationship: e.target.value } 
                })}
              >
                <option value="">Select relationship</option>
                <option value="friend">Friend</option>
                <option value="partner">Partner/Spouse</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
                <option value="child">Child</option>
                <option value="coworker">Coworker</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">How old are they?</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter their age"
                value={state.person.age || ''}
                onChange={(e) => dispatch({ 
                  type: 'UPDATE_PERSON', 
                  payload: { age: parseInt(e.target.value) || undefined } 
                })}
              />
            </div>
          </div>
        );
      
      case 'interests':
        return (
          <div className="space-y-4">
            <div>
              <Label className="block mb-2">What are their interests?</Label>
              {state.errors.interests && (
                <p className="text-red-500 text-xs mb-2">{state.errors.interests}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                {COMMON_INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      state.person.interests.includes(interest)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-primary hover:bg-secondary'
                    } transition-colors`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add custom interest"
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomInterest();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={handleAddCustomInterest}
                  variant="outline"
                  size="sm"
                >
                  Add
                </Button>
              </div>
            </div>
            
            {state.person.interests.length > 0 && (
              <div>
                <Label className="block mb-2">Selected interests:</Label>
                <div className="flex flex-wrap gap-2">
                  {state.person.interests.map((interest) => (
                    <div
                      key={interest}
                      className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className="ml-1 text-primary-foreground/70 hover:text-primary-foreground"
                      >
                        <Icon icon="lucide:x" className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 'socialMedia':
        return (
          <div className="space-y-4">
            <p className="text-sm text-primary/70">
              Adding social media profiles helps us analyze their interests and provide better gift recommendations.
            </p>
            
            <div className="flex items-end space-x-2">
              <div className="space-y-2 flex-1">
                <Label htmlFor="socialPlatform">Platform</Label>
                <select
                  id="socialPlatform"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={socialPlatform}
                  onChange={(e) => setSocialPlatform(e.target.value)}
                >
                  {SOCIAL_PLATFORMS.map((platform) => (
                    <option key={platform.id} value={platform.id}>
                      {platform.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2 flex-1">
                <Label htmlFor="socialUsername">Username</Label>
                <Input
                  id="socialUsername"
                  placeholder="Enter username"
                  value={socialUsername}
                  onChange={(e) => {
                    setSocialUsername(e.target.value);
                    dispatch({ type: 'CLEAR_ERROR', payload: 'socialUsername' });
                  }}
                  className={state.errors.socialUsername ? 'border-red-500' : ''}
                />
                {state.errors.socialUsername && (
                  <p className="text-red-500 text-xs mt-1">{state.errors.socialUsername}</p>
                )}
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddSocialProfile}
                variant="outline"
                size="sm"
                className="mb-0.5"
              >
                Add
              </Button>
            </div>
            
            {state.person.socialMediaProfiles && state.person.socialMediaProfiles.length > 0 && (
              <div>
                <Label className="block mb-2">Added profiles:</Label>
                <div className="space-y-2">
                  {state.person.socialMediaProfiles.map((profile) => {
                    const platform = SOCIAL_PLATFORMS.find(p => p.id === profile.platform);
                    return (
                      <div
                        key={profile.platform}
                        className="flex items-center justify-between bg-secondary/30 p-2 rounded-md"
                      >
                        <div className="flex items-center">
                          <Icon 
                            icon={platform?.icon || 'mdi:account'} 
                            className="w-5 h-5 mr-2 text-primary/70" 
                          />
                          <span className="text-sm font-medium">{platform?.name}: </span>
                          <span className="text-sm ml-1">{profile.username}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSocialProfile(profile.platform)}
                          className="text-primary/50 hover:text-primary"
                        >
                          <Icon icon="lucide:trash-2" className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <p className="text-xs text-primary/50 italic">
              This step is optional. You can skip it if you don't have their social media information.
            </p>
          </div>
        );
      
      case 'budget':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="budget">What's your budget?</Label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-primary/70">$</span>
                <Input
                  id="budget"
                  type="number"
                  placeholder="Enter amount"
                  className={`pl-7 ${state.errors.budget ? 'border-red-500' : ''}`}
                  value={state.person.budget || ''}
                  onChange={(e) => {
                    dispatch({ 
                      type: 'UPDATE_PERSON', 
                      payload: { budget: parseInt(e.target.value) || undefined } 
                    });
                    dispatch({ type: 'CLEAR_ERROR', payload: 'budget' });
                  }}
                />
              </div>
              {state.errors.budget && (
                <p className="text-red-500 text-xs mt-1">{state.errors.budget}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Quick select:</Label>
              <div className="flex flex-wrap gap-2">
                {[25, 50, 100, 200, 500].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      dispatch({ 
                        type: 'UPDATE_PERSON', 
                        payload: { budget: amount } 
                      });
                      dispatch({ type: 'CLEAR_ERROR', payload: 'budget' });
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      state.person.budget === amount
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-primary hover:bg-secondary'
                    } transition-colors`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'occasion':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="occasion">What's the occasion?</Label>
              <select
                id="occasion"
                className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ${
                  state.errors.occasion ? 'border-red-500' : ''
                }`}
                value={state.person.occasion || ''}
                onChange={(e) => {
                  dispatch({ 
                    type: 'UPDATE_PERSON', 
                    payload: { occasion: e.target.value } 
                  });
                  dispatch({ type: 'CLEAR_ERROR', payload: 'occasion' });
                }}
              >
                <option value="">Select occasion</option>
                {OCCASIONS.map((occasion) => (
                  <option key={occasion} value={occasion}>
                    {occasion}
                  </option>
                ))}
              </select>
              {state.errors.occasion && (
                <p className="text-red-500 text-xs mt-1">{state.errors.occasion}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Quick select:</Label>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.slice(0, 6).map((occasion) => (
                  <button
                    key={occasion}
                    type="button"
                    onClick={() => {
                      dispatch({ 
                        type: 'UPDATE_PERSON', 
                        payload: { occasion } 
                      });
                      dispatch({ type: 'CLEAR_ERROR', payload: 'occasion' });
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      state.person.occasion === occasion
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/50 text-primary hover:bg-secondary'
                    } transition-colors`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'additional':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender (optional)</Label>
              <select
                id="gender"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={state.person.gender || ''}
                onChange={(e) => dispatch({ 
                  type: 'UPDATE_PERSON', 
                  payload: { gender: e.target.value } 
                })}
              >
                <option value="">Prefer not to specify</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="p-4 bg-secondary/30 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center">
                <Icon icon="lucide:info" className="w-4 h-4 mr-1" />
                Summary
              </h4>
              <ul className="space-y-1 text-sm">
                <li><span className="font-medium">Name:</span> {state.person.name}</li>
                <li><span className="font-medium">Relationship:</span> {state.person.relationship || 'Not specified'}</li>
                <li><span className="font-medium">Age:</span> {state.person.age || 'Not specified'}</li>
                <li><span className="font-medium">Interests:</span> {state.person.interests.join(', ')}</li>
                <li><span className="font-medium">Budget:</span> ${state.person.budget}</li>
                <li><span className="font-medium">Occasion:</span> {state.person.occasion}</li>
                <li>
                  <span className="font-medium">Social Profiles:</span>{' '}
                  {state.person.socialMediaProfiles && state.person.socialMediaProfiles.length > 0
                    ? state.person.socialMediaProfiles.map(p => p.platform).join(', ')
                    : 'None'}
                </li>
              </ul>
            </div>
            
            <p className="text-sm text-primary/70">
              Click "Find Gifts" to analyze this information and generate personalized gift recommendations.
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (state.currentStep) {
      case 'basicInfo': return 'Who are you shopping for?';
      case 'interests': return 'What are their interests?';
      case 'socialMedia': return 'Social Media Profiles';
      case 'budget': return 'What\'s your budget?';
      case 'occasion': return 'What\'s the occasion?';
      case 'additional': return 'Additional Information';
      default: return '';
    }
  };

  const getStepDescription = () => {
    switch (state.currentStep) {
      case 'basicInfo': return 'Tell us about the person you\'re shopping for.';
      case 'interests': return 'Select or add their interests to help us find the perfect gift.';
      case 'socialMedia': return 'Add their social media profiles for better recommendations.';
      case 'budget': return 'Set your budget range for gift suggestions.';
      case 'occasion': return 'What\'s the special occasion for this gift?';
      case 'additional': return 'Review your information and find personalized gifts.';
      default: return '';
    }
  };

  const getStepProgress = () => {
    const steps: FormStepType[] = ['basicInfo', 'interests', 'socialMedia', 'budget', 'occasion', 'additional'];
    return ((steps.indexOf(state.currentStep) + 1) / steps.length) * 100;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-background">
        {isAnalyzing ? (
          <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
            <LoadingAnimation />
            <h3 className="text-xl font-medium mt-6 text-center">Analyzing preferences...</h3>
            <p className="text-primary/70 text-center mt-2">
              We're analyzing {state.person.name}'s interests and preferences to find the perfect gifts.
            </p>
          </div>
        ) : (
          <>
            <div className="h-1 bg-secondary/30 w-full">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${getStepProgress()}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>{getStepTitle()}</DialogTitle>
              <DialogDescription>{getStepDescription()}</DialogDescription>
            </DialogHeader>
            
            <div className="p-6 pt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={state.currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <DialogFooter className="p-6 pt-0 flex flex-row justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={state.currentStep === 'basicInfo' || state.isSubmitting}
              >
                Back
              </Button>
              
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={state.isSubmitting}
              >
                {state.currentStep === 'additional' ? 'Find Gifts' : 'Next'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MultiStepForm; 