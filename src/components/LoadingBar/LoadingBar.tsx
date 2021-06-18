/**
 * IMports Material UI components
 */
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

/**
 * Imports the component styles
 */
import { useStyles } from "./LoadingBar.styles";

/**
 * Displays the component
 */
const LoadingBar: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <LinearProgress color="secondary" />
    </Box>
  );
};

export default LoadingBar;
