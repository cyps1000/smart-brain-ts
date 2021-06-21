/**
 * Imports Material UI Components
 */
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

/**
 * Imports the component styles
 */
import { useStyles } from "./UserScore.styles";

/**
 * Imports User interface
 */
import { User } from "../../hooks/useUser/Context";

/**
 * Defines the props interface
 */
export interface UserScoreProps {
  user: User;
  index: number;
}

/**
 * Displays the component
 */
const UserScore: React.FC<UserScoreProps> = (props) => {
  const { user, index } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.user}>
        <Box>
          <Typography variant="h6">{index}.</Typography>
        </Box>
        <Box className={classes.userName}>
          <Avatar src={user.avatar} className={classes.avatar} />
          <Typography variant="h6">{user.firstName}</Typography>
        </Box>
      </Box>
      <Box className={classes.score}>
        <Typography variant="h6">{user.score}</Typography>
      </Box>
    </Box>
  );
};

export default UserScore;
