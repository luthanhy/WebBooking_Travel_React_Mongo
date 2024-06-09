import "./App.css";
import React, { useState, useEffect } from 'react';
import Layout from "./components/Layout/Layout";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import { ReviewProvider } from './context/ReviewContext';
import { useIsLoggedIn, useIsAdmin} from './utils/auth';

function App() {
  const isLoggedIn = useIsLoggedIn();
  const isAdmin = useIsAdmin();
  console.log(isAdmin);
  const isLogin = useIsLoggedIn();
  console.log(isLogin);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      if (!isLoggedIn) {
        console.log("luthanhy");
        setIsAdminUser(isAdmin);
      }
    };
    checkUserRole();
  }, [isLoggedIn, isAdmin]);
  console.log(isAdminUser);
  return (
    <ReviewProvider>
      { 
      isAdmin ? <LayoutAdmin /> : <Layout />}
    </ReviewProvider>
  );
}
export default App;
