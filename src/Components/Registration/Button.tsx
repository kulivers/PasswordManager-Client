import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'contained' | 'outlined' | 'text';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'right',
  startIcon,
  endIcon,
}) => {
  // Handle legacy icon prop for backward compatibility
  const finalStartIcon = startIcon || (icon && iconPosition === 'left' ? icon : undefined);
  const finalEndIcon = endIcon || (icon && iconPosition === 'right' ? icon : undefined);

  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      className={className}
      startIcon={finalStartIcon}
      endIcon={finalEndIcon}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        py: 1.5,
      }}
    >
      {children}
    </MuiButton>
  );
};

