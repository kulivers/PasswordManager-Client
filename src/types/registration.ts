// Types for multi-step registration
export interface RegistrationState {
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;
  error: string | null;
  formData: RegistrationFormData;
  isCompleted: boolean;
}

export interface RegistrationFormData {
  // Step 1: Basic information
  fullName: string;
  
  // Step 2: Contact information
  email: string;
  country: string;
  
  // Step 3: Password and security
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  acceptMarketing: boolean;
  
  // Step 4: Verification
  verificationCode: string;
  isVerified: boolean;
  
  // Step 5: Profile settings
  profilePicture: string | null;
  bio: string;
  preferences: UserPreferences;
  
  // Completion
  onboardingCompleted: boolean;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'bank';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
}

// Types for steps
export interface StepProps {
  formData: RegistrationFormData;
  onNext: (data: Partial<RegistrationFormData>) => void;
  onPrevious: () => void;
  onComplete: () => void;
  isLoading: boolean;
  error: string | null;
  onShowTerms?: () => void;
  onShowPrivacy?: () => void;
}

// Types for validation
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Types for API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Types for subscriptions
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
}

