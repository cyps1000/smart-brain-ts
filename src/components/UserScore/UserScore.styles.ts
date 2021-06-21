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
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "1rem",
    "&:last-of-type": {
      paddingBottom: "1rem"
    }
  },
  avatar: {
    height: "1.8rem",
    width: "1.8rem",
    marginRight: "0.5rem"
  },
  user: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  userName: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "1rem"
  },
  score: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "1rem"
  }
}));

export { useStyles };
