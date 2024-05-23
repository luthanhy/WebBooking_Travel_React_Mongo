import "./App.css";
import React, { useState, useEffect } from 'react';
import Layout from "./components/Layout/Layout";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import { ReviewProvider } from './context/ReviewContext';
import { useIsLoggedIn, useIsAdmin } from './utils/auth';

function App() {
  const isLoggedIn = useIsLoggedIn();
  const isAdmin = useIsAdmin();
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkUserRole = () => {
      if (isLoggedIn) {
        setIsAdminUser(isAdmin);
      }
    };
    checkUserRole();
  }, [isLoggedIn, isAdmin]);

  return (
    <ReviewProvider>
      {isAdminUser ? <LayoutAdmin /> : <Layout />}
    </ReviewProvider>
  );
}

export default App;
