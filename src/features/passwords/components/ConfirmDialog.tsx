/**
 * ConfirmDialog Component
 * 
 * Reusable confirmation dialog for actions like deletion.
 * Provides customizable title, message, and action buttons.
 */

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Help as HelpIcon,
} from '@mui/icons-material';

interface ConfirmDialogProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  
  /**
   * Dialog title
   */
  title: string;
  
  /**
   * Dialog message/description
   */
  message: string;
  
  /**
   * Confirm button text
   * @default "Подтвердить"
   */
  confirmText?: string;
  
  /**
   * Cancel button text
   * @default "Отмена"
   */
  cancelText?: string;
  
  /**
   * Confirm button color
   * @default "primary"
   */
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  
  /**
   * Icon type to display
   * @default "warning"
   */
  iconType?: 'warning' | 'error' | 'info' | 'help' | 'none';
  
  /**
   * Callback when confirm button is clicked
   */
  onConfirm: () => void;
  
  /**
   * Callback when cancel button is clicked or dialog is closed
   */
  onCancel: () => void;
  
  /**
   * Whether the action is in loading state
   */
  loading?: boolean;
  
  /**
   * Max width of the dialog
   * @default "xs"
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * Get icon component based on icon type
 */
function getIcon(iconType: string, color: string) {
  const iconProps = {
    sx: { fontSize: 48, color },
  };
  
  switch (iconType) {
    case 'warning':
      return <WarningIcon {...iconProps} />;
    case 'error':
      return <ErrorIcon {...iconProps} />;
    case 'info':
      return <InfoIcon {...iconProps} />;
    case 'help':
      return <HelpIcon {...iconProps} />;
    default:
      return null;
  }
}

/**
 * Get icon color based on confirm button color
 */
function getIconColor(confirmColor: string): string {
  switch (confirmColor) {
    case 'error':
      return '#f44336';
    case 'warning':
      return '#ff9800';
    case 'info':
      return '#2196f3';
    case 'success':
      return '#4caf50';
    case 'secondary':
      return '#9c27b0';
    case 'primary':
    default:
      return '#1976d2';
  }
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  confirmColor = 'primary',
  iconType = 'warning',
  onConfirm,
  onCancel,
  loading = false,
  maxWidth = 'xs',
}) => {
  const iconColor = getIconColor(confirmColor);
  const icon = iconType !== 'none' ? getIcon(iconType, iconColor) : null;
  
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        {icon && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            {icon}
          </Box>
        )}
        {title}
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText
          id="confirm-dialog-description"
          sx={{ textAlign: icon ? 'center' : 'left' }}
        >
          {message}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          color={confirmColor}
          autoFocus
        >
          {loading ? 'Загрузка...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;

