/**
 * Password Manager Types and Interfaces
 * 
 * This file contains all TypeScript types and interfaces
 * used in the password manager feature.
 */

/**
 * Predefined categories for password accounts
 */
export enum Category {
  SOCIAL = 'Соцсети',
  EMAIL = 'Email',
  BANKING = 'Банки',
  WORK = 'Работа',
  SHOPPING = 'Покупки',
  ENTERTAINMENT = 'Развлечения',
  OTHER = 'Другое'
}

/**
 * Main account model for password storage
 */
export interface Account {
  id: string;
  website: string;
  username: string;
  password: string;
  category: Category;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Form data interface for validation and submission
 */
export interface PasswordFormData {
  website: string;
  username: string;
  password: string;
  category: Category;
  notes?: string;
}

/**
 * Password strength levels
 */
export enum StrengthLevel {
  WEAK = 'Weak',
  FAIR = 'Fair',
  GOOD = 'Good',
  STRONG = 'Strong',
  VERY_STRONG = 'Very Strong'
}

/**
 * Password strength result with level and color
 */
export interface PasswordStrength {
  level: StrengthLevel;
  score: number; // 0-100
  color: string;
  text: string; // Localized text
}

/**
 * Redux state structure for passwords feature
 */
export interface PasswordsState {
  accounts: Account[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

/**
 * Password generator configuration options
 */
export interface PasswordGeneratorOptions {
  length: number; // 8-64 characters
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

/**
 * Category statistics
 */
export interface CategoryCount {
  category: Category;
  count: number;
}

/**
 * Filter options for password list
 */
export interface FilterOptions {
  category?: Category | null;
  searchQuery?: string;
}

/**
 * Sort options for password list
 */
export enum SortBy {
  WEBSITE = 'website',
  USERNAME = 'username',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  CATEGORY = 'category'
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export interface SortOptions {
  sortBy: SortBy;
  sortOrder: SortOrder;
}

