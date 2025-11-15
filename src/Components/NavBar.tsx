import React from 'react';
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
  toggleShowRegistrationForm: (value: boolean) => void;
  showRegistrationForm: boolean;
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
  toggleShowRegistrationForm,
  showRegistrationForm,
}) => {
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
            onClick={() => {
              if (showRegistrationForm) {
                toggleShowRegistrationForm(!showRegistrationForm);
              }
              toggleShowLoginForm(!ShowLoginForm);
            }}
            style={{ marginRight: '8px' }}
          >
            Login
          </AuthButton>
          <AuthButton
            color="primary"
            variant="contained"
            onClick={() => {
              if (ShowLoginForm) {
                toggleShowLoginForm(!ShowLoginForm);
              }
              toggleShowRegistrationForm(!showRegistrationForm);
            }}
          >
            Registration
          </AuthButton>
        </StyledToolbar>
      </StyledAppBar>
    </div>
  );
};

export default NavBar;

