import { useStyles } from "./styles";
import Zoom from "@mui/material/Zoom";
import { Container, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import ToggleIcon from "material-ui-toggle-icon";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export const LoginForm = ({ isOpen, setLoginIsOpen, ...props }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
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
    const url = "https://localhost:5001/api/token";
    const body = {
      UserName: login,
      Password: password,
    };
    const result = await axios.post(url, body);
    console.log(result);
  };

  return isOpen ? (
    <div className={classes.wrapper}>
      <div
        className={classes.bluringBack}
        onClick={() => setLoginIsOpen(!isOpen)}
      />
      <Container maxWidth="sm" className={classes.root}>
        <Zoom
          in={isOpen}
          style={{ transitionDelay: isOpen ? "200ms" : "200ms" }}
        >
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item sm>
                <Typography variant={"h4"} align={"center"}>
                  Login
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
                  inputProps={classes.inputProps}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    id="standard-basic"
                    type={!showPassword ? "password" : "text"}
                    value={password}
                    onChange={handlePassword}
                    className={classes.input}
                    label={"Password"}
                  />
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    <ToggleIcon
                      on={showPassword}
                      onIcon={<Visibility />}
                      offIcon={<VisibilityOff />}
                      color="action"
                    />
                  </IconButton>
                </div>
              </Grid>
              <Grid item style={{ margin: "0 auto" }}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                  className={classes.button}
                  onClick={() => {
                    setLoginIsOpen(!isOpen);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="inherit"
                  variant="outlined"
                  className={classes.button}
                  onClick={() => setLoginIsOpen(!isOpen)}
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
