import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';

interface NavBarProps {
  ShowLoginForm: boolean;
  toggleShowLoginForm: (value: boolean) => void;
}

const StyledAppBar = styled(AppBar)({
  width: '100%',
});

const StyledToolbar = styled(Toolbar)({
  width: '100%',
});

const MenuIconButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.7rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
}));

const AuthButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.7rem',
  },
}));

const NavBar: React.FC<NavBarProps> = ({
  ShowLoginForm,
  toggleShowLoginForm,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistrationClick = () => {
    // Close login form if open
    if (ShowLoginForm) {
      toggleShowLoginForm(false);
    }
    // Navigate to registration page
    navigate('/register');
  };

  const handleLoginClick = () => {
    toggleShowLoginForm(!ShowLoginForm);
  };

  // Don't show navbar on registration page
  if (location.pathname === '/register') {
    return null;
  }

  return (
    <div style={{ flexGrow: 1, width: '100%' }}>
      <StyledAppBar position="static">
        <StyledToolbar>
          <MenuIconButton edge="start" color="inherit" aria-label="menu">
            <LockIcon />
          </MenuIconButton>
          <Title variant="h4">Password manager</Title>
          <AuthButton
            color="inherit"
            variant="outlined"
            onClick={handleLoginClick}
            style={{ marginRight: '8px' }}
          >
            Login
          </AuthButton>
          <AuthButton
            color="primary"
            variant="contained"
            onClick={handleRegistrationClick}
          >
            Registration
          </AuthButton>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  );
};

export default NavBar;

