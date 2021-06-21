import { createContext } from "react";

/**
 * Defines the user interface
 */
export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  avatar?: string;
  score?: number;
}

/**
 * Defines the default values interface
 */
export interface ProviderValues {
  user: User;
  users: User[];
  loading: boolean;
  updateLoading: (loading: boolean) => void;
  updateUser: (user: User) => void;
  updateUsers: (users: User[]) => void;
}

/**
 * Init the default values
 */
export const defaultValues: ProviderValues = {
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    createdAt: "",
    avatar: "",
    score: 0
  },
  users: [],
  loading: true,
  updateLoading: (loading: boolean) => {},
  updateUser: (user: User) => {},
  updateUsers: (users: User[]) => {}
};

/**
 * Defines a context where the state is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the hook fetch the current state, the hook simply calls useContext to get the data from the top level provider
 */
export const context = createContext<ProviderValues>(defaultValues);
