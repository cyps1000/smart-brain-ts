import { useEffect } from "react";

/**
 * Imports Material UI Components
 */
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import LoadingBar from "../LoadingBar";
/**
 * Imports Components
 */
import UserScore from "../UserScore";

/**
 * Imports Hooks
 */
import { useApiClient, useUser } from "../../hooks";

/**
 * Imports the component styles
 */
import { useStyles } from "./Scoreboard.styles";

/**
 * Displays the component
 */
const Scoreboard: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Init the user state
   */
  const { user, users, loading, updateUsers, updateLoading } = useUser();

  /**
   * Init the api hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Handles fetching the users
   */
  const getUsers = async () => {
    const { data } = await apiClient.get("/api/profiles");

    if (data) {
      updateLoading(false);
      updateUsers(data);
    }
  };

  /**
   * Handles getting the users
   */
  useEffect(() => {
    updateLoading(true);
    getUsers();
    // eslint-disable-next-line
  }, [user.score]);

  return (
    <Paper elevation={5} className={classes.paper}>
      <Typography gutterBottom className={classes.title}>
        Scoreboard - Top 10
      </Typography>
      {loading ? (
        <LoadingBar />
      ) : (
        <Paper className={classes.usersPaper}>
          <Grid item lg={12}>
            {users ? (
              users.map((user, index) => (
                <UserScore key={user.id} user={user} index={index + 1} />
              ))
            ) : (
              <Typography>No scores just yet</Typography>
            )}
          </Grid>
        </Paper>
      )}
    </Paper>
  );
};

export default Scoreboard;
