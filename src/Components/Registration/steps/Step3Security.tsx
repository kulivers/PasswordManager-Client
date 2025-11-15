import React from 'react';
import { Box, Typography, Alert, Checkbox, FormControlLabel, IconButton, styled } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { StepProps } from '../../../types/registration';

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const Title = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '8px',
});

const Subtitle = styled(Typography)({
  fontSize: '1rem',
  color: '#64748b',
});

const PasswordStrengthContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const PasswordStrengthText = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.875rem',
  marginBottom: '8px',
});

const PasswordStrengthBars = styled(Box)({
  display: 'flex',
  gap: '4px',
});

const StrengthBar = styled(Box)<{ active?: boolean; color?: string }>(({ active, color }) => ({
  height: '8px',
  flex: 1,
  borderRadius: '4px',
  backgroundColor: active ? color : '#e2e8f0',
  transition: 'all 0.3s',
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const CheckboxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const ErrorText = styled(Typography)({
  fontSize: '0.875rem',
  color: '#ef4444',
  marginLeft: '32px',
});

const LinkButton = styled('button')({
  background: 'none',
  border: 'none',
  color: '#3b82f6',
  textDecoration: 'underline',
  cursor: 'pointer',
  padding: 0,
  font: 'inherit',
  fontWeight: 500,
  '&:hover': {
    color: '#2563eb',
  },
});

export const Step3Security: React.FC<StepProps> = ({
  formData,
  onNext,
  onPrevious,
  isLoading,
  error,
  onShowTerms,
  onShowPrivacy,
}) => {
  const [localData, setLocalData] = React.useState({
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    acceptTerms: formData.acceptTerms,
    acceptMarketing: formData.acceptMarketing,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (localData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(localData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!localData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (localData.password !== localData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!localData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localData);
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(localData.password);
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['#ef4444', '#f97316', '#eab308', '#3b82f6', '#22c55e'];

  return (
    <Container>
      <Header>
        <Title>Security & Privacy</Title>
        <Subtitle>Create a secure password and review our policies</Subtitle>
      </Header>

      {error && (
        <Alert severity="error" sx={{ borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      <Box position="relative">
        <FormField
          label="Password"
          placeholder="Create a strong password"
          type={showPassword ? 'text' : 'password'}
          required
          error={errors.password}
          value={localData.password}
          onChange={(value) => setLocalData(prev => ({ ...prev, password: value }))}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        <IconButton
          onClick={() => setShowPassword(!showPassword)}
          sx={{
            position: 'absolute',
            right: 12,
            top: 38,
          }}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>

      {localData.password && (
        <PasswordStrengthContainer>
          <PasswordStrengthText>
            <span style={{ color: '#64748b' }}>Password strength:</span>
            <span style={{ 
              fontWeight: 500,
              color: strengthColors[passwordStrength - 1] || '#ef4444'
            }}>
              {strengthLabels[passwordStrength - 1] || 'Very Weak'}
            </span>
          </PasswordStrengthText>
          <PasswordStrengthBars>
            {[1, 2, 3, 4, 5].map((level) => (
              <StrengthBar
                key={level}
                active={level <= passwordStrength}
                color={strengthColors[passwordStrength - 1] || '#e2e8f0'}
              />
            ))}
          </PasswordStrengthBars>
        </PasswordStrengthContainer>
      )}

      <Box position="relative">
        <FormField
          label="Confirm Password"
          placeholder="Confirm your password"
          type={showConfirmPassword ? 'text' : 'password'}
          required
          error={errors.confirmPassword}
          value={localData.confirmPassword}
          onChange={(value) => setLocalData(prev => ({ ...prev, confirmPassword: value }))}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        <IconButton
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          sx={{
            position: 'absolute',
            right: 12,
            top: 38,
          }}
        >
          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>

      <CheckboxContainer>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                checked={localData.acceptTerms}
                onChange={(e) => setLocalData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                sx={{
                  color: '#3b82f6',
                  '&.Mui-checked': {
                    color: '#3b82f6',
                  },
                }}
              />
            }
            label={
              <Typography fontSize="0.875rem" color="#334155">
                I agree to the{' '}
                <LinkButton type="button" onClick={() => onShowTerms?.()}>
                  Terms of Service
                </LinkButton>{' '}
                and{' '}
                <LinkButton type="button" onClick={() => onShowPrivacy?.()}>
                  Privacy Policy
                </LinkButton>
              </Typography>
            }
          />
          {errors.acceptTerms && <ErrorText>{errors.acceptTerms}</ErrorText>}
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={localData.acceptMarketing}
              onChange={(e) => setLocalData(prev => ({ ...prev, acceptMarketing: e.target.checked }))}
              sx={{
                color: '#3b82f6',
                '&.Mui-checked': {
                  color: '#3b82f6',
                },
              }}
            />
          }
          label={
            <Typography fontSize="0.875rem" color="#334155">
              I would like to receive marketing emails and updates (optional)
            </Typography>
          }
        />
      </CheckboxContainer>

      <ButtonGroup sx={{ marginTop: 1 }}>
        <Button
          onClick={onPrevious}
          variant="outline"
          size="md"
          className="flex-1"
          icon={
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          }
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLoading}
          size="md"
          className="flex-1"
          icon={
            isLoading ? (
              <svg className="animate-spin" width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )
          }
          iconPosition="right"
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

