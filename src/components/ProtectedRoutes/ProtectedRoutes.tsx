import { useEffect, useState } from "react";

/**
 * External Imports
 */
import { Route, Switch, Redirect } from "react-router-dom";

/**
 * Imports hooks
 */
import { useAuth } from "../../hooks";

/**
 * Displays the component
 */
const ProtectedRoutes: React.FC = () => {
  /**
   * Initializes the unauthorized state
   */
  const [unauthorized, setUnauthorized] = useState(false);

  /**
   * Gets the auth
   */
  const { token } = useAuth();

  /**
   * Handles updating the unauthorized state
   */
  useEffect(() => {
    if (!token) setUnauthorized(true);
  }, [token]);

  if (unauthorized) return <Redirect to="/login" />;
  return (
    <Route path="/">
      <Switch>
        <Route exact path="/">
          <h1> App overview </h1>
        </Route>
        <Route exact path="/profile">
          <h2>Profile</h2>
        </Route>
      </Switch>
    </Route>
  );
};

export default ProtectedRoutes;
