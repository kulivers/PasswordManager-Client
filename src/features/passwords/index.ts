/**
 * Password Manager Feature Entry Point
 * 
 * This file exports all public APIs from the passwords feature,
 * including types, actions, reducer, and selectors.
 */

// Export types
export * from './types';

// Export slice actions and reducer
export {
  addPassword,
  updatePassword,
  deletePassword,
  setSearchQuery,
  setSelectedCategory,
  setLoading,
  setError,
  clearFilters,
  resetPasswordsState,
} from './passwordsSlice';

export { default as passwordsReducer } from './passwordsSlice';
