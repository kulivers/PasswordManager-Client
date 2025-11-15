/**
 * PasswordManager Component
 * 
 * Main container component for the password manager feature.
 * Integrates all sub-components and manages the overall state:
 * - Search and filter functionality
 * - Add/Edit/Delete operations
 * - Modal dialogs for forms and confirmations
 */

import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Fab,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';
// @ts-ignore - uuid v13 has type issues, but functionality works
import { v4 as uuidv4 } from 'uuid';

import {
  addPassword,
  updatePassword,
  deletePassword,
  setSearchQuery,
  setSelectedCategory,
  clearFilters,
} from '../passwordsSlice';
import {
  selectFilteredPasswords,
  selectPasswordsByCategory,
  selectCategoryCounts,
  selectTotalAccountsCount,
  selectSearchQuery,
  selectSelectedCategory,
  selectHasActiveFilters,
  selectNoResultsFound,
} from '../passwordsSelectors';
import { Account, PasswordFormData } from '../types';

import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import PasswordList from './PasswordList';
import PasswordForm from './PasswordForm';
import ConfirmDialog from './ConfirmDialog';

export const PasswordManager: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  
  // Redux state
  const filteredAccounts = useSelector(selectFilteredPasswords);
  const accountsByCategory = useSelector(selectPasswordsByCategory);
  const categoryCounts = useSelector(selectCategoryCounts);
  const totalCount = useSelector(selectTotalAccountsCount);
  const searchQuery = useSelector(selectSearchQuery);
  const selectedCategory = useSelector(selectSelectedCategory);
  const hasActiveFilters = useSelector(selectHasActiveFilters);
  const noResultsFound = useSelector(selectNoResultsFound);
  
  // Local state
  const [formOpen, setFormOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [groupByCategory, setGroupByCategory] = useState(false);
  
  /**
   * Handle search query change
   */
  const handleSearchChange = useCallback(
    (query: string) => {
      dispatch(setSearchQuery(query));
    },
    [dispatch]
  );
  
  /**
   * Handle category selection
   */
  const handleCategorySelect = useCallback(
    (category: string | null) => {
      dispatch(setSelectedCategory(category));
    },
    [dispatch]
  );
  
  /**
   * Clear all filters
   */
  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);
  
  /**
   * Open add password form
   */
  const handleAddClick = useCallback(() => {
    setEditingAccount(undefined);
    setFormOpen(true);
  }, []);
  
  /**
   * Open edit password form
   */
  const handleEditClick = useCallback((account: Account) => {
    setEditingAccount(account);
    setFormOpen(true);
  }, []);
  
  /**
   * Close form dialog
   */
  const handleFormClose = useCallback(() => {
    setFormOpen(false);
    setEditingAccount(undefined);
  }, []);
  
  /**
   * Handle form submission (add or update)
   */
  const handleFormSubmit = useCallback(
    (data: PasswordFormData) => {
      if (editingAccount) {
        // Update existing account
        const updatedAccount: Account = {
          ...editingAccount,
          ...data,
          updatedAt: new Date(),
        };
        dispatch(updatePassword(updatedAccount));
        enqueueSnackbar('Пароль обновлен', { variant: 'success' });
      } else {
        // Add new account
        const newAccount: Account = {
          id: uuidv4(),
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        dispatch(addPassword(newAccount));
        enqueueSnackbar('Пароль добавлен', { variant: 'success' });
      }
      handleFormClose();
    },
    [editingAccount, dispatch, enqueueSnackbar, handleFormClose]
  );
  
  /**
   * Open delete confirmation dialog
   */
  const handleDeleteClick = useCallback((account: Account) => {
    setAccountToDelete(account);
    setDeleteDialogOpen(true);
  }, []);
  
  /**
   * Close delete confirmation dialog
   */
  const handleDeleteDialogClose = useCallback(() => {
    setDeleteDialogOpen(false);
    setAccountToDelete(null);
  }, []);
  
  /**
   * Confirm deletion
   */
  const handleDeleteConfirm = useCallback(() => {
    if (accountToDelete) {
      dispatch(deletePassword(accountToDelete.id));
      enqueueSnackbar('Пароль удален', { variant: 'info' });
      handleDeleteDialogClose();
    }
  }, [accountToDelete, dispatch, enqueueSnackbar, handleDeleteDialogClose]);
  
  /**
   * Toggle group by category
   */
  const handleGroupToggle = useCallback(() => {
    setGroupByCategory((prev) => !prev);
  }, []);
  
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold">
            Менеджер паролей
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            size="large"
          >
            Добавить пароль
          </Button>
        </Box>
        
        <Typography variant="body1" color="text.secondary">
          Безопасное хранение и управление вашими паролями
        </Typography>
      </Box>
      
      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <CategoryFilter
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          totalCount={totalCount}
          onCategorySelect={handleCategorySelect}
        />
        
        {hasActiveFilters && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Найдено: {filteredAccounts.length} из {totalCount}
            </Typography>
            <Button
              size="small"
              onClick={handleClearFilters}
              variant="outlined"
            >
              Сбросить фильтры
            </Button>
          </Box>
        )}
      </Paper>
      
      {/* View Options */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <FormControlLabel
          control={
            <Switch
              checked={groupByCategory}
              onChange={handleGroupToggle}
            />
          }
          label="Группировать по категориям"
        />
      </Box>
      
      {/* No Results Alert */}
      {noResultsFound && (
        <Alert severity="info" sx={{ mb: 3 }}>
          По вашему запросу ничего не найдено. Попробуйте изменить критерии поиска.
        </Alert>
      )}
      
      {/* Password List */}
      <PasswordList
        accounts={filteredAccounts}
        accountsByCategory={accountsByCategory}
        groupByCategory={groupByCategory}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
        showEmptyState={true}
        hasActiveFilters={hasActiveFilters}
      />
      
      {/* Floating Action Button (mobile) */}
      <Fab
        color="primary"
        aria-label="add password"
        onClick={handleAddClick}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: { xs: 'flex', sm: 'none' },
        }}
      >
        <AddIcon />
      </Fab>
      
      {/* Add/Edit Form Dialog */}
      <Dialog
        open={formOpen}
        onClose={handleFormClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingAccount ? 'Редактировать пароль' : 'Добавить новый пароль'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <PasswordForm
              account={editingAccount}
              onSubmit={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </Box>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Удалить пароль?"
        message={`Вы уверены, что хотите удалить пароль для "${accountToDelete?.website}"? Это действие нельзя отменить.`}
        confirmText="Удалить"
        cancelText="Отмена"
        confirmColor="error"
        iconType="warning"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteDialogClose}
      />
    </Container>
  );
};

export default PasswordManager;

