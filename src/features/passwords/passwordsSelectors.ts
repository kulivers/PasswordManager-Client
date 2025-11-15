/**
 * Redux Selectors for Password Manager Feature
 * 
 * This file contains reusable selectors for accessing and
 * deriving data from the passwords state slice.
 */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { Account, Category, CategoryCount } from './types';

/**
 * Base selector - Get the entire passwords state
 */
export const selectPasswordsState = (state: RootState) => state.passwords;

/**
 * Select all password accounts
 */
export const selectAllPasswords = (state: RootState) => 
  state.passwords.accounts;

/**
 * Select search query
 */
export const selectSearchQuery = (state: RootState) => 
  state.passwords.searchQuery;

/**
 * Select selected category filter
 */
export const selectSelectedCategory = (state: RootState) => 
  state.passwords.selectedCategory;

/**
 * Select loading state
 */
export const selectLoading = (state: RootState) => 
  state.passwords.loading;

/**
 * Select error state
 */
export const selectError = (state: RootState) => 
  state.passwords.error;

/**
 * Select filtered passwords based on search query and category
 * Memoized for performance
 */
export const selectFilteredPasswords = createSelector(
  [selectAllPasswords, selectSearchQuery, selectSelectedCategory],
  (accounts, searchQuery, selectedCategory) => {
    let filtered = [...accounts];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (account) => account.category === selectedCategory
      );
    }

    // Filter by search query (website or username)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (account) =>
          account.website.toLowerCase().includes(query) ||
          account.username.toLowerCase().includes(query)
      );
    }

    return filtered;
  }
);

/**
 * Select passwords grouped by category
 * Returns an object with category keys and arrays of accounts
 */
export const selectPasswordsByCategory = createSelector(
  [selectFilteredPasswords],
  (accounts) => {
    const grouped: Record<string, Account[]> = {};

    // Initialize all categories with empty arrays
    Object.values(Category).forEach((category) => {
      grouped[category] = [];
    });

    // Group accounts by category
    accounts.forEach((account) => {
      if (grouped[account.category]) {
        grouped[account.category].push(account);
      }
    });

    return grouped;
  }
);

/**
 * Select category counts for all accounts (not just filtered)
 * Used for displaying counts in category filter chips
 */
export const selectCategoryCounts = createSelector(
  [selectAllPasswords],
  (accounts): CategoryCount[] => {
    const counts: Record<string, number> = {};

    // Initialize all categories with 0 count
    Object.values(Category).forEach((category) => {
      counts[category] = 0;
    });

    // Count accounts in each category
    accounts.forEach((account) => {
      counts[account.category] = (counts[account.category] || 0) + 1;
    });

    // Convert to array of CategoryCount objects
    return Object.entries(counts).map(([category, count]) => ({
      category: category as Category,
      count,
    }));
  }
);

/**
 * Select total number of accounts
 */
export const selectTotalAccountsCount = createSelector(
  [selectAllPasswords],
  (accounts) => accounts.length
);

/**
 * Select total number of filtered accounts
 */
export const selectFilteredAccountsCount = createSelector(
  [selectFilteredPasswords],
  (accounts) => accounts.length
);

/**
 * Select a specific account by ID
 */
export const selectAccountById = createSelector(
  [selectAllPasswords, (_state: RootState, accountId: string) => accountId],
  (accounts, accountId) => accounts.find((account) => account.id === accountId)
);

/**
 * Check if any filters are active
 */
export const selectHasActiveFilters = createSelector(
  [selectSearchQuery, selectSelectedCategory],
  (searchQuery, selectedCategory) => {
    return !!searchQuery.trim() || !!selectedCategory;
  }
);

/**
 * Select accounts sorted by creation date (newest first)
 */
export const selectPasswordsSortedByDate = createSelector(
  [selectFilteredPasswords],
  (accounts) => {
    return [...accounts].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA; // Newest first
    });
  }
);

/**
 * Select accounts sorted by website name (alphabetically)
 */
export const selectPasswordsSortedByWebsite = createSelector(
  [selectFilteredPasswords],
  (accounts) => {
    return [...accounts].sort((a, b) => 
      a.website.localeCompare(b.website)
    );
  }
);

/**
 * Check if the passwords list is empty
 */
export const selectIsPasswordsEmpty = createSelector(
  [selectAllPasswords],
  (accounts) => accounts.length === 0
);

/**
 * Check if no results found after filtering
 */
export const selectNoResultsFound = createSelector(
  [selectFilteredPasswords, selectHasActiveFilters],
  (filteredAccounts, hasActiveFilters) => {
    return hasActiveFilters && filteredAccounts.length === 0;
  }
);

