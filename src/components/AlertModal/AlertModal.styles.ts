/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  AlertModal: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.dark
    }
  },
  text: {
    color: theme.palette.common.white
  },
  disagreeBtn: {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black
    }
  },
  agreeBtn: {
    color: theme.palette.error.light,
    "&:hover": {
      backgroundColor: theme.palette.error.light,
      color: theme.palette.common.white
    }
  }
}));

export { useStyles };
