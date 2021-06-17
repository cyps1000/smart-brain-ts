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
  const { withCredentials, logout } = config;

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

  /**
   * Handles intercepting the requests made to the backend
   */
  apiClient.interceptors.request.use(async (request) => {
    if (withCredentials) {
      try {
        const token = JSON.parse(localStorage.getItem("token") || "");
        request.headers["x-auth-token"] = token;
      } catch (error) {}
    }

    request.headers["Content-Type"] = "application/json";

    return request;
  });

  /**
   * Handles intercepting the responses from the backend
   */
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        const data = error.response.data;
        if (data.msg === "Token is not valid") {
          localStorage.removeItem("token");
          logout && logout();
        }
        return Promise.reject(error);
      }
    }
  );

  return { apiClient };
};
