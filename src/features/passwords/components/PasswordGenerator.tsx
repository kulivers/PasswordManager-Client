/**
 * PasswordGenerator Component
 * 
 * Provides UI for generating secure passwords with customizable options:
 * - Length selection (8-64 characters)
 * - Character type toggles (uppercase, lowercase, numbers, symbols)
 * - Real-time strength indicator
 * - Copy to clipboard functionality
 */

import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Slider,
  TextField,
  Typography,
  LinearProgress,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { PasswordGeneratorOptions } from '../types';
import { 
  calculatePasswordStrength
} from '../utils/passwordStrength';
import { copyToClipboard } from '../../../utils/clipboard';

interface PasswordGeneratorProps {
  /**
   * Callback when user wants to use the generated password
   */
  onUsePassword?: (password: string) => void;
  
  /**
   * Initial password to display (optional)
   */
  initialPassword?: string;
  
  /**
   * Show "Use Password" button
   */
  showUseButton?: boolean;
}

const CHARACTER_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

/**
 * Generate a random password based on options
 */
function generatePassword(options: PasswordGeneratorOptions): string {
  let charset = '';
  
  if (options.includeUppercase) charset += CHARACTER_SETS.uppercase;
  if (options.includeLowercase) charset += CHARACTER_SETS.lowercase;
  if (options.includeNumbers) charset += CHARACTER_SETS.numbers;
  if (options.includeSymbols) charset += CHARACTER_SETS.symbols;
  
  // If no character types selected, use lowercase by default
  if (charset === '') {
    charset = CHARACTER_SETS.lowercase;
  }
  
  // Generate password using crypto.getRandomValues for security
  const array = new Uint32Array(options.length);
  window.crypto.getRandomValues(array);
  
  let password = '';
  for (let i = 0; i < options.length; i++) {
    password += charset[array[i] % charset.length];
  }
  
  return password;
}

export const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  onUsePassword,
  initialPassword = '',
  showUseButton = true,
}) => {
  const [options, setOptions] = useState<PasswordGeneratorOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });
  
  const [password, setPassword] = useState<string>(
    initialPassword || generatePassword(options)
  );
  
  const [copied, setCopied] = useState(false);
  
  // Calculate password strength
  const strength = calculatePasswordStrength(password);
  
  /**
   * Handle length slider change
   */
  const handleLengthChange = useCallback(
    (_event: Event, value: number | number[]) => {
      const newLength = Array.isArray(value) ? value[0] : value;
      const newOptions = { ...options, length: newLength };
      setOptions(newOptions);
      setPassword(generatePassword(newOptions));
    },
    [options]
  );
  
  /**
   * Handle checkbox toggle
   */
  const handleOptionToggle = useCallback(
    (option: keyof Omit<PasswordGeneratorOptions, 'length'>) => {
      const newOptions = {
        ...options,
        [option]: !options[option],
      };
      
      // Ensure at least one option is selected
      const hasAtLeastOne = 
        newOptions.includeUppercase ||
        newOptions.includeLowercase ||
        newOptions.includeNumbers ||
        newOptions.includeSymbols;
      
      if (hasAtLeastOne) {
        setOptions(newOptions);
        setPassword(generatePassword(newOptions));
      }
    },
    [options]
  );
  
  /**
   * Regenerate password
   */
  const handleRegenerate = useCallback(() => {
    setPassword(generatePassword(options));
    setCopied(false);
  }, [options]);
  
  /**
   * Copy password to clipboard
   */
  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(password);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [password]);
  
  /**
   * Use password (callback to parent component)
   */
  const handleUsePassword = useCallback(() => {
    onUsePassword?.(password);
  }, [password, onUsePassword]);
  
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      {/* Generated Password Display */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: 'background.default',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <TextField
            fullWidth
            value={password}
            InputProps={{
              readOnly: true,
              sx: {
                fontFamily: 'monospace',
                fontSize: '1.1rem',
              },
            }}
          />
          
          <Tooltip title={copied ? 'Скопировано!' : 'Копировать'}>
            <IconButton
              onClick={handleCopy}
              color={copied ? 'success' : 'default'}
              size="large"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Сгенерировать новый">
            <IconButton onClick={handleRegenerate} color="primary" size="large">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Strength Indicator */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Надежность пароля:
            </Typography>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ color: strength.color }}
            >
              {strength.text}
            </Typography>
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={strength.score}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: strength.color,
                borderRadius: 4,
              },
            }}
          />
        </Box>
      </Paper>
      
      {/* Password Options */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Длина пароля: {options.length}
        </Typography>
        <Slider
          value={options.length}
          onChange={handleLengthChange}
          min={8}
          max={64}
          step={1}
          marks={[
            { value: 8, label: '8' },
            { value: 16, label: '16' },
            { value: 32, label: '32' },
            { value: 64, label: '64' },
          ]}
          valueLabelDisplay="auto"
        />
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Символы
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeUppercase}
                onChange={() => handleOptionToggle('includeUppercase')}
              />
            }
            label="Заглавные буквы (A-Z)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeLowercase}
                onChange={() => handleOptionToggle('includeLowercase')}
              />
            }
            label="Строчные буквы (a-z)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeNumbers}
                onChange={() => handleOptionToggle('includeNumbers')}
              />
            }
            label="Цифры (0-9)"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={options.includeSymbols}
                onChange={() => handleOptionToggle('includeSymbols')}
              />
            }
            label="Специальные символы (!@#$%)"
          />
        </FormGroup>
      </Box>
      
      {/* Action Buttons */}
      {showUseButton && onUsePassword && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUsePassword}
            fullWidth
          >
            Использовать пароль
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PasswordGenerator;

