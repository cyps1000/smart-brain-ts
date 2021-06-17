/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme, fade } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    paddingTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  },
  title: {
    display: "flex",
    justifyContent: "center"
  },
  form: {
    marginTop: 50
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.common.black,
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  linkLogin: {
    textDecoration: "none",
    color: theme.palette.secondary.main
  },
  cssLabel: {
    color: "green"
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: theme.palette.secondary.main
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: theme.palette.secondary.main
  }
}));

export { useStyles };
