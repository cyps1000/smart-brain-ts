/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

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
  }
}));

export { useStyles };
