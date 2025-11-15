/**
 * PasswordCard Component
 * 
 * Displays a single password account as a card with:
 * - Category icon and color
 * - Website and username
 * - Password show/hide toggle
 * - Copy, edit, and delete actions
 */

import React, { useState, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
  TextField,
} from '@mui/material';
import {
  ContentCopy as CopyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Check as CheckIcon,
  OpenInNew as OpenIcon,
} from '@mui/icons-material';
import { Account } from '../types';
import { 
  getCategoryIcon, 
  getCategoryColor,
  getCategoryBackgroundColor 
} from '../utils/categoryIcons';
import { copyToClipboard } from '../../../utils/clipboard';

interface PasswordCardProps {
  /**
   * Account data to display
   */
  account: Account;
  
  /**
   * Callback when edit button is clicked
   */
  onEdit?: (account: Account) => void;
  
  /**
   * Callback when delete button is clicked
   */
  onDelete?: (account: Account) => void;
  
  /**
   * Elevation level for the card
   * @default 2
   */
  elevation?: number;
}

export const PasswordCard: React.FC<PasswordCardProps> = ({
  account,
  onEdit,
  onDelete,
  elevation = 2,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const CategoryIcon = getCategoryIcon(account.category);
  const categoryColor = getCategoryColor(account.category);
  const categoryBgColor = getCategoryBackgroundColor(account.category);
  
  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  
  /**
   * Copy text to clipboard with visual feedback
   */
  const handleCopy = useCallback(async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  }, []);
  
  /**
   * Handle edit button click
   */
  const handleEdit = useCallback(() => {
    onEdit?.(account);
  }, [account, onEdit]);
  
  /**
   * Handle delete button click
   */
  const handleDelete = useCallback(() => {
    onDelete?.(account);
  }, [account, onDelete]);
  
  /**
   * Open website in new tab
   */
  const openWebsite = useCallback(() => {
    window.open(account.website, '_blank', 'noopener,noreferrer');
  }, [account.website]);
  
  /**
   * Format date for display
   */
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card
      elevation={elevation}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      {/* Header with Category */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <Chip
          icon={<CategoryIcon sx={{ fontSize: '1rem' }} />}
          label={account.category}
          size="small"
          sx={{
            backgroundColor: categoryBgColor,
            color: categoryColor,
            fontWeight: 600,
            '& .MuiChip-icon': {
              color: categoryColor,
            },
          }}
        />
        
        <Tooltip title="Открыть сайт">
          <IconButton size="small" onClick={openWebsite}>
            <OpenIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Content */}
      <CardContent sx={{ flexGrow: 1, pt: 1 }}>
        {/* Website */}
        <Typography
          variant="h6"
          component="div"
          gutterBottom
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {account.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </Typography>
        
        {/* Username */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
          <TextField
            value={account.username}
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: { fontSize: '0.875rem' },
            }}
            label="Имя пользователя"
          />
          <Tooltip title={copiedField === 'username' ? 'Скопировано!' : 'Копировать'}>
            <IconButton
              size="small"
              onClick={() => handleCopy(account.username, 'username')}
              color={copiedField === 'username' ? 'success' : 'default'}
            >
              {copiedField === 'username' ? <CheckIcon /> : <CopyIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Password */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            value={showPassword ? account.password : '••••••••'}
            type={showPassword ? 'text' : 'password'}
            size="small"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: { 
                fontSize: '0.875rem',
                fontFamily: showPassword ? 'monospace' : 'inherit',
              },
            }}
            label="Пароль"
          />
          <Tooltip title={showPassword ? 'Скрыть' : 'Показать'}>
            <IconButton size="small" onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={copiedField === 'password' ? 'Скопировано!' : 'Копировать'}>
            <IconButton
              size="small"
              onClick={() => handleCopy(account.password, 'password')}
              color={copiedField === 'password' ? 'success' : 'default'}
            >
              {copiedField === 'password' ? <CheckIcon /> : <CopyIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        
        {/* Notes (if any) */}
        {account.notes && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {account.notes}
          </Typography>
        )}
        
        {/* Dates */}
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Создан: {formatDate(account.createdAt)}
          </Typography>
          {account.updatedAt && account.updatedAt !== account.createdAt && (
            <Typography variant="caption" color="text.secondary">
              Обновлен: {formatDate(account.updatedAt)}
            </Typography>
          )}
        </Box>
      </CardContent>
      
      {/* Actions */}
      <CardActions
        sx={{
          justifyContent: 'flex-end',
          px: 2,
          pb: 1.5,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {onEdit && (
          <Tooltip title="Редактировать">
            <IconButton
              size="small"
              onClick={handleEdit}
              color="primary"
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        
        {onDelete && (
          <Tooltip title="Удалить">
            <IconButton
              size="small"
              onClick={handleDelete}
              color="error"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default PasswordCard;

