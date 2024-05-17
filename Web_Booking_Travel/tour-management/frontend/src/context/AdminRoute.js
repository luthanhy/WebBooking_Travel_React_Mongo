import React from 'react';
import {Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Link to="/login" />;
  }
  return user.isAdmin ? children : <Link to="/" />;
};

export default AdminRoute;
