import { useEffect } from "react";
/**
 * Imports the component styles
 */
import { useStyles } from "./Profile.styles";

import { useApiClient } from "../../hooks";

/**
 * Displays the component
 */
const Profile: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Gets the auth
   */

  const fetchUser = async () => {
    await apiClient.get("/api/auth");
  };
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return <div className={classes.root}>Profile</div>;
};

export default Profile;
