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
import EditProfile from "../EditProfile";
import DeleteAccount from "../DeleteAccount";

/**
 * Imports the component styles
 */
import { useStyles } from "./Profile.styles";

/**
 * Imports Hooks
 */
import { useApiClient, useUser } from "../../hooks";

/**
 * Displays the component
 */
const Profile: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Handles the tabs' state
   */
  const [value, setValue] = useState(1);

  /**
   * Init the user state
   */
  const { user, loading, updateUser, updateLoading } = useUser();

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Handles fetching the user's profile
   */
  const getProfile = async () => {
    const { data } = await apiClient.get("/api/profile/me");

    updateLoading(true);

    if (data) {
      updateLoading(false);
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
            <EditProfile user={user} />
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
