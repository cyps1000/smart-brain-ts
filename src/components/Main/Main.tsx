/**
 * Imports Material UI Components
 */
import Grid from "@material-ui/core/Grid";

/**
 * Imports components
 */
import MainTitle from "../MainTitle";
import Scoreboard from "../Scoreboard";
import App from "../App";
import Footer from "../Footer";

/**
 * Displays the component
 */
const Main: React.FC = () => {
  /**
   * Defines the App's title
   */
  const appTitle =
    "This Smart Brain will detect faces in your pictures. Give it a try!";

  /**
   * Defines the Footer's title
   */
  const footerText = "© Smart-Brain";

  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <MainTitle title={appTitle} />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
        <Scoreboard />
      </Grid>
      <Grid item xs={12} lg={8} xl={8}>
        <App />
      </Grid>
      <Grid item lg={12}>
        <Footer text={footerText} />
      </Grid>
    </Grid>
  );
};

export default Main;
