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
import { useApiClient, useMessage } from "../../hooks";

/**
 * Imports User interface
 */
import { User } from "../../hooks";

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
   * Init the users state
   */
  const [users, setUsers] = useState<User[]>();

  /**
   * Init the laoding state
   */
  const [loading, setLoading] = useState(true);

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
    try {
      const { data } = await apiClient.get("/api/profiles");

      if (!data) {
        setLoading(false);
      }
      setUsers(data);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { msg } = error.response.data;

        if (msg === "Token is not valid") {
          dispatchMessage({
            message: "Session expired",
            severity: "error",
            autoClose: 3000
          });
        }
      }
    }
  };

  /**
   * Handles the loading state
   */
  useEffect(() => {
    if (users && users.length > 0) {
      setLoading(false);
    }
  }, [users]);

  /**
   * Handles getting the users
   */
  useEffect(() => {
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
