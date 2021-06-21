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
    backgroundColor: theme.palette.primary.dark,
    paddingTop: "2rem",
    paddingBottom: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "0.5rem"
  },
  title: {
    color: theme.palette.secondary.main,
    fontSize: "1.5rem",
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9rem"
    },
    "& svg": {
      marginRight: "0.5rem"
    }
  }
}));

export { useStyles };
