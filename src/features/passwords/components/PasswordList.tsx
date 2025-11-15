/**
 * PasswordList Component
 * 
 * Displays password accounts in a responsive grid layout.
 * Can optionally group accounts by category using Accordion.
 */

import React from 'react';
import {
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  LockOutlined as LockIcon,
} from '@mui/icons-material';
import { Account, Category } from '../types';
import PasswordCard from './PasswordCard';
import {
  getCategoryIcon,
  getCategoryColor,
} from '../utils/categoryIcons';

interface PasswordListProps {
  /**
   * Accounts to display
   */
  accounts: Account[];
  
  /**
   * Accounts grouped by category
   */
  accountsByCategory?: Record<string, Account[]>;
  
  /**
   * Whether to group by category
   * @default false
   */
  groupByCategory?: boolean;
  
  /**
   * Callback when edit button is clicked
   */
  onEdit?: (account: Account) => void;
  
  /**
   * Callback when delete button is clicked
   */
  onDelete?: (account: Account) => void;
  
  /**
   * Whether to show empty state
   * @default true
   */
  showEmptyState?: boolean;
  
  /**
   * Empty state message
   */
  emptyMessage?: string;
  
  /**
   * Whether filters are active (for empty state)
   */
  hasActiveFilters?: boolean;
}

/**
 * Empty State Component
 */
const EmptyState: React.FC<{ 
  message?: string; 
  hasActiveFilters?: boolean; 
}> = ({ 
  message, 
  hasActiveFilters 
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      px: 2,
    }}
  >
    <LockIcon
      sx={{
        fontSize: 80,
        color: 'text.disabled',
        mb: 2,
      }}
    />
    <Typography variant="h5" color="text.secondary" gutterBottom>
      {hasActiveFilters 
        ? 'Ничего не найдено' 
        : 'Нет сохраненных паролей'
      }
    </Typography>
    <Typography variant="body2" color="text.secondary" align="center">
      {message || (hasActiveFilters 
        ? 'Попробуйте изменить критерии поиска или фильтры'
        : 'Добавьте первый пароль, чтобы начать управлять своими аккаунтами'
      )}
    </Typography>
  </Box>
);

/**
 * Grid of Password Cards
 */
const PasswordGrid: React.FC<{
  accounts: Account[];
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
}> = ({ accounts, onEdit, onDelete }) => (
  <Grid container spacing={3}>
    {accounts.map((account) => (
      <Grid item xs={12} sm={6} md={4} key={account.id}>
        <PasswordCard
          account={account}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Grid>
    ))}
  </Grid>
);

/**
 * Category Group Component
 */
const CategoryGroup: React.FC<{
  category: string;
  accounts: Account[];
  onEdit?: (account: Account) => void;
  onDelete?: (account: Account) => void;
  defaultExpanded?: boolean;
}> = ({ 
  category, 
  accounts, 
  onEdit, 
  onDelete,
  defaultExpanded = true,
}) => {
  const CategoryIcon = getCategoryIcon(category as Category);
  const categoryColor = getCategoryColor(category as Category);
  
  if (accounts.length === 0) return null;
  
  return (
    <Accordion defaultExpanded={defaultExpanded} elevation={2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: 'background.default',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <CategoryIcon sx={{ color: categoryColor, fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: categoryColor }}>
            {category}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              px: 1,
              py: 0.25,
              borderRadius: 1,
              backgroundColor: categoryColor,
              color: 'white',
              fontWeight: 600,
            }}
          >
            {accounts.length}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 2 }}>
        <PasswordGrid
          accounts={accounts}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export const PasswordList: React.FC<PasswordListProps> = ({
  accounts,
  accountsByCategory,
  groupByCategory = false,
  onEdit,
  onDelete,
  showEmptyState = true,
  emptyMessage,
  hasActiveFilters = false,
}) => {
  // Show empty state if no accounts
  if (showEmptyState && accounts.length === 0) {
    return (
      <EmptyState 
        message={emptyMessage} 
        hasActiveFilters={hasActiveFilters}
      />
    );
  }
  
  // Render grouped by category
  if (groupByCategory && accountsByCategory) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {Object.entries(accountsByCategory).map(([category, categoryAccounts], index) => (
          <CategoryGroup
            key={category}
            category={category}
            accounts={categoryAccounts}
            onEdit={onEdit}
            onDelete={onDelete}
            defaultExpanded={index === 0} // Expand first category by default
          />
        ))}
      </Box>
    );
  }
  
  // Render flat grid
  return (
    <Box>
      <PasswordGrid
        accounts={accounts}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Box>
  );
};

export default PasswordList;

