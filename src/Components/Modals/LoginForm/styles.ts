import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const Wrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  height: '100%',
  width: '100%',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const BluringBack = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
  zIndex: 1,
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
});

export const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  padding: theme.spacing(6),
  width: '100%',
  maxWidth: '480px',
  boxSizing: 'border-box',
  backgroundColor: '#ffffff',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    maxWidth: '90%',
  },
}));

export const Form = styled('form')(({ theme }) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  width: '100%',
}));

export const StyledButton = styled('button')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(1),
}));

