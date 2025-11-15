import React from 'react';
import { Box, styled } from '@mui/material';
import { ProgressIndicatorProps } from '../../types/form';

const Container = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '8px',
});

const StepCircle = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s',
  backgroundColor: active ? '#3b82f6' : 'transparent',
  color: active ? '#ffffff' : '#cbd5e1',
  border: active ? 'none' : '2px solid #cbd5e1',
  '& span': {
    fontSize: '0.75rem',
    fontWeight: 600,
  },
}));

const Connector = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: '40px',
  height: '4px',
  marginLeft: '8px',
  marginRight: '8px',
  transition: 'all 0.3s',
  backgroundColor: active ? '#3b82f6' : '#e2e8f0',
  borderRadius: '2px',
  '@media (min-width: 768px)': {
    width: '64px',
    marginLeft: '12px',
    marginRight: '12px',
  },
  '@media (min-width: 1024px)': {
    width: '80px',
  },
}));

const StepWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <Container>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <StepWrapper>
            <StepCircle active={step.number <= currentStep}>
              <span>{step.number}</span>
            </StepCircle>
            {index < steps.length - 1 && (
              <Connector active={step.number < currentStep} />
            )}
          </StepWrapper>
        </React.Fragment>
      ))}
    </Container>
  );
};

