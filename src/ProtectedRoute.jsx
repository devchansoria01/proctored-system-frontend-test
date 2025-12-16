import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Connect to the real brain
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ask Firebase: "Is anyone home?"
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Okay, I have my answer
    });
    return () => unsubscribe();
  }, []);

  // Show a blank screen or spinner while checking
  if (loading) return null; 

  // If NO user found -> Kick to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user found -> Let them in!
  return children;
}