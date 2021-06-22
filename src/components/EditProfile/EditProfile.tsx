import { ChangeEvent, useEffect, useState } from "react";

/**
 * Imports Material UI components
 */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

/**
 * Imports Hooks
 */
import { useApiClient, useMessage, useUser } from "../../hooks";

/**
 * Imports URL validation util
 */
import { isURL, isImage } from "../../utils";

/**
 * Imports the component styles
 */
import { useStyles, inputStyles } from "./EditProfile.styles";

/**
 * Imports the User interface
 */
import { User } from "../../hooks/useUser/Context";

/**
 * Defines the props interface
 */
export interface EditProfileProps {
  user: User;
}

/**
 * Defines the form inputs interface
 */
interface FormInputs {
  avatar: string;
  firstName: string;
  lastName: string;
}

/**
 * Displays the component
 */
const EditProfile: React.FC<EditProfileProps> = (props) => {
  const { user } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Gets the input component styles
   */
  const inputClasses = inputStyles();

  /**
   * Defines the default state of the form
   */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: ""
  });

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
   * Gets the values from formData
   */
  const { firstName, lastName, avatar } = formData;

  /**
   * Handles updating the profile
   */
  const updateProfile = async (inputs: FormInputs) => {
    /**
     * Checks for firstName
     */
    if (firstName.length < 1)
      return dispatchMessage({
        message: "First Name is required",
        severity: "error",
        autoClose: 3000
      });

    /**
     * Checks for lastName
     */
    if (lastName.length < 1)
      return dispatchMessage({
        message: "Last Name is required",
        severity: "error",
        autoClose: 3000
      });

    /**
     * Checks for avatar URL
     */
    if (avatar.length < 1)
      return dispatchMessage({
        message: "Avatar URL is required",
        severity: "error",
        autoClose: 3000
      });

    /**
     * Checks if avatar is valid URL
     */
    if (!isURL(avatar))
      return dispatchMessage({
        message: "Invalid URL",
        severity: "error",
        autoClose: 3000
      });

    if (!isImage(avatar))
      return dispatchMessage({
        message: "Invalid Image",
        severity: "error",
        autoClose: 3000
      });

    const res = await apiClient.put("/api/profile", inputs);

    if (res) {
      const { data } = res;

      updateUser({
        ...authUser,
        avatar: data.avatar,
        firstName: data.firstName,
        lastName: data.lastName
      });
      dispatchMessage({
        message: "Profile Updated",
        severity: "success",
        autoClose: 3000
      });
    }
  };

  /**
   * Handles the event source when the value is changed
   */
  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handles submitting the form
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfile(formData);
  };

  useEffect(() => {
    setFormData({
      firstName: !user.firstName ? "" : user.firstName,
      lastName: !user.lastName ? "" : user.lastName,
      avatar: !user.avatar ? "" : user.avatar
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Paper className={classes.paper}>
      <Grid container item lg={12} justify="center">
        <Typography variant="h6" className={classes.title}>
          Hello, {user.firstName}. Here you can edit/update your profile
        </Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container item lg={12} justify="center" alignContent="center">
          <Avatar src={avatar} className={classes.avatar} />
        </Grid>
        <Grid container item lg={12} justify="center">
          <TextField
            variant="outlined"
            value={avatar}
            onChange={(e) => onChange(e)}
            fullWidth
            type="avatar"
            id="avatar"
            label="Avatar"
            name="avatar"
            color="secondary"
            InputProps={{ classes: inputClasses }}
          />
          <Typography variant="caption" color="secondary">
            In this field enter the direct link to the image, which starts with
            https:// and ends in .jpg/.png/.gif. Everything else is incorrect
            and can produce surprises.
          </Typography>
        </Grid>
        <Grid
          container
          item
          lg={12}
          justify="center"
          className={classes.userNameInput}
        >
          <TextField
            variant="outlined"
            value={firstName}
            onChange={(e) => onChange(e)}
            fullWidth
            type="firstName"
            id="firstName"
            label="First Name"
            name="firstName"
            color="secondary"
            InputProps={{ classes: inputClasses }}
          />
        </Grid>
        <Grid
          container
          item
          lg={12}
          justify="center"
          className={classes.userNameInput}
        >
          <TextField
            variant="outlined"
            value={lastName}
            onChange={(e) => onChange(e)}
            fullWidth
            type="lastName"
            id="lastName"
            label="Last Name"
            name="lastName"
            color="secondary"
            InputProps={{ classes: inputClasses }}
          />
        </Grid>
        <Grid
          container
          item
          lg={12}
          justify="center"
          className={classes.userNameInput}
        >
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="Update Profile"
          >
            Update
          </Button>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditProfile;
