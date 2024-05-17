import "./App.css";
import React, { useState, useEffect } from 'react';
import Layout from "./components/Layout/Layout";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import { ReviewProvider } from './context/ReviewContext';

function App() {
  const [isAdminDomain, setIsAdminDomain] = useState(false);

  useEffect(() => {
    const currentDomain = window.location.pathname;
    setIsAdminDomain(currentDomain.includes('admin')); 
  }, []);

  return (
    <ReviewProvider>
      {isAdminDomain ? <LayoutAdmin /> : <Layout />}
    </ReviewProvider>
  );
}

export default App;
