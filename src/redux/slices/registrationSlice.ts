import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegistrationState, RegistrationFormData } from '../../types';

const initialState: RegistrationState = {
  userData: {},
  isSuccess: false,
  errors: [],
  loadingState: {
    isLoading: false,
    isLoaded: false,
  },
  showAllerts: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<RegistrationFormData>) => {
      state.userData = action.payload;
      state.loadingState = { isLoading: true, isLoaded: false };
    },
    stopShowAlerts: (state) => {
      state.showAllerts = false;
    },
    registerUserSuccess: (state, _action: PayloadAction<unknown>) => {
      console.log('registerUserSuccess reducer');
      state.isSuccess = true;
      state.loadingState = { isLoading: false, isLoaded: true };
      state.showAllerts = true;
    },
    registerUserFailure: (state, action: PayloadAction<string[]>) => {
      state.errors = action.payload;
      state.isSuccess = false;
      state.loadingState = { isLoading: false, isLoaded: true };
      state.showAllerts = true;
    },
  },
});

export const {
  registerUser,
  stopShowAlerts,
  registerUserSuccess,
  registerUserFailure,
} = registrationSlice.actions;

export default registrationSlice.reducer;

