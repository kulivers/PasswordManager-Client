/**
 * Redux Slice for Password Manager Feature
 * 
 * This slice manages the state for password accounts, including:
 * - CRUD operations for accounts
 * - Search and filter functionality
 * - Loading and error states
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, PasswordsState } from './types';

/**
 * Initial state for passwords feature
 */
const initialState: PasswordsState = {
  accounts: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
  error: null,
};

/**
 * Passwords slice with reducers and actions
 */
const passwordsSlice = createSlice({
  name: 'passwords',
  initialState,
  reducers: {
    /**
     * Add a new password account
     * @param state - Current state
     * @param action - Action with account payload
     */
    addPassword: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
      state.error = null;
    },

    /**
     * Update an existing password account
     * @param state - Current state
     * @param action - Action with updated account payload
     */
    updatePassword: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex(
        (account) => account.id === action.payload.id
      );
      
      if (index !== -1) {
        state.accounts[index] = action.payload;
        state.error = null;
      } else {
        state.error = 'Account not found';
      }
    },

    /**
     * Delete a password account by ID
     * @param state - Current state
     * @param action - Action with account ID payload
     */
    deletePassword: (state, action: PayloadAction<string>) => {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
      state.error = null;
    },

    /**
     * Set the search query for filtering accounts
     * @param state - Current state
     * @param action - Action with search query string
     */
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    /**
     * Set the selected category for filtering accounts
     * @param state - Current state
     * @param action - Action with category string or null
     */
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },

    /**
     * Set loading state
     * @param state - Current state
     * @param action - Action with loading boolean
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Set error state
     * @param state - Current state
     * @param action - Action with error message or null
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    /**
     * Clear all filters (search and category)
     * @param state - Current state
     */
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedCategory = null;
    },

    /**
     * Reset the entire passwords state to initial state
     * @param state - Current state
     */
    resetPasswordsState: () => initialState,
  },
});

// Export actions
export const {
  addPassword,
  updatePassword,
  deletePassword,
  setSearchQuery,
  setSelectedCategory,
  setLoading,
  setError,
  clearFilters,
  resetPasswordsState,
} = passwordsSlice.actions;

// Export reducer
export default passwordsSlice.reducer;

