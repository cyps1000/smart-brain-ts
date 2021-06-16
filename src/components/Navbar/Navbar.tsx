import { useHistory } from "react-router-dom";

/**
 * Imports Material UI components
 */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";

/**
 * Imports Font Awesome Icons
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons";

/**
 * Imports Components
 */
import NavbarMenu from "../NavbarMenu";

/**
 * Imports the component styles
 */
import { useStyles } from "./Navbar.styles";

/**
 * Displays the component
 */
const Navbar: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Gets the history object
   */
  const history = useHistory();

  /**
   * Handles routing
   */
  const routeTo = (url: string) => {
    history.push(url);
  };

  /**
   * Defines the routing functions
   */
  const goToLogin = () => routeTo("/login");
  const goToRegister = () => routeTo("/register");
  const goToApp = () => routeTo("/");

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.iconButton}
            onClick={goToApp}
          >
            <FontAwesomeIcon icon={faAtom} />
            <Typography variant="h5">Smart-Brain</Typography>
          </IconButton>
          <NavbarMenu goToLogin={goToLogin} goToRegister={goToRegister} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
