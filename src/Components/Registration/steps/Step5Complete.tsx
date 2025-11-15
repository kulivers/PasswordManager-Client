import React from 'react';
import { Box, Typography, Alert, styled, Switch } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
  width: '80px',
  height: '80px',
  backgroundColor: '#dcfce7',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
});

const Title = styled(Typography)({
  fontSize: '1.875rem',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '8px',
});

const Subtitle = styled(Typography)({
  fontSize: '1.125rem',
  color: '#64748b',
});

const SummaryBox = styled(Box)({
  backgroundColor: '#f8fafc',
  borderRadius: '16px',
  padding: '24px',
});

const SummaryTitle = styled(Typography)({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#0f172a',
  marginBottom: '16px',
});

const SummarySection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SummaryLabel = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#334155',
  marginBottom: '8px',
});

const SummaryValue = styled(Typography)({
  fontSize: '0.875rem',
  color: '#64748b',
  '& span': {
    fontWeight: 500,
  },
});

const NotificationBox = styled(Box)({
  backgroundColor: '#dbeafe',
  border: '1px solid #bfdbfe',
  borderRadius: '16px',
  padding: '24px',
});

const NotificationTitle = styled(Typography)({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#1e3a8a',
  marginBottom: '16px',
});

const NotificationItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const NotificationInfo = styled(Box)({});

const NotificationLabel = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#1e3a8a',
});

const NotificationDesc = styled(Typography)({
  fontSize: '0.75rem',
  color: '#1e40af',
});

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const StatusBadge = styled('span')({
  color: '#16a34a',
  fontWeight: 500,
});

export const Step5Complete: React.FC<StepProps> = ({
  formData,
  onComplete,
  onPrevious,
  isLoading,
  error,
}) => {
  const [isCompleting, setIsCompleting] = React.useState(false);

  const handleComplete = async () => {
    setIsCompleting(true);
    try {
      await onComplete();
    } finally {
      setIsCompleting(false);
    }
  };

  const getSelectedPlan = () => {
    return 'Professional Plan';
  };

  return (
    <Container>
      <Header>
        <IconCircle>
          <CheckCircleIcon sx={{ fontSize: 40, color: '#22c55e' }} />
        </IconCircle>
        <Title>You're all set!</Title>
        <Subtitle>
          Welcome to PasswordManager. Let's get you started with your account.
        </Subtitle>
      </Header>

      {error && (
        <Alert severity="error" sx={{ borderRadius: '8px' }}>
          {error}
        </Alert>
      )}

      {/* Summary */}
      <SummaryBox>
        <SummaryTitle>Account Summary</SummaryTitle>
        
        <SummarySection>
          <SummaryLabel>Personal Information</SummaryLabel>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <SummaryValue><span>Name:</span> {formData.fullName}</SummaryValue>
            <SummaryValue><span>Email:</span> {formData.email}</SummaryValue>
            <SummaryValue><span>Plan:</span> {getSelectedPlan()}</SummaryValue>
            <SummaryValue><span>Status:</span> <StatusBadge>Active</StatusBadge></SummaryValue>
          </Box>
        </SummarySection>
      </SummaryBox>

      {/* Notification Preferences */}
      <NotificationBox>
        <NotificationTitle>Notification Preferences</NotificationTitle>
        <Box>
          {[
            { key: 'email', label: 'Email notifications', description: 'Receive updates via email' },
            { key: 'sms', label: 'SMS notifications', description: 'Receive updates via text message' },
            { key: 'push', label: 'Push notifications', description: 'Receive browser notifications' },
          ].map((notification) => (
            <NotificationItem key={notification.key}>
              <NotificationInfo>
                <NotificationLabel>{notification.label}</NotificationLabel>
                <NotificationDesc>{notification.description}</NotificationDesc>
              </NotificationInfo>
              <Switch
                checked={formData.preferences.notifications[notification.key as keyof typeof formData.preferences.notifications]}
                disabled
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: '#3b82f6',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: '#3b82f6',
                  },
                }}
              />
            </NotificationItem>
          ))}
        </Box>
      </NotificationBox>

      <ButtonGroup>
        <Button
          onClick={onPrevious}
          variant="outlined"
          size="large"
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleComplete}
          disabled={isLoading || isCompleting}
          variant="contained"
          color="primary"
          size="large"
          className="flex-1"
        >
          {isLoading || isCompleting ? 'Creating Account...' : 'Complete Setup'}
        </Button>
      </ButtonGroup>
    </Container>
  );
};

