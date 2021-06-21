import { useHistory } from "react-router-dom";

/**
 * Imports Material UI components
 */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

/**
 * Imports the component styles
 */
import { useStyles } from "./DeleteAccount.styles";

/**
 * Imports Hooks
 */
import { useApiClient, useMessage, useAuth } from "../../hooks";

/**
 * Displays the component
 */
const DeleteAccount: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Gets the history object
   */
  const history = useHistory();

  /**
   * Init the api client
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Init the auth state
   */
  const { logout } = useAuth();

  /**
   * Init the message hook
   */
  const { dispatchMessage } = useMessage();

  /**
   * Handles deleteing the account
   */
  const deleteAccount = async () => {
    if (window.confirm("Are you sure? This cannot be undone.")) {
      try {
        await apiClient.delete("/api/users");

        logout();
        history.push("/login");
        dispatchMessage({
          message: "Your account has been permanently removed",
          severity: "success",
          autoClose: 3000
        });
      } catch (error) {
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
    }
  };

  return (
    <Paper className={classes.paper}>
      <Grid justify="center" container item lg={12}>
        <Button
          variant="outlined"
          onClick={deleteAccount}
          className={classes.button}
        >
          Delete Account
        </Button>
      </Grid>
    </Paper>
  );
};

export default DeleteAccount;
