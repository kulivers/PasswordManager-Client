import React from 'react';
import { Box, Typography, Alert, styled } from '@mui/material';
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

const IconCircle = styled(Box)({
  width: '64px',
  height: '64px',
  backgroundColor: '#dbeafe',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
});

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

const EmailText = styled('span')({
  fontWeight: 500,
  color: '#0f172a',
});

const ResendContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

const ResendText = styled(Typography)({
  fontSize: '0.875rem',
  color: '#64748b',
  marginBottom: '12px',
});

const ResendButton = styled('button')<{ disabled?: boolean }>(({ disabled }) => ({
  background: 'none',
  border: 'none',
  color: disabled ? '#cbd5e1' : '#3b82f6',
  fontWeight: 500,
  fontSize: '0.875rem',
  cursor: disabled ? 'not-allowed' : 'pointer',
  padding: 0,
  font: 'inherit',
  '&:hover': {
    color: disabled ? '#cbd5e1' : '#2563eb',
  },
}));

const InfoBox = styled(Alert)({
  borderRadius: '8px',
  backgroundColor: '#dbeafe',
  color: '#1e40af',
  '& .MuiAlert-icon': {
    color: '#3b82f6',
  },
});

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

export const Step4Verification: React.FC<StepProps> = ({
  formData,
  onNext,
  onPrevious,
  isLoading,
  error,
}) => {
  const [localData, setLocalData] = React.useState({
    verificationCode: formData.verificationCode,
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isResending, setIsResending] = React.useState(false);
  const [resendCooldown, setResendCooldown] = React.useState(0);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!localData.verificationCode.trim()) {
      newErrors.verificationCode = 'Verification code is required';
    } else if (localData.verificationCode.length !== 6) {
      newErrors.verificationCode = 'Verification code must be 6 digits';
    } else if (!/^\d{6}$/.test(localData.verificationCode)) {
      newErrors.verificationCode = 'Verification code must contain only numbers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext(localData);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // API call to resend code would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set cooldown to 60 seconds
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error('Failed to resend code:', error);
    } finally {
      setIsResending(false);
    }
  };

  const formatEmail = (email: string) => {
    const [username, domain] = email.split('@');
    if (username.length <= 2) return email;
    return `${username.substring(0, 2)}${'*'.repeat(username.length - 2)}@${domain}`;
  };

  return (
    <Container>
      <Header>
        <IconCircle>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </IconCircle>
        <Title>Verify your email</Title>
        <Subtitle>
          We've sent a 6-digit verification code to{' '}
          <EmailText>{formatEmail(formData.email)}</EmailText>
        </Subtitle>
      </Header>

      {error && (
        <Alert severity="error" sx={{ borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      <Box>
        <FormField
          label="Verification Code"
          placeholder="Enter 6-digit code"
          required
          error={errors.verificationCode}
          value={localData.verificationCode}
          onChange={(value) => {
            // Limit input to digits only and max 6 characters
            const numericValue = value.replace(/\D/g, '').substring(0, 6);
            setLocalData(prev => ({ ...prev, verificationCode: numericValue }));
          }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <ResendContainer>
          <ResendText>
            Didn't receive the code?
          </ResendText>
          <ResendButton
            type="button"
            onClick={handleResendCode}
            disabled={isResending || resendCooldown > 0}
          >
            {isResending ? 'Sending...' : 
             resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 
             'Resend code'}
          </ResendButton>
        </ResendContainer>
      </Box>

      <InfoBox severity="info">
        <Typography variant="subtitle2" fontWeight={500} marginBottom={0.5}>
          Check your spam folder
        </Typography>
        <Typography variant="body2">
          Sometimes verification emails end up in your spam or junk folder. 
          If you don't see the email, please check there as well.
        </Typography>
      </InfoBox>

      <ButtonGroup>
        <Button
          onClick={onPrevious}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={isLoading || localData.verificationCode.length !== 6}
          size="lg"
          className="flex-1"
        >
          {isLoading ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

