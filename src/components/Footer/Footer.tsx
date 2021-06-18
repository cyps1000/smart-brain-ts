/**
 * Imports Material UI components
 */
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import GitHubIcon from "@material-ui/icons/GitHub";
import Link from "@material-ui/core/Link";
import Tooltip from "@material-ui/core/Tooltip";

/**
 * Imports the component styles
 */
import { useStyles } from "./Footer.styles";

/**
 * Defines the props interface
 */
export interface FooterProps {
  text: string;
}

/**
 * Displays the component
 */
const Footer: React.FC<FooterProps> = (props) => {
  const { text } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Typography variant="h6">{text}</Typography>
      <Tooltip title="Github" placement="top">
        <Link href="https://github.com/cyps1000/smart-brain-ts">
          <IconButton size="small" className={classes.githubButton}>
            <GitHubIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </AppBar>
  );
};

export default Footer;
