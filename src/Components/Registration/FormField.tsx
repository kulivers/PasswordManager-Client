import React from 'react';
import { TextField, InputAdornment, styled } from '@mui/material';
import { FormFieldProps } from '../../types/form';

interface InputFieldProps extends FormFieldProps {
  type?: 'text' | 'email' | 'password';
  icon?: React.ReactNode;
}

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '12px',
    '& fieldset': {
      borderColor: error ? theme.palette.error.main : theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: error ? theme.palette.error.main : theme.palette.text.disabled,
    },
    '&.Mui-focused fieldset': {
      borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
      borderWidth: '2px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '16px 16px',
    color: theme.palette.text.primary,
    '&::placeholder': {
      color: theme.palette.text.disabled,
      opacity: 1,
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 600,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    transform: 'none',
    position: 'relative',
    '&.Mui-focused': {
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiFormHelperText-root': {
    marginTop: theme.spacing(0.5),
    fontSize: '0.875rem',
    color: theme.palette.error.main,
  },
}));

const Label = styled('label')(({ theme }) => ({
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const RequiredStar = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: '4px',
}));

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

