/**
 * PasswordForm Component
 * 
 * Form for adding or editing password accounts with:
 * - Formik for form management
 * - Yup for validation
 * - Password generator integration
 * - Password strength indicator
 * - Show/hide password toggle
 */

import React, { useState, useCallback } from 'react';
import { Formik, Form, Field, FormikHelpers, useFormikContext } from 'formik';
import * as yup from 'yup';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Typography,
  Tooltip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  VpnKey as GenerateIcon,
} from '@mui/icons-material';
import { Account, Category, PasswordFormData } from '../types';
import { calculatePasswordStrength } from '../utils/passwordStrength';
import PasswordGenerator from './PasswordGenerator';

interface PasswordFormProps {
  /**
   * Account to edit (if editing existing account)
   */
  account?: Account;
  
  /**
   * Callback when form is submitted
   */
  onSubmit: (data: PasswordFormData) => void;
  
  /**
   * Callback when form is cancelled
   */
  onCancel?: () => void;
  
  /**
   * Whether the form is in loading state
   */
  loading?: boolean;
}

/**
 * Validation schema using Yup
 */
const validationSchema = yup.object({
  website: yup
    .string()
    .required('Обязательное поле')
    .url('Введите корректный URL (например, https://example.com)'),
  username: yup
    .string()
    .required('Обязательное поле')
    .min(3, 'Минимум 3 символа'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(8, 'Минимум 8 символов'),
  category: yup
    .string()
    .required('Выберите категорию')
    .oneOf(Object.values(Category), 'Неверная категория'),
  notes: yup
    .string()
    .max(500, 'Максимум 500 символов'),
});

/**
 * Password Generator Dialog Component (uses Formik context)
 */
const PasswordGeneratorDialog: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { setFieldValue } = useFormikContext<PasswordFormData>();
  
  const handleUsePassword = useCallback((password: string) => {
    setFieldValue('password', password);
    onClose();
  }, [setFieldValue, onClose]);
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Генератор паролей</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <PasswordGenerator
            onUsePassword={handleUsePassword}
            showUseButton={true}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export const PasswordForm: React.FC<PasswordFormProps> = ({
  account,
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [generatorOpen, setGeneratorOpen] = useState(false);
  
  // Initial form values
  const initialValues: PasswordFormData = {
    website: account?.website || '',
    username: account?.username || '',
    password: account?.password || '',
    category: account?.category || Category.OTHER,
    notes: account?.notes || '',
  };
  
  /**
   * Handle form submission
   */
  const handleSubmit = useCallback(
    (values: PasswordFormData, helpers: FormikHelpers<PasswordFormData>) => {
      onSubmit(values);
      helpers.setSubmitting(false);
    },
    [onSubmit]
  );
  
  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);
  
  /**
   * Open password generator dialog
   */
  const openGenerator = useCallback(() => {
    setGeneratorOpen(true);
  }, []);
  
  /**
   * Close password generator dialog
   */
  const closeGenerator = useCallback(() => {
    setGeneratorOpen(false);
  }, []);
  
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, isSubmitting }) => {
          const passwordStrength = calculatePasswordStrength(values.password);
          
          return (
            <Form>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {/* Website URL */}
                <Field name="website">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Веб-сайт"
                      placeholder="https://example.com"
                      fullWidth
                      error={touched.website && Boolean(errors.website)}
                      helperText={touched.website && errors.website}
                      disabled={isSubmitting || loading}
                    />
                  )}
                </Field>
                
                {/* Username */}
                <Field name="username">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Имя пользователя / Email"
                      placeholder="user@example.com"
                      fullWidth
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                      disabled={isSubmitting || loading}
                    />
                  )}
                </Field>
                
                {/* Password */}
                <Box>
                  <Field name="password">
                    {({ field }: any) => (
                      <TextField
                        {...field}
                        label="Пароль"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        disabled={isSubmitting || loading}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Tooltip title="Сгенерировать пароль">
                                <IconButton
                                  onClick={openGenerator}
                                  edge="end"
                                  sx={{ mr: 1 }}
                                  disabled={isSubmitting || loading}
                                >
                                  <GenerateIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}>
                                <IconButton
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                  disabled={isSubmitting || loading}
                                >
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Field>
                  
                  {/* Password Strength Indicator */}
                  {values.password && (
                    <Box sx={{ mt: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          Надежность пароля
                        </Typography>
                        <Typography
                          variant="caption"
                          fontWeight="bold"
                          sx={{ color: passwordStrength.color }}
                        >
                          {passwordStrength.text}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={passwordStrength.score}
                        sx={{
                          height: 4,
                          borderRadius: 2,
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: passwordStrength.color,
                            borderRadius: 2,
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>
                
                {/* Category */}
                <Field name="category">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      select
                      label="Категория"
                      fullWidth
                      error={touched.category && Boolean(errors.category)}
                      helperText={touched.category && errors.category}
                      disabled={isSubmitting || loading}
                    >
                      {Object.values(Category).map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Field>
                
                {/* Notes */}
                <Field name="notes">
                  {({ field }: any) => (
                    <TextField
                      {...field}
                      label="Заметки (необязательно)"
                      multiline
                      rows={3}
                      fullWidth
                      error={touched.notes && Boolean(errors.notes)}
                      helperText={
                        touched.notes && errors.notes 
                          ? errors.notes 
                          : `${values.notes?.length || 0}/500`
                      }
                      disabled={isSubmitting || loading}
                    />
                  )}
                </Field>
                
                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
                  {onCancel && (
                    <Button
                      onClick={onCancel}
                      disabled={isSubmitting || loading}
                      variant="outlined"
                    >
                      Отмена
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || loading}
                  >
                    {account ? 'Сохранить изменения' : 'Добавить пароль'}
                  </Button>
                </Box>
              </Box>
              
              {/* Password Generator Dialog - inside Formik context */}
              <PasswordGeneratorDialog
                open={generatorOpen}
                onClose={closeGenerator}
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default PasswordForm;

