import React, { useState } from "react";

/**
 * Imports the context
 */
import { context, defaultValues, User, ProviderValues } from "./Context";

/**
 * Provides a top level wrapper with the context
 *
 * - This is the main provider
 * - It makes the object available to any child component that calls the hook.
 */
export const UserProvider: React.FC = (props) => {
  const { children } = props;

  /**
   * Gets the Provider from the context
   */
  const { Provider } = context;

  /**
   * Handles the user state
   */
  const [user, setUser] = useState<User>(defaultValues.user);

  /**
   * Handles the users state
   */
  const [users, setUsers] = useState<User[]>(defaultValues.users);

  /**
   * Handles the loading state
   */
  const [loading, setLoading] = useState(defaultValues.loading);

  /**
   * Handles updating the user state
   */
  const updateUser = (user: User) => {
    setUser(user);
  };

  /**
   * Handles updating the user state
   */
  const updateUsers = (users: User[]) => {
    setUsers(users);
  };

  /**
   * Handles updating the loading state
   */
  const updateLoading = (loading: boolean) => {
    setLoading(loading);
  };

  /**
   * Defines the provider value
   * These values will be available to any children component that calls the hook
   */
  const providerValue: ProviderValues = {
    user,
    users,
    loading,
    updateLoading,
    updateUser,
    updateUsers
  };

  return <Provider value={providerValue}>{children}</Provider>;
};
