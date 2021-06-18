/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme, fade } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    top: "auto",
    bottom: 0,
    paddingTop: "0.2rem",
    paddingBottom: "0.2rem"
  },
  githubButton: {
    marginLeft: "0.4rem",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: fade(theme.palette.secondary.main, 0.6)
    }
  }
}));

export { useStyles };
