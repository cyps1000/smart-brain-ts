import { useEffect, useState, Fragment } from "react";

/**
 * Imports Material UI components
 */
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

/**
 * Imports components
 */
import TabPanel from "../TabPanel";
import LoadingBar from "../LoadingBar";
import ViewProfile from "../ViewProfile";
import DeleteAccount from "../DeleteAccount";

/**
 * Imports the component styles
 */
import { useStyles } from "./Profile.styles";

/**
 * Imports Hooks
 */
import { useApiClient, useMessage, useAuth } from "../../hooks";

/**
 * Displays the component
 */
const Profile: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Init the laoding state
   */
  const [loading, setLoading] = useState(true);

  /**
   * Handles the tabs' state
   */
  const [value, setValue] = useState(1);

  /**
   * Init the auth state
   */
  const { user, updateUser } = useAuth();

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Init the useMessage hook
   */
  const { dispatchMessage } = useMessage();

  /**
   * Handles fetching the user's profile
   */
  const getProfile = async () => {
    const { data } = await apiClient.get("/api/profile/me");

    setLoading(true);

    if (data) {
      setLoading(false);
      updateUser(data);
    }
  };

  /**
   * Handles the Tab's props
   */
  const tabProps = (index: number) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`
    };
  };

  /**
   * Handles switching between tabs
   */
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  /**
   * Handles getting the profile
   */
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="md">
      <Paper square className={classes.paper}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          onChange={handleChange}
          aria-label="profile actions"
          className={classes.tabs}
        >
          <Tab label="Edit Profile" {...tabProps(0)} />
          <Tab label="View Profile" {...tabProps(1)} />
          <Tab label="Delete Account" {...tabProps(2)} />
        </Tabs>
      </Paper>
      {loading ? (
        <LoadingBar />
      ) : (
        <Fragment>
          <TabPanel value={value} index={0}>
            Edit Profile
          </TabPanel>
          <TabPanel value={value} index={1}>
            {Object.keys(user).length > 0 && <ViewProfile user={user} />}
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DeleteAccount />
          </TabPanel>
        </Fragment>
      )}
    </Container>
  );
};

export default Profile;
