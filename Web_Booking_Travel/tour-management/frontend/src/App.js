import "./App.css";
import React, { useState, useEffect } from 'react';
import Layout from "./components/Layout/Layout";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
function App() {
  const [isAdminDomain, setIsAdminDomain] = useState(false);
  useEffect(() => {
    const currentDomain = window.location.pathname;
    console.log(currentDomain)
    setIsAdminDomain(currentDomain.includes('admin')); 
  }, []);
  return (
    <>
      {isAdminDomain ? <LayoutAdmin /> : <Layout />}
    </>
  );
}
export default App;
