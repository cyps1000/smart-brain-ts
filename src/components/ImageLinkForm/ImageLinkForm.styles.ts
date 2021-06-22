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
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
    padding: "0 2rem",
    color: theme.palette.secondary.main,
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
  button: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.black,
    padding: "0.4rem 2rem",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.primary.main
    }
  }
}));

export { useStyles, inputStyles };
