/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme, fade } from "@material-ui/core/styles";

const inputStyles = makeStyles((theme: Theme) => ({
  input: {
    "&:-webkit-autofill": {
      boxShadow: `0 0 0 50px ${theme.palette.primary.main} inset`,
      borderRadius: 0,
      backgroundColor: "red",
      "-webkit-box-shadow": `0 0 0 50px ${theme.palette.primary.main} inset`,
      "-webkit-text-fill-color": theme.palette.secondary.main
    },
    "&:-webkit-autofill:focus": {
      boxShadow: `0 0 0 50px ${theme.palette.primary.main} inset`,
      borderRadius: 0,
      backgroundColor: "red",
      "-webkit-box-shadow": `0 0 0 50px ${theme.palette.primary.main} inset`,
      "-webkit-text-fill-color": theme.palette.secondary.main
    }
  }
}));

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "1rem",
    marginTop: "1rem",
    "& label": {
      color: theme.palette.secondary.main
    },
    "& .MuiInputBase-root": {
      color: theme.palette.secondary.main
    },
    "& label.Mui-focused": {
      color: theme.palette.secondary.main
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.secondary.main
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.secondary.main
      },
      "&:hover fieldset": {
        borderColor: fade(theme.palette.secondary.main, 0.5)
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main
      }
    }
  },
  title: {
    color: theme.palette.secondary.main,
    paddingBottom: "1rem"
  },
  userNameInput: {
    paddingTop: "2rem"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  avatar: {
    height: "7rem",
    width: "7rem",
    marginBottom: "2rem"
  }
}));

export { useStyles, inputStyles };
