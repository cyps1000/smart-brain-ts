/**
 * External Imports
 */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 *  Imports components
 */
import ProtectedRoutes from "../ProtectedRoutes";

/**
 * Displays the component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <h1>Login Page</h1>
        </Route>
        <Route path="/register">
          <h1>Register Page</h1>
        </Route>
        <ProtectedRoutes />
      </Switch>
    </Router>
  );
};

export default Routes;
