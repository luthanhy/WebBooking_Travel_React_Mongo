import { createContext, useEffect, useReducer } from "react";

const userData = localStorage.getItem("user");
let parsedUserData;

try {
  parsedUserData = userData && userData !== "undefined" ? JSON.parse(userData) : null;
} catch (error) {
  console.error("Error parsing user data from localStorage", error);
  parsedUserData = null;
}

const initial_state = {
  user: parsedUserData,
  isLoggedIn: parsedUserData !== null,
  loading: false,
  error: null,
  isAdmin: false,
};

if (parsedUserData) {
  const accountType = parsedUserData.accountType;
  console.log("type account", accountType); // Output: "admin"
  if (accountType === "admin") {
    const currentDomain = window.location.pathname;
    initial_state.isAdmin = currentDomain.includes("admin");
  }
}

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        isAdmin: false,
        isLoggedIn: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoggedIn: true,
        isAdmin: false,
        loading: false,
        error: null,
      };
    case "LOGIN_SUCCESS_ADMIN":
      return {
        user: action.payload,
        isLoggedIn: true,
        isAdmin: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        isAdmin: false,
        isLoggedIn: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        isAdmin: false,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        isLoggedIn: false,
        isAdmin: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        admin: state.admin,
        isAdmin: state.isAdmin,
        isLoggedIn: state.isLoggedIn,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
