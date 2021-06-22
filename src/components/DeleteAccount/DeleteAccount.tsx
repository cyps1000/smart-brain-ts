import { useState } from "react";
import { useHistory } from "react-router-dom";

/**
 * Imports Material UI components
 */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

/**
 * Imports components
 */
import AlertModal from "../AlertModal";

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
   * Handles the modal state
   */
  const [open, setOpen] = useState(false);

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
   * Handles closing the modal
   */
  const handleClose = () => setOpen(false);

  /**
   * Handles opening the modal
   */
  const handleOpen = () => setOpen(true);

  /**
   * Handles deleteing the account
   */
  const deleteAccount = async () => {
    try {
      await apiClient.delete("/api/users");

      logout();
      history.push("/login");
      handleClose();
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
  };

  return (
    <Paper className={classes.paper}>
      <Grid justify="center" container item lg={12}>
        <Button
          variant="outlined"
          onClick={handleOpen}
          className={classes.button}
        >
          Delete Account
        </Button>
      </Grid>
      <AlertModal
        agree={deleteAccount}
        open={open}
        onClose={handleClose}
        title="Delete account"
        content="Are you sure? This cannot be undone"
      />
    </Paper>
  );
};

export default DeleteAccount;
