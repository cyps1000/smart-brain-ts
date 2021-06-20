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
import useLocalStorage from "./index";

/**
 * Defines the auth interface
 */
interface Auth {
  isLoggedIn?: boolean;
}

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
interface ProviderValue {
  token: string;
  user: User;
  users: User[];
  auth: Auth;
  updateUser: (user: User) => void;
  updateUsers: (users: User[]) => void;
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
  users: [],
  auth: {
    isLoggedIn: false
  },
  updateUser: (user: User) => {},
  updateUsers: (users: User[]) => {},
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
   * Handles the token
   */
  const [token, setToken] = useLocalStorage<string>("token");

  /**
   * Handles the auth state
   */
  const [auth, setAuth] = useState<Auth>(defaultValue.auth);

  /**
   * Handles the user state
   */
  const [user, setUser] = useState<User>(defaultValue.user);

  /**
   * Handles the users state
   */
  const [users, setUsers] = useState<User[]>(defaultValue.users);

  /**
   * Handles updating the auth state
   */
  const updateAuth = (auth: Auth) => {
    setAuth(auth);
  };

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
   * Handles logging out the user
   */
  const logout = () => {
    updateAuth({ isLoggedIn: false });
    localStorage.removeItem("token");
  };

  /**
   * Handles updating the auth state, based on the token
   */
  useEffect(() => {
    updateAuth({
      isLoggedIn: !!token
    });
  }, [token]);

  useEffect(() => {
    updateUser(user);
  }, []);

  return (
    <authContext.Provider
      value={{
        token,
        auth,
        user,
        users,
        updateUsers,
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
