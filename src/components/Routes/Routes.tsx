/**
 * External Imports
 */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 *  Imports components
 */
import ProtectedRoutes from "../ProtectedRoutes";
import MessagePopup from "../MessagePopup";
import Navbar from "../Navbar";
import Register from "../Register";

/**
 * Displays the component
 */
const Routes: React.FC = () => {
  return (
    <Router>
      <MessagePopup />
      <Navbar />
      <Switch>
        <Route path="/login">
          <h2>Login Page</h2>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <ProtectedRoutes />
      </Switch>
    </Router>
  );
};

export default Routes;
