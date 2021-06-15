/**
 *  Material UI Imports
 * @see https://material-ui.com/styles/basics/
 */
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * Styles the component
 */
const useStyles = makeStyles((theme: Theme) => ({
  menuItems: {
    marginLeft: "auto",
    "& button": {
      color: theme.palette.common.white,
      textTransform: "initial",
      fontSize: "1rem",
      marginLeft: "1rem",
      "&:hover": {
        color: theme.palette.secondary.main
      }
    }
  },
  dropdownMenu: {
    "& .MuiMenu-paper": {
      backgroundColor: theme.palette.secondary.dark,
      color: theme.palette.secondary.main
    }
  },
  userAvatar: {
    width: "1.5rem",
    height: "1.5rem"
  },
  dropdownArrow: {
    color: theme.palette.common.white,
    marginLeft: "-0.4rem",
    "&:hover": {
      color: theme.palette.secondary.main
    }
  },
  userMenu: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    "& p": {
      paddingLeft: "0.3rem"
    }
  }
}));

export { useStyles };
