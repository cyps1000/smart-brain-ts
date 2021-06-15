/**
 * External Imports
 */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 *  Imports components
 */
import ProtectedRoutes from "../ProtectedRoutes";
import Navbar from "../Navbar";
import Body from "../Body";

/**
 * Displays the component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Body>
        <Switch>
          <Route path="/login">
            <h2>Login Page</h2>
          </Route>
          <Route path="/register">
            <h2>Register Page</h2>
          </Route>
          <ProtectedRoutes />
        </Switch>
      </Body>
    </Router>
  );
};

export default Routes;
