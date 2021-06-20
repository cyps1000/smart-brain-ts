/**
 * Imports the component styles
 */
import { useStyles } from "./EditProfile.styles";

/**
 * Defines the props interface
 */
export interface EditProfileProps {
  text?: string;
}

/**
 * Displays the component
 */
const EditProfile: React.FC<EditProfileProps> = (props) => {
  const { text } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return <div className={classes.root}>EditProfile</div>;
};

export default EditProfile;
