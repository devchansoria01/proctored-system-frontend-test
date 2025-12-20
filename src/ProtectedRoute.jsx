import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check if the "VIP Pass" exists in browser memory
  const isAuthenticated = localStorage.getItem("userToken");

  if (!isAuthenticated) {
    // If NO pass, kick them to the Signup page immediately
    return <Navigate to="/signup" replace />;
  }

  // If YES pass, let them see the page
  return children;
};

export default ProtectedRoute;