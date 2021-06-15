import axios from "axios";

/**
 * Defines the hook props interface
 */
interface Config {
  withCredentials?: boolean;
  logout?: () => void;
}

/**
 * Defines the api client function
 */
export const getApiClient = (config: Config) => {
  const { withCredentials } = config;

  /**
   * Handles getting the base api url
   */
  const getApiUrl = () => {
    if (process.env.NODE_ENV === "development") {
      return process.env.REACT_APP_LOCAL_API;
    }
    return process.env.REACT_APP_PROD_API;
  };

  /**
   * Creates the api client by configuring axios
   */
  const apiClient = axios.create({
    baseURL: getApiUrl()
  });

  apiClient.interceptors.request.use((request) => {
    if (withCredentials) {
      const token = JSON.parse(localStorage.getItem("token") || "");
      request.headers["x-auth-token"] = token;
    }

    request.headers["Content-Type"] = "application/json";

    return request;
  });

  return { apiClient };
};
