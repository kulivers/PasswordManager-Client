import React from 'react';
import { TextField, InputAdornment, styled } from '@mui/material';
import { FormFieldProps } from '../../types/form';

interface InputFieldProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password';
  icon?: React.ReactNode;
}

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#f8fafc',
    borderRadius: '12px',
    '& fieldset': {
      borderColor: error ? '#ef4444' : '#e2e8f0',
    },
    '&:hover fieldset': {
      borderColor: error ? '#ef4444' : '#cbd5e1',
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? '#ef4444' : '#3b82f6',
      borderWidth: '2px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 16px',
    color: '#0f172a',
    '&::placeholder': {
      color: '#94a3b8',
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: '#334155',
    marginBottom: theme.spacing(1),
    transform: 'none',
    position: 'relative',
    '&.Mui-focused': {
      color: '#334155',
    },
  },
  '& .MuiFormHelperText-root': {
    marginTop: theme.spacing(0.5),
    fontSize: '0.875rem',
    color: '#ef4444',
  },
}));

const Label = styled('label')(({ theme }) => ({
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#334155',
  marginBottom: theme.spacing(1),
}));

const RequiredStar = styled('span')({
  color: '#ef4444',
  marginLeft: '4px',
});

export const FormField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  type = 'text',
  icon,
}) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <Label>
        {label}
        {required && <RequiredStar>*</RequiredStar>}
      </Label>
      <StyledTextField
        fullWidth
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={!!error}
        helperText={error}
        variant="outlined"
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start">
              {icon}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

