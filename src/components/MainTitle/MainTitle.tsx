/**
 * Imports Material UI Components
 */
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

/**
 * Imports Font Awesome Icons
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAtom } from "@fortawesome/free-solid-svg-icons";

/**
 * Imports the component styles
 */
import { useStyles } from "./MainTitle.styles";

/**
 * Defines the props interface
 */
export interface MainTitleProps {
  title: string;
}

/**
 * Displays the component
 */
const MainTitle: React.FC<MainTitleProps> = (props) => {
  const { title } = props;
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Paper elevation={5} className={classes.paper}>
      <Typography className={classes.title}>
        <FontAwesomeIcon icon={faAtom} />
        {title}
      </Typography>
    </Paper>
  );
};

export default MainTitle;
