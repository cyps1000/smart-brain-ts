import {
  useContext,
  createContext,
  ReactNode,
  useState,
  useEffect
} from "react";

/**
 * Hooks
 */
import useLocalStorage, { useApiClient } from "./index";

/**
 * Defines the auth interface
 */
interface Auth {
  isLoggedIn?: boolean;
}

/**
 * Defines the user interface
 */
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  avatar: string;
  score: number;
}

/**
 * Defines the default values interface
 */
interface ProviderValue {
  token: string;
  user: User;
  auth: Auth;
  updateUser: (user: User) => void;
  updateAuth: (auth: Auth) => void;
  logout: () => void;
  setToken: (value: string | ((val: string) => string)) => void;
}

/**
 * Init the default values
 */
const defaultValue: ProviderValue = {
  token: "",
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    createdAt: "",
    avatar: "",
    score: 0
  },
  auth: {
    isLoggedIn: false
  },
  updateUser: (user: User) => {},
  updateAuth: (auth: Auth) => {},
  logout: () => {},
  setToken: (value: string | ((val: string) => string)) => {}
};

/**
 * Defines a context where the completion state is stored and shared
 *
 * - This serves as a cache.
 * - Rather than each instance of the hook fetch the current state, the hook simply calls useContext to get the data from the top level provider
 */
const authContext = createContext<ProviderValue>(defaultValue);

type AuthProviderType = (props: { children?: ReactNode }) => any;

/**
 * Provides a top level wrapper with the context
 *
 * - This is the main provider
 * - It makes the object available to any child component that calls the hook.
 */
const AuthProvider: AuthProviderType = (props) => {
  const { children } = props;

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  const [token, setToken] = useLocalStorage<string>("token");
  const [auth, setAuth] = useState<Auth>(defaultValue.auth);

  const [user, setUser] = useState<User>(defaultValue.user);

  const fetchUser = async () => {
    const { data } = await apiClient.get("/api/auth");

    setUser(data);
  };

  const updateAuth = (auth: Auth) => {
    setAuth(auth);
  };

  const logout = () => {
    setAuth((prevState) => ({ ...prevState, isLoggedIn: false }));
    localStorage.removeItem("token");
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    updateAuth({ isLoggedIn: !!token });
  }, [token]);

  useEffect(() => {
    if (auth.isLoggedIn) {
      fetchUser();
    }
    // eslint-disable-next-line
  }, [auth.isLoggedIn]);

  return (
    <authContext.Provider
      value={{
        token,
        auth,
        user,
        updateUser,
        logout,
        setToken,
        updateAuth
      }}
    >
      {children}
    </authContext.Provider>
  );
};

/**
 * Defines the main hook
 *
 * - Returns the  context / object
 * - To be used inside components
 */
const useAuth = () => useContext(authContext);

export { useAuth, AuthProvider };
