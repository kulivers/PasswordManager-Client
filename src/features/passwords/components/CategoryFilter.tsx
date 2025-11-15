/**
 * CategoryFilter Component
 * 
 * Displays category chips for filtering password accounts.
 * Shows count for each category and highlights selected category.
 */

import React, { useMemo } from 'react';
import {
  Box,
  Chip,
  Typography,
} from '@mui/material';
import { Category, CategoryCount } from '../types';
import {
  getCategoryIcon,
  getCategoryColor,
  getCategoryBackgroundColor,
} from '../utils/categoryIcons';

interface CategoryFilterProps {
  /**
   * Currently selected category (null for "All")
   */
  selectedCategory: string | null;
  
  /**
   * Category counts data
   */
  categoryCounts: CategoryCount[];
  
  /**
   * Total number of accounts
   */
  totalCount: number;
  
  /**
   * Callback when category is selected
   */
  onCategorySelect: (category: string | null) => void;
  
  /**
   * Whether the filter is disabled
   */
  disabled?: boolean;
  
  /**
   * Whether to show category counts
   * @default true
   */
  showCounts?: boolean;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  categoryCounts,
  totalCount,
  onCategorySelect,
  disabled = false,
  showCounts = true,
}) => {
  /**
   * Create category data with counts
   */
  const categoryData = useMemo(() => {
    const countsMap = new Map(
      categoryCounts.map((cc) => [cc.category, cc.count])
    );
    
    return Object.values(Category).map((category) => ({
      category,
      count: countsMap.get(category) || 0,
      icon: getCategoryIcon(category),
      color: getCategoryColor(category),
      bgColor: getCategoryBackgroundColor(category),
    }));
  }, [categoryCounts]);
  
  /**
   * Handle "All" chip click
   */
  const handleAllClick = () => {
    onCategorySelect(null);
  };
  
  /**
   * Handle category chip click
   */
  const handleCategoryClick = (category: string) => {
    onCategorySelect(selectedCategory === category ? null : category);
  };
  
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom color="text.secondary">
        Категории
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {/* "All" Chip */}
        <Chip
          label={showCounts ? `Все (${totalCount})` : 'Все'}
          onClick={handleAllClick}
          disabled={disabled}
          variant={selectedCategory === null ? 'filled' : 'outlined'}
          color={selectedCategory === null ? 'primary' : 'default'}
          sx={{
            fontWeight: selectedCategory === null ? 600 : 400,
          }}
        />
        
        {/* Category Chips */}
        {categoryData.map(({ category, count, icon: IconComponent, color, bgColor }) => {
          const isSelected = selectedCategory === category;
          
          return (
            <Chip
              key={category}
              icon={<IconComponent sx={{ fontSize: '1rem' }} />}
              label={showCounts ? `${category} (${count})` : category}
              onClick={() => handleCategoryClick(category)}
              disabled={disabled || count === 0}
              variant={isSelected ? 'filled' : 'outlined'}
              sx={{
                fontWeight: isSelected ? 600 : 400,
                backgroundColor: isSelected ? bgColor : 'transparent',
                borderColor: color,
                color: isSelected ? color : 'text.primary',
                '& .MuiChip-icon': {
                  color: color,
                },
                '&:hover': {
                  backgroundColor: isSelected ? bgColor : `${bgColor}80`,
                },
                '&.Mui-disabled': {
                  opacity: 0.4,
                },
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CategoryFilter;

