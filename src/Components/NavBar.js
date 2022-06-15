import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@mui/icons-material/Lock";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%'
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
    appbar: {width: '100%'},
    toolbar: {width: '100%'}
}));

export default function NavBar({
                                   ShowLoginForm,
                                   toggleShowLoginForm,
                                   toggleShowRegistrationForm,
                                   showRegistrationForm,
                               }) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <LockIcon/>
                    </IconButton>
                    <Typography variant="h4" className={classes.title}>
                        Password manager
                    </Typography>
                    <Button
                        color="inherit"
                        variant="outlined"
                        onClick={() => {
                            if (showRegistrationForm)
                                toggleShowRegistrationForm(!showRegistrationForm);
                            toggleShowLoginForm(!ShowLoginForm);
                        }}
                        className={classes.authButton}
                        style={{marginRight: "8px"}}
                    >
                        Login
                    </Button>{" "}
                    <Button
                        color="default"
                        variant={"contained"}
                        onClick={() => {
                            if (ShowLoginForm) {
                                toggleShowLoginForm(!ShowLoginForm);
                            }
                            toggleShowRegistrationForm(!showRegistrationForm);
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
