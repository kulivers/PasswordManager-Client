import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const Wrapper = styled('div')({
  height: '100%',
  width: '100%',
});

export const BluringBack = styled('div')({
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  filter: 'blur(8px)',
  zIndex: 12,
  height: '100%',
  width: '100%',
  transition: 'background 2s',
  boxShadow: '0 0 0 0',
});

export const StyledContainer = styled(Container)(({ theme }) => ({
  zIndex: 2,
  '& .MuiInputBase-root': {
    color: 'white',
    fontWeight: 'bold',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      color: 'white',
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
      color: 'white',
    },
    '&.Mui-focused fieldset': {
      color: 'white',
      borderColor: 'white',
    },
  },
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: theme.spacing(4),
  width: '40%',
  boxSizing: 'border-box',
  display: 'inline-block',
  backgroundColor: theme.palette.info.main,
  border: '1px solid white',
  borderRadius: '10px',
}));

export const Form = styled('form')({
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledButton = styled('button')(({ theme }) => ({
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
}));

export const StyledInput = styled('input')(({ theme }) => ({
  width: '100%',
  color: 'white',
  margin: theme.spacing(1),
}));

