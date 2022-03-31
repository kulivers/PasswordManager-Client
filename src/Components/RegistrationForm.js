import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid, TextField } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100%",
    width: "100%",
  },
  bluringBack: {
    backgroundColor: "RGB(0, 0, 0, 0.2)",
    filter: "blur(8px)",
    zIndex: 12,
    height: "100%",
    width: "100%",
    transition: "background 2s",
    boxShadow: "0 0 0 0",
  },
  root: {
    zIndex: 2,
    "& .MuiInputBase-root": {
      color: "white",
      fontWeight: "bold",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& .fieldset": {
        color: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
        color: "white",
      },
      "& .Mui-focused fieldset": {
        color: "white",
        borderColor: "white",
      },
      "& .Mui fieldset": {
        color: "white",
        borderColor: "white",
      },
    },
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(4),
    width: "40%",
    boxSizing: "border-box",
    display: "inline-block",
    backgroundColor: theme.palette.info.main,
    border: "1px solid white",
    borderRadius: "10px",
  },
  form: {
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputProps: {
    color: "white",
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  input: {
    width: "100%",
    color: "white",
    "&&": { margin: theme.spacing(1), color: "white" },
  },
  inputContainer: { color: "white" },
}));
const YupValidationForm = () =>
  yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email("Invalid email").required("Email is required"),
    userName: yup
      .string()
      .typeError("It should be string")
      .min(4, "Too short name")
      .max(256, "To BIG name")
      .required("Please, tell me who are u"),
    phoneNumber: yup
      .number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(8),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .min(256, "Password is too long - should be 256 chars minimum.")
      .matches(/[A-Za-z0-9_*-]/, "Password must contain chars and digits."),
  });

export const RegistrationForm = ({ isOpen, setRegistrationIsOpen }) => {
  const classes = useStyles();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    setLogin(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return isOpen ? (
    <div className={classes.wrapper}>
      <div className={classes.bluringBack} />
      <Container maxWidth="sm" className={classes.root}>
        <Zoom
          in={isOpen}
          style={{ transitionDelay: isOpen ? "200ms" : "200ms" }}
        >
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm>
                <Typography variant={"h4"} align={"center"}>
                  Registration
                </Typography>
              </Grid>
              <Grid item spacing={6} xs={12} className={classes.inputContainer}>
                <TextField
                  id="standard-basic"
                  label="Login"
                  type="text"
                  value={login}
                  onChange={handleLogin}
                  className={classes.input}
                  fontColor="purple"
                  inputProps={classes.inputProps}
                />
                <TextField
                  id="standard-basic"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  className={classes.input}
                  label={"Password"}
                />
              </Grid>
              <Grid item style={{ margin: "0 auto" }}>
                <Button
                  type="submit"
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
          )}
        </Zoom>
      </Container>
    </div>
  ) : null;
};
