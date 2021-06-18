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
    display: "flex",
    backgroundColor: theme.palette.primary.dark,
    justifyContent: "center"
  },
  tabs: {
    color: theme.palette.common.white
  }
}));

export { useStyles };
