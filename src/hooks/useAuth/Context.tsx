import { createContext } from "react";

/**
 * Defines the Auth interface
 */
export interface Auth {
  isLoggedIn?: boolean;
}

/**
 * Defines the Provider Values Interface
 */
export interface ProviderValues {
  token: string;
  auth: Auth;
  updateAuth: (auth: Auth) => void;
  logout: () => void;
  setToken: (value: string | ((val: string) => string)) => void;
}

/**
 * Defines the default values
 */
export const defaultValues: ProviderValues = {
  token: "",
  auth: {
    isLoggedIn: false
  },
  updateAuth: (auth: Auth) => {},
  logout: () => {},
  setToken: (value: string | ((val: string) => string)) => {}
};

/**
 * Defines a context where the state is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the hook fetch the current state, the hook simply calls useContext to get the data from the top level provider
 */
export const context = createContext<ProviderValues>(defaultValues);
