import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Wrapper, BluringBack, StyledContainer, Form } from './styles';
import Zoom from '@mui/material/Zoom';
import { Grid, TextField, Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ToggleIconButton from '../../Common/ToggleIconButton';

interface LoginFormProps {
  isOpen: boolean;
  setLoginIsOpen: (value: boolean) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isOpen,
  setLoginIsOpen,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = 'https://localhost:5001/api/token';
    const body = {
      UserName: login,
      Password: password,
    };
    try {
      const result = await axios.post(url, body);
      console.log(result);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return isOpen ? (
    <Wrapper>
      <BluringBack onClick={() => setLoginIsOpen(!isOpen)} />
      <StyledContainer maxWidth="sm">
        <Zoom
          in={isOpen}
          style={{ transitionDelay: isOpen ? '200ms' : '200ms' }}
        >
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography 
                  variant="h4" 
                  align="center"
                  sx={{ 
                    fontWeight: 700,
                    color: 'text.primary',
                    mb: 2
                  }}
                >
                  Welcome Back
                </Typography>
                <Typography 
                  variant="body2" 
                  align="center"
                  sx={{ 
                    color: 'text.secondary',
                    mb: 1
                  }}
                >
                  Sign in to your account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="login-input"
                  label="Username or Email"
                  type="text"
                  value={login}
                  onChange={handleLogin}
                  fullWidth
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password-input"
                  type={!showPassword ? 'password' : 'text'}
                  value={password}
                  onChange={handlePassword}
                  label="Password"
                  fullWidth
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton 
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: 'text.secondary' }}
                      >
                        <ToggleIconButton
                          on={showPassword}
                          onIcon={<Visibility />}
                          offIcon={<VisibilityOff />}
                        />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  sx={{ 
                    mb: 2,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  fullWidth
                  onClick={() => setLoginIsOpen(!isOpen)}
                  sx={{ 
                    py: 1.5,
                    fontWeight: 600,
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Zoom>
      </StyledContainer>
    </Wrapper>
  ) : null;
};

