import "./App.css";
import React, { useState, useEffect } from 'react';
import Layout from "./components/Layout/Layout";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import { ReviewProvider } from './context/ReviewContext';
import {isLoggedIn, isAdmin } from './utils/auth.js';
function App() {
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      const loggedIn = await isLoggedIn(); // Kiểm tra xem người dùng đã đăng nhập chưa
      if (loggedIn) {
        const adminRole = await isAdmin(); // Kiểm tra xem người dùng có vai trò admin hay không
        setIsAdminUser(adminRole);
      }
    };
    checkUserRole();
  }, []);
  // const [isAdminDomain, setIsAdminDomain] = useState(false);

  // useEffect(() => {
  //   const currentDomain = window.location.pathname;
  //   setIsAdminDomain(currentDomain.includes('admin')); 
  // }, []);

  return (
    <ReviewProvider>
       <Layout />
       {isAdminUser ? <LayoutAdmin /> : <Layout />}
    </ReviewProvider>
  );
}

export default App;
