import { useState, ChangeEvent } from "react";
import { Link, Redirect } from "react-router-dom";

/**
 * Imports Material UI Components
 */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/**
 * Imports Hooks
 */
import { useAuth, useApiClient, useMessage } from "../../hooks";

/**
 * Imports utils
 */
import { isEmail } from "../../utils/validateEmail";

/**
 * Imports the component styles
 */
import { useStyles } from "./Register.styles";

/**
 * Defines the form inputs interface
 */
interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

/**
 * Displays the component
 */
const Register: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Inits the auth hook
   */
  const { auth, setToken } = useAuth();

  /**
   * Inits the API
   */
  const { apiClient } = useApiClient({});

  /**
   * Init the useMessage hook
   */
  const { dispatchMessage } = useMessage();

  /**
   * Init the text area state
   */
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const { firstName, lastName, email, password, passwordConfirm } = formData;

  /**
   * Handles registering an user
   */
  const register = async (inputs: FormInputs) => {
    /**
     * Handles checking if the passwords match
     */
    if (password !== passwordConfirm)
      return dispatchMessage({
        message: "Passwords do not match",
        severity: "error",
        autoClose: 3000
      });

    /**
     * Handles checking if the password is between 8 and 20 chars
     */
    if (password.length < 8 || password.length > 20)
      return dispatchMessage({
        message: "Password must be between 8 and 20 characters",
        severity: "error",
        autoClose: 3000
      });

    /**
     * Handles checking if the email is valid
     */
    if (!isEmail(email))
      return dispatchMessage({
        message: "Email must be valid",
        severity: "error",
        autoClose: 3000
      });

    try {
      const res = await apiClient.post("/api/auth/register", inputs);
      setToken(res.data.token);
    } catch (error) {
      const errors = error.response.data.errors;

      dispatchMessage({
        message: errors.map((err: { msg: string }) => err.msg),
        severity: "error",
        autoClose: 3000
      });
    }
  };

  /**
   * Handles submitting the form
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(formData);
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /**
   * Handles checking if the user is logged in
   */
  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="xs" className={classes.container}>
      <Grid container className={classes.container}>
        <Grid item lg={12} className={classes.title}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Sign Up
          </Typography>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete="First Name"
                label="First Name"
                name="firstName"
                value={firstName}
                onChange={(e) => onChange(e)}
                variant="outlined"
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete="Last Name"
                label="Last Name"
                name="lastName"
                value={lastName}
                onChange={(e) => onChange(e)}
                variant="outlined"
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={email}
                onChange={(e) => onChange(e)}
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={password}
                onChange={(e) => onChange(e)}
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="secondary"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                value={passwordConfirm}
                onChange={(e) => onChange(e)}
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="confirm-password"
                color="secondary"
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            value="Register"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" className={classes.linkLogin}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Register;
