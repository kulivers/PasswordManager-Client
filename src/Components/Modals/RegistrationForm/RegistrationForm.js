import { Container, TextField } from "@mui/material";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import { SignupSchema } from "./validationSchema";
import { useStyles } from "./styles";
import { Grid, Slide, Zoom } from "@material-ui/core";
import ToggleIcon from "material-ui-toggle-icon";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { registerUser } from "../../../redux/actionCreators";

export const RegistrationForm = ({
  isOpen,
  setRegistrationIsOpen,
  ...props
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (values) => {
    console.log("OPAAA");
    await registerUser(values);
    if (!props.registration.isSuccess && props.registration.errors.length > 0) {
      props.registration.errors.forEach((error) =>
        enqueueSnackbar(error, {
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
          variant: "error",
          TransitionComponent: Slide,
        })
      );
    } else {
      enqueueSnackbar("Registration completed successfuly", {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        variant: "success",
        TransitionComponent: Slide,
      });
      setRegistrationIsOpen(!isOpen);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      handleSubmit();
    },
  });

  return isOpen ? (
    <div className={classes.wrapper}>
      <div
        className={classes.bluringBack}
        onClick={() => setRegistrationIsOpen(!isOpen)}
      />
      <Container maxWidth="sm" className={classes.root}>
        <Zoom
          in={isOpen}
          style={{ transitionDelay: isOpen ? "200ms" : "200ms" }}
        >
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <Grid item sm>
              <Typography
                variant={"h4"}
                align={"center"}
                className={classes.topLabel}
              >
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
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
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
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
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
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              <Grid item style={{ display: "flex", flexDirection: "row" }}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={!showPassword ? "password" : "text"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  <ToggleIcon
                    on={showPassword}
                    onIcon={<Visibility />}
                    offIcon={<VisibilityOff />}
                    color="action"
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
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                  helperText={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                  }
                />
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  color="primary"
                  variant="outlined"
                  className={classes.button}
                  onClick={() => {
                    setRegistrationIsOpen(!isOpen);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="inherit"
                  variant="outlined"
                  className={classes.button}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Zoom>
      </Container>
    </div>
  ) : null;
};
