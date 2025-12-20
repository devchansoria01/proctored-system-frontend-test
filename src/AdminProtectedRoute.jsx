import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

  if (!isAdminLoggedIn || isAdminLoggedIn !== 'true') {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
