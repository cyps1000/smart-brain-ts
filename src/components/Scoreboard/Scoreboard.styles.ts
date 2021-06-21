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
    display: "flex",
    flexDirection: "column",
    marginBottom: "1rem",
    marginRight: "1rem",
    padding: "0.5rem 0",
    [theme.breakpoints.down("xs")]: {
      marginRight: 0
    },
    [theme.breakpoints.down("md")]: {
      marginRight: 0
    }
  },
  usersPaper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    paddingLeft: "1rem",
    marginLeft: "1rem",
    marginRight: "1rem"
  },
  container: {},
  title: {
    color: theme.palette.secondary.main,
    fontSize: "1.5rem",
    fontWeight: 600,
    alignSelf: "center"
  }
}));

export { useStyles };
