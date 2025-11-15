import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState, RegistrationFormData } from '../../types/registration';

const initialState: RegistrationState = {
  currentStep: 1,
  totalSteps: 4,
  isLoading: false,
  error: null,
  isCompleted: false,
  formData: {
    // Step 1
    fullName: '',
    
    // Step 2
    email: '',
    country: '',
    
    // Step 3
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false,
    
    // Step 4
    verificationCode: '',
    isVerified: false,
    
    // Step 5
    profilePicture: null,
    bio: '',
    preferences: {
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
    },
    
    // Step 6
    onboardingCompleted: false,
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    // Navigation through steps
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    
    nextStep: (state) => {
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    
    previousStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    
    // Update form data
    updateFormData: (state, action: PayloadAction<Partial<RegistrationFormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    
    // Loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
    // Errors
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Complete registration
    setCompleted: (state, action: PayloadAction<boolean>) => {
      state.isCompleted = action.payload;
    },
    
    // Reset form
    resetRegistration: () => initialState,
    
    // Actions for Saga
    submitStep: (state, _action: PayloadAction<{ step: number; data: Partial<RegistrationFormData> }>) => {
      state.isLoading = true;
      state.error = null;
    },
    
    submitStepSuccess: (state, action: PayloadAction<Partial<RegistrationFormData>>) => {
      state.isLoading = false;
      state.formData = { ...state.formData, ...action.payload };
      if (state.currentStep < state.totalSteps) {
        state.currentStep += 1;
      }
    },
    
    submitStepFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Verification
    verifyEmail: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    verifyEmailSuccess: (state) => {
      state.isLoading = false;
      state.formData.isVerified = true;
    },
    
    verifyEmailFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    // Complete registration
    completeRegistration: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    completeRegistrationSuccess: (state) => {
      state.isLoading = false;
      state.isCompleted = true;
      state.formData.onboardingCompleted = true;
    },
    
    completeRegistrationFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  previousStep,
  updateFormData,
  setLoading,
  setError,
  setCompleted,
  resetRegistration,
  submitStep,
  submitStepSuccess,
  submitStepFailure,
  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,
  completeRegistration,
  completeRegistrationSuccess,
  completeRegistrationFailure,
} = registrationSlice.actions;

// Legacy actions for backwards compatibility with old registration saga
export const registerUser = (payload: any) => ({ type: 'registration/registerUser', payload });
export const registerUserSuccess = (payload: any) => ({ type: 'registration/registerUserSuccess', payload });
export const registerUserFailure = (payload: any) => ({ type: 'registration/registerUserFailure', payload });

export default registrationSlice.reducer;
