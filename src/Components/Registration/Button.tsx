import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

const StyledButton = styled(MuiButton)<{ customVariant?: string; customSize?: string }>(
  ({ theme, customVariant, customSize }) => {
    const variantStyles = {
      primary: {
        backgroundColor: theme.palette.primary.main,
        color: '#ffffff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: 'scale(1.02)',
        },
      },
      secondary: {
        backgroundColor: theme.palette.secondary.main,
        color: '#ffffff',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          backgroundColor: theme.palette.secondary.dark,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: 'scale(1.02)',
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.primary.main}`,
        '&:hover': {
          backgroundColor: theme.palette.primary.light + '20',
        },
      },
    };

    const sizeStyles = {
      sm: {
        padding: '8px 16px',
        fontSize: '0.875rem',
      },
      md: {
        padding: '12px 24px',
        fontSize: '1rem',
      },
      lg: {
        padding: '16px 32px',
        fontSize: '1.125rem',
      },
    };

    return {
      borderRadius: '12px',
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.2s',
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${customVariant === 'primary' ? theme.palette.primary.main : theme.palette.secondary.main}`,
      },
      '&.Mui-disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
      ...variantStyles[customVariant as keyof typeof variantStyles],
      ...sizeStyles[customSize as keyof typeof sizeStyles],
    };
  }
);

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      customVariant={variant}
      customSize={size}
      className={className}
      disableElevation
    >
      {children}
    </StyledButton>
  );
};

