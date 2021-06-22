/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    padding: "1rem",
    marginTop: "1rem"
  },
  avatar: {
    height: "7rem",
    width: "7rem"
  },
  user: {
    color: theme.palette.secondary.main,
    marginTop: "1rem"
  },
  score: {
    color: "#ee82ee",
    marginTop: "1rem"
  },
  button: {
    marginTop: "1rem",
    color: theme.palette.common.white,
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.main,
      backgroundColor: theme.palette.common.white
    }
  }
}));

export { useStyles };
