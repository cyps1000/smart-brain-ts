import { useEffect } from "react";

/**
 * External Imports
 */
import { Route, Switch, useHistory } from "react-router-dom";

/**
 * Imports components
 */
import Profile from "../Profile";

/**
 * Imports hooks
 */
import { useAuth, useApiClient } from "../../hooks";

/**
 * Displays the component
 */
const ProtectedRoutes: React.FC = () => {
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
    const { data } = await apiClient.get("/api/auth");

    if (!data) {
      updateAuth({ isLoggedIn: false });
      localStorage.removeItem("token");
      history.push("/login");
      return;
    }

    updateAuth({ isLoggedIn: true });
    updateUser(data);
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

  /**
   * Handles redirecting if the user is not logged in
   */
  if (!auth.isLoggedIn) {
    history.push("/login");
  }

  return (
    <Route path="/">
      <Switch>
        <Route exact path="/">
          <h1> App overview </h1>
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
      </Switch>
    </Route>
  );
};

export default ProtectedRoutes;
