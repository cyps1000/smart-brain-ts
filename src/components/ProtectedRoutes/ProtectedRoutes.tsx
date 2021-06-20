import { useEffect, useState } from "react";

/**
 * External Imports
 */
import { Route, Switch, useHistory } from "react-router-dom";

/**
 * Imports components
 */
import Main from "../Main";
import Profile from "../Profile";

/**
 * Imports hooks
 */
import { useAuth, useApiClient } from "../../hooks";

/**
 * Displays the component
 */
const ProtectedRoutes: React.FC = () => {
  const [verifiedUser, setVerifiedUser] = useState(false);

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Init the history hook
   */
  const history = useHistory();

  /**
   * Gets the auth state
   */
  const { token, updateAuth, updateUser, auth } = useAuth();

  /**
   * Handles fetching the user data if exists
   */
  const fetchUser = async () => {
    try {
      const { data } = await apiClient.get("/api/auth");
      setVerifiedUser(true);

      if (!data) {
        updateAuth({ isLoggedIn: false });
        localStorage.removeItem("token");
        history.push("/login");

        return;
      }

      updateAuth({ isLoggedIn: true });
      updateUser(data);
    } catch (error) {}
  };

  /**
   * Handles checking if the user is logged in
   */
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, [token]);

  /**
   * Handles updating the unauthorized state
   */
  useEffect(() => {
    if (!token) updateAuth({ isLoggedIn: false });
    // eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    if (verifiedUser && !auth.isLoggedIn) {
      history.push("/login");
    }
  }, [verifiedUser]);

  return (
    <Route path="/">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Route>
  );
};

export default ProtectedRoutes;
