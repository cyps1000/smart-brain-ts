import { useEffect, useState } from "react";

/**
 * External Imports
 */
import { Route, Switch, Redirect } from "react-router-dom";

/**
 * Imports components
 */
import Main from "../Main";
import Profile from "../Profile";

/**
 * Imports hooks
 */
import { useAuth, useUser, useApiClient } from "../../hooks";

/**
 * Displays the component
 */
const ProtectedRoutes: React.FC = () => {
  /**
   * Inits the unauthorized state
   */
  const [unauthorized, setUnauthorized] = useState(false);

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Gets the auth state
   */
  const { token, updateAuth } = useAuth();

  /**
   * Gets the user state
   */
  const { updateUser } = useUser();

  /**
   * Handles fetching the user data if exists
   */
  const checkIfLoggedIn = async () => {
    const response = await apiClient.get("/api/auth");

    if (response) {
      const { data } = response;

      if (!data) {
        setUnauthorized(true);
        updateAuth({ isLoggedIn: false });
        localStorage.removeItem("token");
        return;
      }

      updateUser(data);
    }

    updateAuth({ isLoggedIn: true });
  };

  /**
   * Handles checking if the user is logged in
   */
  useEffect(() => {
    checkIfLoggedIn();
    // eslint-disable-next-line
  }, [token]);

  /**
   * Handles updating the unauthorized state
   */
  useEffect(() => {
    if (!token) setUnauthorized(true);
  }, [token]);

  /**
   * Handles redirecting the user if unauthorized
   */
  if (unauthorized) return <Redirect to="/login" />;

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
