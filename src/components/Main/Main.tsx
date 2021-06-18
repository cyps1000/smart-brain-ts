/**
 * Imports Material UI Components
 */
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

/**
 * Imports components
 */
import MainTitle from "../MainTitle";
import Scoreboard from "../Scoreboard";

/**
 * Imports the component styles
 */
import { useStyles } from "./Main.styles";

/**
 * Displays the component
 */
const Main: React.FC = () => {
  /**
   * Gets the component styles
   */
  // eslint-disable-next-line
  const classes = useStyles();

  /**
   * Defines the App's title
   */
  const appTitle =
    "This Magic Brain will detect faces in your pictures. Give it a try!";

  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <MainTitle title={appTitle} />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
        <Scoreboard />
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography color="secondary">App</Typography>
      </Grid>
      <Grid item lg={12}>
        <Typography color="secondary">Footer</Typography>
      </Grid>
    </Grid>
  );
};

export default Main;
