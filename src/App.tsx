import { Fragment } from "react";

/**
 * Normalizes all css for maximum browser compatibility
 */
import CssBaseLine from "@material-ui/core/CssBaseline";

/**
 * Component Imports
 */
import Providers from "./components/Providers";
import Routes from "./components/Routes";
import Body from "./components/Body";

/**
 * Imports component specific css
 */
import "./App.css";

/**
 * Displays the component
 */
const App: React.FC = () => {
  return (
    <Fragment>
      <CssBaseLine />
      <Providers>
        <Body>
          <Routes />
        </Body>
      </Providers>
    </Fragment>
  );
};

export default App;
