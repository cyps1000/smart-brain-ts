/**
 * Imports Hooks
 */
import { useAuth, useMessage } from "./index";
import { useHistory } from "react-router-dom";

/**
 * Imports the api util
 */
import { getApiClient } from "../utils/api";

/**
 * Defines the Api Client Hook Props
 */
interface ApiClientHookProps {
  withCredentials?: boolean;
}

/**
 * Defines the default props
 */
const defaultProps: ApiClientHookProps = {
  withCredentials: true
};

/**
 * Defines the main hook
 */
const useApiClient = (props: ApiClientHookProps) => {
  const { withCredentials } = props;

  /**
   * Handles updating the auth state
   */
  const { updateAuth } = useAuth();

  /**
   * Gets the message dispatcher
   */
  const { dispatchMessage } = useMessage();

  /**
   * Init the history hook
   */
  const history = useHistory();

  /**
   * Handles logging out the user
   */
  const logout = () => {
    updateAuth({ isLoggedIn: false });
    localStorage.removeItem("token");
    history.push("/login");
  };

  const { apiClient } = getApiClient({
    withCredentials,
    dispatchMessage,
    logout
  });

  return { apiClient };
};

useApiClient.defaultProps = defaultProps;
export { useApiClient };
