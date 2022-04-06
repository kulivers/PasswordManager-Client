import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@mui/icons-material/Lock";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },
  authButton: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7rem",
    },
  },
}));

export default function NavBar({
  isLoginOpen,
  setLoginIsOpen,
  setRegistrationIsOpen,
  isRegistrationOpen,
}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <LockIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Password manager
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => {
              if (isRegistrationOpen)
                setRegistrationIsOpen(!isRegistrationOpen);
              setLoginIsOpen(!isLoginOpen);
            }}
            className={classes.authButton}
            style={{ marginRight: "8px" }}
          >
            Login
          </Button>{" "}
          <Button
            color="default"
            variant={"contained"}
            onClick={() => {
              if (isLoginOpen) {
                setLoginIsOpen(!isLoginOpen);
              }
              setRegistrationIsOpen(!isRegistrationOpen);
            }}
            className={classes.authButton}
          >
            Registration
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
