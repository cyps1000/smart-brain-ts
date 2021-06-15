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
    paddingTop: "3rem",
    display: "flex",
    flexDirection: "column"
  },
  title: {
    display: "flex",
    justifyContent: "center"
  },
  form: {
    marginTop: 50
  }
}));

export { useStyles };
