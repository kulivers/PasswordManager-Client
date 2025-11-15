import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MultiStepRegistration } from '../Components/Registration/MultiStepRegistration';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: any) => {
    console.log('Registration successful:', data);
    // Navigate to login or dashboard after successful registration
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleError = (error: string) => {
    console.error('Registration error:', error);
  };

  return (
    <MultiStepRegistration
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default RegistrationPage;

