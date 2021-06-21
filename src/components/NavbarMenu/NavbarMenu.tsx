import { useState } from "react";
import { useHistory } from "react-router-dom";

/**
 * Imports Material UI components
 */
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownOutlinedIcon from "@material-ui/icons/ArrowDropDownOutlined";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

/**
 * Imports hooks
 */
import { useAuth, useUser } from "../../hooks";

/**
 * Imports the component styles
 */
import { useStyles } from "./NavbarMenu.styles";

/**
 * Defines the props interface
 */
export interface NavbarMenuProps {
  goToLogin: () => void;
  goToRegister: () => void;
}

/**
 * Displays the component
 */
const NavbarMenu: React.FC<NavbarMenuProps> = (props) => {
  const { goToLogin, goToRegister } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Handles getting the auth state
   */
  const { auth, logout } = useAuth();

  /**
   * Handles getting the user state
   */
  const { user } = useUser();

  /**
   * Gets the history object
   */
  const history = useHistory();

  /**
   * Destructure first name and avatar from the user state
   */
  const { firstName, avatar } = user;

  /**
   * Handles routing
   */
  const routeTo = (url: string) => {
    history.push(url);
  };

  /**
   * Init the anchor state
   */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  /**
   * Handles opening the menu
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles closing the menu
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Defines the routing functions
   */
  const goToProfile = () => {
    routeTo("/profile");
    handleClose();
  };

  /**
   * Handles logging out the user
   */
  const handleLogout = () => {
    logout();
    handleClose();
    routeTo("/login");
  };

  /**
   * Displays the component for unauthenticated users
   */
  const guestMenu = (
    <Box className={classes.menuItems}>
      <Button onClick={goToRegister}>Sign Up</Button>
      <Button onClick={goToLogin}>Sign In</Button>
    </Box>
  );

  /**
   * Displays the component for authenticated users
   */
  const userMenu = (
    <Box className={classes.userMenu}>
      <Avatar alt={firstName} src={avatar} />
      <IconButton
        edge="end"
        onClick={handleClick}
        className={classes.dropdownArrow}
      >
        <ArrowDropDownOutlinedIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.dropdownMenu}
      >
        <MenuItem onClick={goToProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );

  return auth.isLoggedIn ? userMenu : guestMenu;
};

export default NavbarMenu;
