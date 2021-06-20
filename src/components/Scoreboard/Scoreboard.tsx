import { useState, useEffect } from "react";

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
import { useApiClient, useMessage, useAuth } from "../../hooks";

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
   * Init the laoding state
   */
  const [loading, setLoading] = useState(false);

  /**
   * Init the auth hook
   */
  const { users, updateUsers } = useAuth();

  /**
   * Init the api hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Init the useMessage hook
   */
  const { dispatchMessage } = useMessage();

  /**
   * Handles fetching the users
   */
  const getUsers = async () => {
    const { data } = await apiClient.get("/api/profiles");

    if (data) {
      setLoading(false);
      updateUsers(data);
    }
  };

  /**
   * Handles getting the users
   */
  useEffect(() => {
    setLoading(true);
    getUsers();
    // eslint-disable-next-line
  }, []);

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
