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
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "center",
    position: "relative"
  },
  media: {
    maxWidth: "100%",
    width: "700px",
    height: "auto"
  },
  boundingBox: {
    position: "absolute",
    boxShadow: "0 0 0 3px #149df2 inset",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    cursor: "pointer"
  }
}));

export { useStyles };
