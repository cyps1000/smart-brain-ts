/**
 * Imports the component styles
 */
import { useStyles } from "./Body.styles";

/**
 * Displays the component
 */
const Body: React.FC = (props) => {
  const { children } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default Body;
