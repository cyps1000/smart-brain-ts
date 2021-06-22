/**
 * Imports Material UI Components
 */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

/**
 * Imports the component styles
 */
import { useStyles, inputStyles } from "./ImageLinkForm.styles";

/**
 * Defines the props interface
 */
export interface ImageLinkFormProps {
  input: string;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleSubmit: () => void;
}

/**
 * Displays the component
 */
const ImageLinkForm: React.FC<ImageLinkFormProps> = (props) => {
  const { input, onChange, handleSubmit } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Gets the input component styles
   */
  const inputClasses = inputStyles();

  return (
    <Box className={classes.root}>
      <TextField
        variant="outlined"
        value={input}
        onChange={(e) => onChange(e)}
        type="text"
        fullWidth
        id="image"
        label="Insert Image URL"
        name="image"
        InputProps={{ classes: inputClasses }}
      />
      <Button
        variant="outlined"
        type="submit"
        onClick={handleSubmit}
        className={classes.button}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ImageLinkForm;
