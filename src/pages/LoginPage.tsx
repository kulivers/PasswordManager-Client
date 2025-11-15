import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  IconButton,
  Grid,
  Link as MuiLink
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { REGISTRATION_TEXTS } from '../constants/form';

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

const RegisterLink = styled(Box)(({ theme }) => ({
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

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: '8px',
}));

const PageSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const StyledForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

// Removed custom styled LoginButton - using standard MUI Button now

const Footer = styled(Box)(({ theme }) => ({
  marginTop: '24px',
  textAlign: 'center',
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
}));

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    
    const url = 'https://localhost:5001/api/token';
    const body = {
      UserName: login,
      Password: password,
    };
    
    try {
      const result = await axios.post(url, body);
      console.log('Login successful:', result);
      
      enqueueSnackbar('Login successful!', { variant: 'success' });
      
      // Store token if needed
      if (result.data.token) {
        localStorage.setItem('authToken', result.data.token);
      }
      
      // Navigate to dashboard or home
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      enqueueSnackbar('Login failed. Please check your credentials.', { 
        variant: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container>
      <MainCard>
        <Grid container>
          {/* Left Side - Illustration */}
          <IllustrationSide item xs={12} md={6}>
            <BrandLogo>{REGISTRATION_TEXTS.brand.name}</BrandLogo>
            <IllustrationContent>
              <IllustrationTitle>
                Welcome Back to {REGISTRATION_TEXTS.brand.name}
              </IllustrationTitle>
              <IllustrationSubtitle>
                Sign in to securely manage your passwords
              </IllustrationSubtitle>
            </IllustrationContent>
          </IllustrationSide>

          {/* Right Side - Form */}
          <FormSide item xs={12} md={6}>
            {/* Register Link */}
            <RegisterLink>
              <span>Don't have an account? </span>
              <a href="/register">Sign up</a>
            </RegisterLink>

            {/* Form Header */}
            <FormHeader>
              <PageTitle>Sign In</PageTitle>
              <PageSubtitle>Enter your credentials to access your account</PageSubtitle>
            </FormHeader>

            {/* Form Content */}
            <StyledForm onSubmit={handleSubmit}>
              <TextField
                id="login-input"
                label="Username or Email"
                type="text"
                value={login}
                onChange={handleLogin}
                fullWidth
                variant="outlined"
                required
                autoComplete="username"
                autoFocus
              />

              <TextField
                id="password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePassword}
                label="Password"
                fullWidth
                variant="outlined"
                required
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <IconButton 
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />

              <Box sx={{ textAlign: 'right' }}>
                <MuiLink
                  component="button"
                  type="button"
                  variant="body2"
                  sx={{ 
                    cursor: 'pointer',
                    color: '#667eea',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                  onClick={() => enqueueSnackbar('Password recovery feature coming soon!', { variant: 'info' })}
                >
                  Forgot password?
                </MuiLink>
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </StyledForm>

            {/* Footer */}
            <Footer>
              <MuiLink
                component="button"
                type="button"
                variant="body2"
                onClick={handleBackToHome}
                sx={{ 
                  cursor: 'pointer',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  }
                }}
              >
                ← Back to Home
              </MuiLink>
            </Footer>
          </FormSide>
        </Grid>
      </MainCard>
    </Container>
  );
};

export default LoginPage;


