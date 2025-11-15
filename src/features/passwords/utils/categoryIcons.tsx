/**
 * Category Icons and Colors Utility
 * 
 * This utility provides icons and colors for password categories
 * using Material-UI icons.
 */

import React from 'react';
import {
  Share,
  Email,
  AccountBalance,
  Work,
  ShoppingCart,
  Movie,
  MoreHoriz,
  Group,
  MailOutline,
  CreditCard,
  Business,
  Store,
  SportsEsports,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';
import { Category } from '../types';

/**
 * Icon mapping for each category
 */
const categoryIconMap: Record<Category, React.ComponentType<SvgIconProps>> = {
  [Category.SOCIAL]: Share,
  [Category.EMAIL]: Email,
  [Category.BANKING]: AccountBalance,
  [Category.WORK]: Work,
  [Category.SHOPPING]: ShoppingCart,
  [Category.ENTERTAINMENT]: Movie,
  [Category.OTHER]: MoreHoriz,
};

/**
 * Alternative icon mapping (for variety)
 */
const alternativeCategoryIconMap: Record<Category, React.ComponentType<SvgIconProps>> = {
  [Category.SOCIAL]: Group,
  [Category.EMAIL]: MailOutline,
  [Category.BANKING]: CreditCard,
  [Category.WORK]: Business,
  [Category.SHOPPING]: Store,
  [Category.ENTERTAINMENT]: SportsEsports,
  [Category.OTHER]: MoreHoriz,
};

/**
 * Color mapping for each category
 */
const categoryColorMap: Record<Category, string> = {
  [Category.SOCIAL]: '#2196F3', // Blue
  [Category.EMAIL]: '#4CAF50', // Green
  [Category.BANKING]: '#FF9800', // Orange
  [Category.WORK]: '#9C27B0', // Purple
  [Category.SHOPPING]: '#E91E63', // Pink
  [Category.ENTERTAINMENT]: '#F44336', // Red
  [Category.OTHER]: '#9E9E9E', // Grey
};

/**
 * Background color mapping for category chips/badges (lighter versions)
 */
const categoryBackgroundColorMap: Record<Category, string> = {
  [Category.SOCIAL]: '#E3F2FD', // Light Blue
  [Category.EMAIL]: '#E8F5E9', // Light Green
  [Category.BANKING]: '#FFF3E0', // Light Orange
  [Category.WORK]: '#F3E5F5', // Light Purple
  [Category.SHOPPING]: '#FCE4EC', // Light Pink
  [Category.ENTERTAINMENT]: '#FFEBEE', // Light Red
  [Category.OTHER]: '#F5F5F5', // Light Grey
};

/**
 * Get the icon component for a category
 * @param category - The category
 * @param alternative - Use alternative icon set
 * @returns React icon component
 */
export function getCategoryIcon(
  category: Category,
  alternative: boolean = false
): React.ComponentType<SvgIconProps> {
  const iconMap = alternative ? alternativeCategoryIconMap : categoryIconMap;
  return iconMap[category] || MoreHoriz;
}

/**
 * Get the color for a category
 * @param category - The category
 * @returns Hex color string
 */
export function getCategoryColor(category: Category): string {
  return categoryColorMap[category] || '#9E9E9E';
}

/**
 * Get the background color for a category
 * @param category - The category
 * @returns Hex color string
 */
export function getCategoryBackgroundColor(category: Category): string {
  return categoryBackgroundColorMap[category] || '#F5F5F5';
}

/**
 * Render a category icon with specified props
 * @param category - The category
 * @param props - MUI SvgIcon props
 * @param alternative - Use alternative icon set
 * @returns React element
 */
export function renderCategoryIcon(
  category: Category,
  props?: SvgIconProps,
  alternative: boolean = false
): React.ReactElement {
  const IconComponent = getCategoryIcon(category, alternative);
  const color = getCategoryColor(category);
  
  return <IconComponent {...props} sx={{ color, ...props?.sx }} />;
}

/**
 * Get all categories with their metadata
 * @returns Array of category metadata
 */
export function getAllCategoryMetadata() {
  return Object.values(Category).map((category) => ({
    category,
    icon: getCategoryIcon(category),
    color: getCategoryColor(category),
    backgroundColor: getCategoryBackgroundColor(category),
    label: category,
  }));
}

/**
 * Get category display name (alias for the enum value itself in this case)
 * @param category - The category
 * @returns Display name
 */
export function getCategoryDisplayName(category: Category): string {
  return category;
}

