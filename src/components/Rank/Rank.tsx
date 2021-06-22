/**
 * Imports Material UI components
 */
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

/**
 * Imports the component styles
 */
import { useStyles } from "./Rank.styles";

/**
 * Imports the User interface
 */
import { User } from "../../hooks/useUser/Context";

/**
 * Defines the props interface
 */
export interface RankProps {
  user: User;
}

/**
 * Displays the component
 */
const Rank: React.FC<RankProps> = (props) => {
  const { user } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Box className={classes.Rank}>
      <Typography variant="h5">Hello, {user.firstName}</Typography>
      <Typography variant="h6">Your current score is: {user.score}</Typography>
    </Box>
  );
};

export default Rank;
