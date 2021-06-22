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
    padding: "0.5rem 0",
    [theme.breakpoints.down("xs")]: {
      marginRight: 0
    }
  }
}));

export { useStyles };
