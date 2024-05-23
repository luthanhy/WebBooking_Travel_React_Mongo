import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Custom hook to get the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Custom hook to check if the user is logged in
export const useIsLoggedIn = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn;
};

// Custom hook to check if the user is an admin
export const useIsAdmin = () => {
  const { isAdmin } = useAuth();
  return isAdmin;
};
