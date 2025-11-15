import React from 'react';
import { Box, Typography, Alert, styled } from '@mui/material';
import { FormField } from '../FormField';
import { Button } from '../Button';
import { SelectField } from '../SelectField';
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

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled(Typography)({
  fontSize: '1rem',
  color: '#64748b',
});

export const Step1BasicInfo: React.FC<StepProps> = ({
  formData,
  onNext,
  isLoading,
  error,
}) => {
  const [localData, setLocalData] = React.useState({
    fullName: formData.fullName,
    email: formData.email,
    country: formData.country,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (localData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!localData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(localData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!localData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localData);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Let's get started</Title>
        <Subtitle>Tell us a bit about yourself</Subtitle>
      </Header>

      {error && (
        <Alert severity="error" sx={{ borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      <FormField
        label="Full Name"
        placeholder="Enter your full name"
        required
        error={errors.fullName}
        value={localData.fullName}
        onChange={(value) => setLocalData(prev => ({ ...prev, fullName: value }))}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <FormField
        label="Email Address"
        placeholder="Enter your email address"
        type="email"
        required
        error={errors.email}
        value={localData.email}
        onChange={(value) => setLocalData(prev => ({ ...prev, email: value }))}
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />

      <SelectField
        label="Country"
        placeholder="Select your country"
        required
        error={errors.country}
        value={localData.country}
        onChange={(value) => setLocalData(prev => ({ ...prev, country: value }))}
        options={[
          { value: 'us', label: 'United States' },
          { value: 'ca', label: 'Canada' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'au', label: 'Australia' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'es', label: 'Spain' },
          { value: 'it', label: 'Italy' },
          { value: 'nl', label: 'Netherlands' },
          { value: 'se', label: 'Sweden' },
        ]}
      />

      <Button
        onClick={handleNext}
        disabled={isLoading}
        size="lg"
        className="w-full"
      >
        {isLoading ? 'Saving...' : 'Continue'}
      </Button>
    </Container>
  );
};

