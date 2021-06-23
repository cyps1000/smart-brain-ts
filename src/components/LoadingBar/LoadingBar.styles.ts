/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: "0.1rem",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  progressBar: {
    backgroundColor: "#ee82ee"
  }
}));

export { useStyles };
