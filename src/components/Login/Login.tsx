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
import { useStyles, inputStyles } from "./Login.styles";

/**
 * Defines the form inputs interface
 */
interface FormInputs {
  email: string;
  password: string;
}

/**
 * Displays the component
 */
const Login: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Gets the input component styles
   */
  const inputClasses = inputStyles();

  /**
   * Inits the auth hook
   */
  const { auth, setToken } = useAuth();

  /**
   * Inits the API
   */
  const { apiClient } = useApiClient({ withCredentials: false });

  /**
   * Init the useMessage hook
   */
  const { dispatchMessage } = useMessage();

  /**
   * Init the text area state
   */
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  /**
   * Handles loggin in an user
   */
  const login = async (inputs: FormInputs) => {
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
      const res = await apiClient.post("/api/auth/login", inputs);
      setToken(res.data.token);

      dispatchMessage({
        message: "Successfully logged in",
        severity: "success",
        autoClose: 3000
      });
    } catch (error) {
      if (error.response) {
        const { errors } = error.response.data;

        dispatchMessage({
          message: errors.map((err: { msg: string }) => err.msg),
          severity: "error",
          autoClose: 3000
        });
      }
    }
  };

  /**
   * Handles submitting the form
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData);
  };

  /**
   * Handles the event source when the value is changed
   */
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
            Sign In
          </Typography>
        </Grid>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                color="secondary"
                required
                InputProps={{ classes: inputClasses }}
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
                color="secondary"
                required
                InputProps={{ classes: inputClasses }}
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
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/register" className={classes.linkLogin}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Login;
