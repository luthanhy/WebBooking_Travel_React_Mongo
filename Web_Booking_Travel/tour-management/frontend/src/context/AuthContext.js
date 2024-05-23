import { createContext, useEffect, useReducer } from "react";


const userData = localStorage.getItem("user");
const parsedUserData = userData ? JSON.parse(userData) : null;


const initial_state = {
  user: userData !== "undefined" && userData !== null ? JSON.parse(userData) : undefined,
  isLoggedIn:true,
  loading: false,
  error: null
};
if(parsedUserData!=null){
  const accountType = parsedUserData.accountType
  console.log("type account",accountType); // Output: "admin"
  if(accountType === "admin"){
      const currentDomain = window.location.pathname;
      if(currentDomain.includes("admin")){
      initial_state.isAdmin = true;
      }else{
        initial_state.isAdmin = false;
      }
  }
}
export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoggedIn: true,
        isAdmin : false,
        loading: false,
        error: null
      };
    case "LOGIN_SUCCESS_ADMIN":
      return{
        user: action.payload,
        isLoggedIn: true,
        isAdmin : true,
        loading: false,
        error: null
      }
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        isAdmin: false,
        isLoggedIn: false,
        error: action.payload
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        isAdmin: false,
        loading: false,
        error: null
      };
    case "LOGOUT":
      return {
        user: null,
        isLoggedIn: false,
        isAdmin: false,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        admin: state.admin,
        isAdmin: state.isAdmin,
        isLoggedIn : state.isLoggedIn,
        loading: state.loading,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
