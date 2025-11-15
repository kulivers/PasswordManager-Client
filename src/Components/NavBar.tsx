import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
}));

const StyledToolbar = styled(Toolbar)({
  width: '100%',
  padding: '12px 24px',
});

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 700,
  color: theme.palette.text.primary,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  borderRadius: '12px',
  padding: '8px 20px',
  borderWidth: '1.5px',
  borderColor: theme.palette.primary.main,
  color: theme.palette.primary.main,
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    borderWidth: '1.5px',
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    borderColor: theme.palette.primary.dark,
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: '6px 16px',
  },
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  borderRadius: '12px',
  padding: '8px 20px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
    padding: '6px 16px',
  },
}));

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistrationClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  // Don't show navbar on registration and login pages
  if (location.pathname === '/register' || location.pathname === '/login') {
    return null;
  }

  return (
    <div style={{ flexGrow: 1, width: '100%' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <MenuIconButton edge="start" aria-label="menu">
            <LockIcon />
          </MenuIconButton>
          <Title variant="h4">PasswordManager</Title>
          <LoginButton
            variant="outlined"
            onClick={handleLoginClick}
          >
            Login
          </LoginButton>
          <RegisterButton
            variant="contained"
            onClick={handleRegistrationClick}
          >
            Registration
          </RegisterButton>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  );
};

export default NavBar;

