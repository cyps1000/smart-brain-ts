import { Link, Redirect } from "react-router-dom";

/**
 * Imports Material UI Components
 */
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

/**
 * Components Imports
 */
import InputLabel from "../InputLabel";
import InputPassword from "../InputPassword";
import InputText from "../InputText";

/**
 * Imports Hooks
 */
import { useForm, FormConfig, useAuth, useApiClient } from "../../hooks";

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
   * Handles the Register form
   */
  const handleRegister = async (inputs: FormInputs) => {
    if (password !== passwordConfirm)
      return console.log("Passwords dont match");

    const res = await apiClient.post("/api/auth/register", inputs);

    setToken(res.data.token);
  };

  /**
   * Defines the useForm config
   */
  const formConfig: FormConfig<FormInputs> = {
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: ""
    },
    submitFn: handleRegister,
    autoFocus: true
  };

  /**
   * Initializes the useForm hook
   */
  const { inputs, inputsReady, getAutoFocus, submit, handleInputChange } =
    useForm(formConfig);

  /**
   * Gets the autoFocus object
   */
  const autoFocus = inputsReady && getAutoFocus();

  /**
   * Gets the input state
   */
  const { firstName, lastName, email, password, passwordConfirm } = inputs;

  /**
   * Handles checking if the user is logged in
   */
  if (auth.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container className={classes.container}>
        <Grid item lg={12} className={classes.title}>
          <Typography variant="h4" color="secondary" gutterBottom>
            Sign Up
          </Typography>
        </Grid>
        <form className={classes.form} noValidate onSubmit={submit}>
          <Grid item lg={12}>
            <InputLabel text="First Name" htmlFor="firstName" />
            <InputText
              required
              value={firstName}
              name="firstName"
              autoFocus={autoFocus}
              onChange={handleInputChange}
              debounce={inputsReady}
            />
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default Register;
