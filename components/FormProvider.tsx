"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormState, Person, FormStepType } from '../types';

// Define the actions that can be performed on the form state
type FormAction =
  | { type: 'SET_STEP'; payload: FormStepType }
  | { type: 'UPDATE_PERSON'; payload: Partial<Person> }
  | { type: 'ADD_SOCIAL_PROFILE'; payload: { platform: string; username: string } }
  | { type: 'REMOVE_SOCIAL_PROFILE'; payload: string }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM' };

// Initial person state
const initialPerson: Person = {
  id: uuidv4(),
  name: '',
  interests: [],
  socialMediaProfiles: [],
};

// Initial form state
const initialFormState: FormState = {
  currentStep: 'basicInfo',
  person: initialPerson,
  isSubmitting: false,
  errors: {},
};

// Form reducer to handle state changes
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'UPDATE_PERSON':
      return { 
        ...state, 
        person: { ...state.person, ...action.payload },
        errors: { ...state.errors }
      };
    case 'ADD_SOCIAL_PROFILE':
      const profiles = state.person.socialMediaProfiles || [];
      return {
        ...state,
        person: {
          ...state.person,
          socialMediaProfiles: [
            ...profiles,
            { 
              platform: action.payload.platform as any, 
              username: action.payload.username
            }
          ]
        }
      };
    case 'REMOVE_SOCIAL_PROFILE':
      return {
        ...state,
        person: {
          ...state.person,
          socialMediaProfiles: state.person.socialMediaProfiles?.filter(
            profile => profile.platform !== action.payload
          )
        }
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: action.payload.message }
      };
    case 'CLEAR_ERROR':
      const updatedErrors = { ...state.errors };
      delete updatedErrors[action.payload];
      return { ...state, errors: updatedErrors };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'RESET_FORM':
      return { ...initialFormState, person: { ...initialPerson, id: uuidv4() } };
    default:
      return state;
  }
};

// Create the form context
type FormContextType = {
  state: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

// FormProvider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom hook to use the form context
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};

// Utility functions for form validation
export const validateName = (name: string): string | null => {
  if (!name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  return null;
};

export const validateInterests = (interests: string[]): string | null => {
  if (!interests.length) return 'At least one interest is required';
  return null;
};

export const validateBudget = (budget?: number): string | null => {
  if (budget === undefined) return 'Budget is required';
  if (budget < 10) return 'Budget must be at least $10';
  return null;
};

export const validateOccasion = (occasion?: string): string | null => {
  if (!occasion) return 'Occasion is required';
  return null;
};

export const validateSocialUsername = (username: string): string | null => {
  if (!username.trim()) return 'Username is required';
  return null;
}; 