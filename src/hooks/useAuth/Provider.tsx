import React, { useState, useEffect } from "react";

/**
 * Imports the context
 */
import { context, defaultValues, Auth, ProviderValues } from "./Context";

/**
 * Imports hooks
 */
import { useLocalStorage } from "../useLocalStorage";

/**
 * Provides a top level wrapper with the context
 *
 * - This is the main provider
 * - It makes the object available to any child component that calls the hook.
 */
export const AuthProvider: React.FC = (props) => {
  const { children } = props;

  /**
   * Gets the Provider from the context
   */
  const { Provider } = context;

  /**
   * Initializes the auth state
   */
  const [auth, setAuth] = useState<Auth>(defaultValues.auth);

  /**
   * Initializes the token
   */
  const [token, setToken] = useLocalStorage<string>("token");

  /**
   * Handles updating the auth state
   */
  const updateAuth = (auth: Auth) => {
    setAuth(auth);
  };

  /**
   * Handles logging out the user
   */
  const logout = () => {
    updateAuth({ isLoggedIn: false });
    localStorage.removeItem("token");
  };

  /**
   * Defines the provider value
   * These values will be available to any children component that calls the hook
   */
  const providerValue: ProviderValues = {
    token,
    auth,
    setToken,
    logout,
    updateAuth
  };

  /**
   * Handles updating the auth state based on the token
   */
  useEffect(() => {
    updateAuth({ isLoggedIn: !!token });
  }, [token]);

  return <Provider value={providerValue}>{children}</Provider>;
};
