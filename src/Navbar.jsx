import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase'; // Import db too!
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Tools to read the filing cabinet

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User"); // Store just the name

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        
        // 1. Try the "ID Badge" first
        if (currentUser.displayName) {
          setUserName(currentUser.displayName);
        } 
        // 2. If blank, check the "Filing Cabinet" (Database)
        else {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserName(userDoc.data().name); // Found it!
          }
        }
      } else {
        setUser(null);
        setUserName("User");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container" style={{ display: 'flex', width: '90%', alignItems: 'center' }}>
        
        <a href="/#home" className="navbar-brand">
          <i className="fa-solid fa-shield-halved"></i> APS-Admin Proctored System
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a className="nav-link" href="/#home">Home</a>
          <a className="nav-link" href="/#contributors">About</a>
          <Link to="/records" className="nav-link">Records</Link>
          <Link to="/schedule" className="nav-link">Schedule</Link>
          
          {user ? (
            <div className="d-flex align-items-center ms-3">
                {/* 👇 NOW USES THE SMART NAME VARIABLE */}
                <span className="fw-bold me-3" style={{ color: '#0f172a' }}>
                    👋 Welcome, {userName}
                </span>
                <button 
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-danger" 
                    style={{ borderRadius: '20px' }}
                >
                    Logout
                </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="nav-link ms-3"
              style={{
                border: '1px solid #0ea5a4',
                padding: '5px 15px',
                borderRadius: '20px',
                color: '#0ea5a4',
                textDecoration: 'none'
              }}
            >
              Login
            </Link>
          )}
          
          <button className="theme-btn ms-2">🌙</button>
        </div>
      </div>
    </nav>
  );
}