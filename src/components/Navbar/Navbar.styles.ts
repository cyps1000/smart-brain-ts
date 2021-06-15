/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    color: theme.palette.common.white,
    "&:hover": {
      color: theme.palette.secondary.main
    },
    "& svg": {
      marginRight: "0.4rem"
    }
  }
}));

export { useStyles };
