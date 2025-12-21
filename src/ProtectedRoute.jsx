import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Listen directly to Firebase to see if a user is logged in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>; // Simple spinner
  }

  if (!user) {
    // ✅ If NOT logged in, redirect to login (or signup)
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in, they can see the Records/Schedule!
  return children;
};

export default ProtectedRoute;