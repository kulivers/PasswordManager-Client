import React from 'react';
import { Button as MuiButton, styled } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

interface StyledButtonProps {
  customVariant?: string;
  customSize?: string;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'customVariant' && prop !== 'customSize',
})<StyledButtonProps>(
  ({ customVariant, customSize }) => {
    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.4)',
        },
      },
      secondary: {
        background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
        color: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(100, 116, 139, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #475569 0%, #334155 100%)',
          boxShadow: '0 10px 15px -3px rgba(100, 116, 139, 0.4)',
        },
      },
      outline: {
        backgroundColor: '#ffffff',
        color: '#475569',
        border: '2px solid #cbd5e1',
        '&:hover': {
          backgroundColor: '#f8fafc',
          borderColor: '#94a3b8',
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#64748b',
        '&:hover': {
          backgroundColor: '#f1f5f9',
        },
      },
    };

    const sizeStyles = {
      sm: {
        padding: '6px 12px',
        fontSize: '0.875rem',
      },
      md: {
        padding: '10px 20px',
        fontSize: '1rem',
      },
      lg: {
        padding: '12px 24px',
        fontSize: '1rem',
      },
    };

    return {
      borderRadius: '8px',
      fontWeight: 600,
      textTransform: 'none',
      transition: 'all 0.2s ease-in-out',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 0 3px ${customVariant === 'primary' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(100, 116, 139, 0.3)'}`,
      },
      '&:active': {
        transform: 'scale(0.98)',
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
  icon,
  iconPosition = 'right',
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
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </StyledButton>
  );
};

