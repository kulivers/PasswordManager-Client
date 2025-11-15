/**
 * SearchBar Component
 * 
 * Search input with debouncing for filtering password accounts.
 * Searches by website and username.
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

interface SearchBarProps {
  /**
   * Current search query
   */
  value: string;
  
  /**
   * Callback when search query changes
   */
  onChange: (query: string) => void;
  
  /**
   * Placeholder text
   * @default "Поиск по сайту или имени пользователя..."
   */
  placeholder?: string;
  
  /**
   * Debounce delay in milliseconds
   * @default 300
   */
  debounceMs?: number;
  
  /**
   * Whether the search is disabled
   */
  disabled?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Поиск по сайту или имени пользователя...',
  debounceMs = 300,
  disabled = false,
}) => {
  const [localValue, setLocalValue] = useState(value);
  
  // Sync local value with prop value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);
  
  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);
    
    return () => clearTimeout(timer);
  }, [localValue, value, onChange, debounceMs]);
  
  /**
   * Handle input change
   */
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(event.target.value);
    },
    []
  );
  
  /**
   * Clear search input
   */
  const handleClear = useCallback(() => {
    setLocalValue('');
    onChange('');
  }, [onChange]);
  
  /**
   * Handle key press (e.g., Enter)
   */
  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onChange(localValue);
      }
    },
    [localValue, onChange]
  );
  
  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        fullWidth
        value={localValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: localValue && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClear}
                edge="end"
                disabled={disabled}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;

