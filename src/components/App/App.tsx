/**
 * Imports Material UI Components
 */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

/**
 * Imports the component styles
 */
import { useStyles } from "./App.styles";

/**
 * Displays the component
 */
const App: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return <Paper elevation={5} className={classes.paper}></Paper>;
};

export default App;
