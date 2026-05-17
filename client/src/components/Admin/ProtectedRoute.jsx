import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) {
    return <Navigate to="/admin/login" replace />;
  }

  const parsedUser = JSON.parse(userInfo);
  if (parsedUser.role !== 'admin' && parsedUser.role !== 'superadmin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
