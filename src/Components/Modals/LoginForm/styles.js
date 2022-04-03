import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
