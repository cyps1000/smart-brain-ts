import { ReactNode } from "react";
import axios from "axios";

/**
 * Defines the hook props interface
 */
interface Config {
  withCredentials?: boolean;
  logout?: () => void;
  dispatchMessage: (props: {
    message: ReactNode;
    severity?: "success" | "warning" | "error" | undefined;
    permanent?: boolean | undefined;
    autoClose?: number | undefined;
  }) => void;
}

interface ApiError {
  errors: {
    message: string;
    errorType?: string;
  }[];
}

/**
 * Defines the api client function
 */
export const getApiClient = (config: Config) => {
  const { withCredentials, dispatchMessage } = config;

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

    return request;
  });

  apiClient.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        const data: ApiError = error.response.data;
        if (data.errors.length > 0) {
          dispatchMessage({
            message: (
              <ul>
                {data.errors.map((error, index) => (
                  <li key={`${error.errorType}_${index}`}> {error.message} </li>
                ))}
              </ul>
            ),
            severity: "error",
            autoClose: 15000
          });
        }
      }

      return Promise.reject(error);
    }
  );

  return { apiClient };
};
