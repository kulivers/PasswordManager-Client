import React from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { ProgressIndicator } from './ProgressIndicator';
import { Step1BasicInfo } from './steps/Step1BasicInfo';
import { Step3Security } from './steps/Step3Security';
import { Step4Verification } from './steps/Step4Verification';
import { Step5Complete } from './steps/Step5Complete';
import {
  submitStep,
  completeRegistration,
  previousStep,
} from '../../redux/slices/registrationSlice';
import { PROGRESS_STEPS, REGISTRATION_TEXTS } from '../../constants/form';
import { TermsOfService } from './TermsOfService';
import { PrivacyPolicy } from './PrivacyPolicy';

interface MultiStepRegistrationProps {
  illustrationImage?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

const Container = styled(Box)({
  minHeight: '100vh',
  background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
});

const MainCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  width: '100%',
  maxWidth: '1200px',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
}));

const IllustrationSide = styled(Grid)({
  background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)',
  padding: '48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
});

const BrandLogo = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '32px',
  left: '32px',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const IllustrationContent = styled(Box)({
  textAlign: 'center',
});

const IllustrationImage = styled('img')({
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  objectFit: 'contain',
  marginBottom: '32px',
});

const IllustrationTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: '16px',
}));

const IllustrationSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  color: theme.palette.text.secondary,
}));

const FormSide = styled(Grid)({
  padding: '48px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const LoginLink = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  marginBottom: '32px',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
  '& a': {
    color: theme.palette.primary.main,
    fontWeight: 600,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));

const FormHeader = styled(Box)({
  marginBottom: '32px',
});

const ProgressSection = styled(Box)({
  marginBottom: '32px',
});

const ProgressHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const StepCounter = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const FormContent = styled(Box)({
  flex: 1,
});

const Footer = styled(Box)(({ theme }) => ({
  marginTop: '32px',
  textAlign: 'center',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  '& button': {
    background: 'none',
    border: 'none',
    color: theme.palette.primary.main,
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
    font: 'inherit',
    '&:hover': {
      color: theme.palette.primary.dark,
    },
  },
}));

export const MultiStepRegistration: React.FC<MultiStepRegistrationProps> = ({
  illustrationImage,
  onSuccess,
  onError,
}) => {
  const dispatch = useAppDispatch();
  const { currentStep, formData, isLoading, error, isCompleted } = useAppSelector(
    (state) => state.registration
  );

  const [showTerms, setShowTerms] = React.useState(false);
  const [showPrivacy, setShowPrivacy] = React.useState(false);

  const handleNext = (data: any) => {
    dispatch(submitStep({ step: currentStep, data }));
  };

  const handlePrevious = () => {
    dispatch(previousStep());
  };

  const handleComplete = async () => {
    dispatch(completeRegistration());
  };

  // Handle successful completion
  React.useEffect(() => {
    if (isCompleted) {
      onSuccess?.(formData);
    }
  }, [isCompleted, formData, onSuccess]);

  // Handle errors
  React.useEffect(() => {
    if (error) {
      onError?.(error);
    }
  }, [error, onError]);

  const renderStep = () => {
    const stepProps = {
      formData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      onComplete: handleComplete,
      isLoading,
      error,
      onShowTerms: () => setShowTerms(true),
      onShowPrivacy: () => setShowPrivacy(true),
    };

    switch (currentStep) {
      case 1:
        return <Step1BasicInfo {...stepProps} />;
      case 2:
        return <Step3Security {...stepProps} />;
      case 3:
        return <Step4Verification {...stepProps} />;
      case 4:
        return <Step5Complete {...stepProps} />;
      default:
        return <Step1BasicInfo {...stepProps} />;
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: 'Basic Information',
      2: 'Security & Privacy',
      3: 'Email Verification',
      4: 'Complete Setup',
    };
    return titles[currentStep as keyof typeof titles] || 'Registration';
  };

  return (
    <Container>
      <MainCard>
        <Grid container>
          {/* Left Side - Illustration */}
          <IllustrationSide item xs={12} md={6}>
            <BrandLogo>{REGISTRATION_TEXTS.brand.name}</BrandLogo>
            <IllustrationContent>
              {illustrationImage && (
                <IllustrationImage
                  src={illustrationImage}
                  alt="Password Manager Illustration"
                />
              )}
              <IllustrationTitle>
                Welcome to {REGISTRATION_TEXTS.brand.name}
              </IllustrationTitle>
              <IllustrationSubtitle>
                {REGISTRATION_TEXTS.brand.tagline}
              </IllustrationSubtitle>
            </IllustrationContent>
          </IllustrationSide>

          {/* Right Side - Form */}
          <FormSide item xs={12} md={6}>
            {/* Login Link */}
            <LoginLink>
              <span>{REGISTRATION_TEXTS.navigation.signInText} </span>
              <a href="/login">{REGISTRATION_TEXTS.navigation.signInLink}</a>
            </LoginLink>

            {/* Form Header */}
            <FormHeader>
              <ProgressSection>
                <ProgressHeader>
                  <StepTitle>{getStepTitle()}</StepTitle>
                  <StepCounter>Step {currentStep} of 4</StepCounter>
                </ProgressHeader>
                <ProgressIndicator steps={PROGRESS_STEPS} currentStep={currentStep} />
              </ProgressSection>
            </FormHeader>

            {/* Step Content */}
            <FormContent>
              {renderStep()}
            </FormContent>

            {/* Footer */}
            <Footer>
              <p>
                By continuing, you agree to our{' '}
                <button onClick={() => setShowTerms(true)}>
                  Terms of Service
                </button>{' '}
                and{' '}
                <button onClick={() => setShowPrivacy(true)}>
                  Privacy Policy
                </button>
              </p>
            </Footer>
          </FormSide>
        </Grid>
      </MainCard>

      {/* Terms Modal */}
      <TermsOfService open={showTerms} onClose={() => setShowTerms(false)} />

      {/* Privacy Modal */}
      <PrivacyPolicy open={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </Container>
  );
};

