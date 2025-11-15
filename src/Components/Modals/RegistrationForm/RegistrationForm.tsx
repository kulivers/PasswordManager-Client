import React, { useState } from 'react';
import { TextField, Button, Grid, Slide, Zoom, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import { SignupSchema } from './validationSchema';
import { Wrapper, BluringBack, StyledContainer, Form } from './styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ToggleIconButton from '../../Common/ToggleIconButton';
import { useSnackbar } from 'notistack';
import {
  registerUser,
  stopShowAlerts,
} from '../../../redux/slices/registrationSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RegistrationFormData } from '../../../types';

interface RegistrationFormProps {
  isOpen: boolean;
  setRegistrationIsOpen: (value: boolean) => void;
}

function showSnackbars(
  enqueueSnackbar: (message: string, options: any) => void,
  errors: string[],
  isSuccess: boolean,
  showAllerts: boolean,
  stopShowAlertsFunc: () => void
) {
  if (!showAllerts) return;

  if (!isSuccess && errors.length > 0) {
    errors.forEach((error) => {
      enqueueSnackbar(error, {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        variant: 'error',
        TransitionComponent: Slide,
      });
    });
  } else {
    enqueueSnackbar('Registration completed successfully', {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      variant: 'success',
      TransitionComponent: Slide,
    });
  }
  stopShowAlertsFunc();
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  setRegistrationIsOpen,
}) => {
  const dispatch = useAppDispatch();
  const registration = useAppSelector((state) => state.registration);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: RegistrationFormData) => {
    dispatch(registerUser(values));
  };

  showSnackbars(
    enqueueSnackbar,
    registration.errors,
    registration.isSuccess,
    registration.showAllerts,
    () => dispatch(stopShowAlerts())
  );

  const formik = useFormik<RegistrationFormData>({
    initialValues: {
      firstName: 'error',
      lastName: 'kuleshov',
      userName: 'kuvliere',
      password: '111qqqqq',
      email: 'kulivers@mail.ru',
      phoneNumber: '9212181121',
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return !registration.isSuccess && isOpen ? (
    <Wrapper>
      <BluringBack onClick={() => setRegistrationIsOpen(!isOpen)} />
      <StyledContainer maxWidth="sm">
        <Zoom
          in={!registration.isSuccess && isOpen}
          style={{
            transitionDelay: !registration.isSuccess && isOpen ? '200ms' : '200ms',
          }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Grid item sm={12}>
              <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                Registration
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="FirstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="LastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="userName"
                  name="userName"
                  label="Username"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={formik.touched.userName && Boolean(formik.errors.userName)}
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={!showPassword ? 'password' : 'text'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    <ToggleIconButton
                      on={showPassword}
                      onIcon={<Visibility />}
                      offIcon={<VisibilityOff />}
                    />
                  </IconButton>
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  name="phoneNumber"
                  label="PhoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                  }
                  helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  color="primary"
                  variant="outlined"
                  onClick={() => setRegistrationIsOpen(!isOpen)}
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

export default RegistrationForm;

