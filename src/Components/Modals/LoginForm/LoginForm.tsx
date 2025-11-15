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
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Typography variant="h4" align="center">
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="login-input"
                  label="Login"
                  type="text"
                  value={login}
                  onChange={handleLogin}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <TextField
                    id="password-input"
                    type={!showPassword ? 'password' : 'text'}
                    value={password}
                    onChange={handlePassword}
                    label="Password"
                    fullWidth
                  />
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    <ToggleIconButton
                      on={showPassword}
                      onIcon={<Visibility />}
                      offIcon={<VisibilityOff />}
                    />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button
                  type="button"
                  color="primary"
                  variant="outlined"
                  onClick={() => setLoginIsOpen(!isOpen)}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
                <Button type="submit" color="inherit" variant="outlined">
                  Send
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Zoom>
      </StyledContainer>
    </Wrapper>
  ) : null;
};

