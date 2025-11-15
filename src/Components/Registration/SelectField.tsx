import React from 'react';
import { Select, MenuItem, FormControl, styled } from '@mui/material';
import { SelectFieldProps } from '../../types/form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

const StyledSelect = styled(Select)<{ error?: boolean }>(({ theme, error }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? theme.palette.error.main : theme.palette.divider,
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? theme.palette.error.main : theme.palette.text.disabled,
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    borderWidth: '2px',
  },
  '& .MuiSelect-select': {
    padding: '16px 16px',
    paddingLeft: '48px',
    paddingRight: '48px',
    color: theme.palette.text.primary,
  },
}));

const ErrorText = styled('p')(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  fontSize: '0.875rem',
  color: theme.palette.error.main,
}));

const IconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '16px',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  pointerEvents: 'none',
  zIndex: 1,
  color: theme.palette.text.disabled,
}));

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder,
  required = false,
  error,
  value,
  onChange,
  options,
}) => {
  return (
    <div style={{ marginBottom: '8px' }}>
      <Label>
        {label}
        {required && <RequiredStar>*</RequiredStar>}
      </Label>
      <FormControl fullWidth error={!!error} style={{ position: 'relative' }}>
        <IconWrapper>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </IconWrapper>
        <StyledSelect
          value={value}
          onChange={(e) => onChange(e.target.value as string)}
          displayEmpty
          error={!!error}
          IconComponent={ExpandMoreIcon}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '12px',
                marginTop: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
            },
          }}
        >
          <MenuItem value="" disabled>
            <span>{placeholder}</span>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
        {error && <ErrorText>{error}</ErrorText>}
      </FormControl>
    </div>
  );
};

