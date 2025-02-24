import { useState, useCallback, ChangeEvent } from 'react';
import { validateAge, validateBudget, validateSocialLink } from '@/utils/validation';
import type { Platform } from '@/constants/app';

interface ValidationRules<T> {
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: T) => boolean;
}

type ValidationErrors<T> = {
  [K in keyof T]?: string;
};

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: Partial<Record<keyof T, ValidationRules<T[keyof T]>>> = {}
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback((name: keyof T, value: T[keyof T]): string | undefined => {
    const rules = validationRules[name];
    if (!rules) return undefined;

    if (rules.required && !value) {
      return 'This field is required';
    }

    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        return `Value must be at least ${rules.min}`;
      }
      if (rules.max !== undefined && value > rules.max) {
        return `Value must be at most ${rules.max}`;
      }
    }

    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      return 'Invalid format';
    }

    if (rules.custom && !rules.custom(value)) {
      return 'Invalid value';
    }

    return undefined;
  }, [validationRules]);

  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    // Handle different input types
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    } else if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    }

    setValues(prev => ({ ...prev, [name]: parsedValue }));
    setTouched(prev => ({ ...prev, [name]: true }));

    const error = validateField(name as keyof T, parsedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, [validateField]);

  const handleBlur = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error,
    }));
  }, [validateField, values]);

  const validateForm = useCallback((): boolean => {
    const newErrors: ValidationErrors<T> = {};
    let isValid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validateField, values, validationRules]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
    setValues,
  };
} 