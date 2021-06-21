/**
 * External Imports
 */
import { format, parseISO } from "date-fns";

/**
 * Imports Material UI components
 */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

/**
 * Imports the component styles
 */
import { useStyles } from "./ViewProfile.styles";

/**
 * Imports Hooks
 */
import { useApiClient, useMessage, useUser } from "../../hooks";

/**
 * Imports the User interface
 */
import { User } from "../../hooks/useUser/Context";

/**
 * Defines the props interface
 */
export interface ViewProfileProps {
  user: User;
}

/**
 * Displays the component
 */
const ViewProfile: React.FC<ViewProfileProps> = (props) => {
  const { user } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Init the auth hook
   */
  const { updateUser, user: authUser } = useUser();

  /**
   * Init the api client
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Init the message hook
   */
  const { dispatchMessage } = useMessage();

  /**
   * Handles reseting the score
   */
  const resetScore = async () => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      const { data } = await apiClient.put("/api/profile/score");

      updateUser({ ...authUser, score: data.score });
      dispatchMessage({
        message: data.msg,
        severity: "success",
        autoClose: 3000
      });
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid justify="center" container item lg={12}>
        <Avatar src={user.avatar} className={classes.avatar} />
      </Grid>
      <Grid justify="center" container item lg={12} className={classes.user}>
        <Typography variant="h4">
          {user.firstName} {user.lastName}
        </Typography>
      </Grid>
      <Grid justify="center" container item lg={12} className={classes.user}>
        <Typography variant="h6">E-mail: {user.email}</Typography>
      </Grid>
      <Grid justify="center" container item lg={12} className={classes.user}>
        <Typography variant="h6">
          Member since:{" "}
          {user.createdAt && format(parseISO(user.createdAt), "MM/dd/yyyy")}
        </Typography>
      </Grid>
      <Grid justify="center" container item lg={12} className={classes.score}>
        <Typography variant="h5">Score: {user.score}</Typography>
      </Grid>
      <Grid justify="center" container item lg={12}>
        <Button
          variant="outlined"
          onClick={resetScore}
          disabled={!user.score}
          className={classes.button}
        >
          Reset Score
        </Button>
      </Grid>
    </Paper>
  );
};

export default ViewProfile;
