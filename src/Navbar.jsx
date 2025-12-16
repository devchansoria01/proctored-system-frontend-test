import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User");
  const [isAdmin, setIsAdmin] = useState(false); 
  
  // 🌙 THEME STATE
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 1. Check Auth & Admin Role
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
            const userDoc = await getDoc(doc(db, "users", currentUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUserName(userData.name || currentUser.displayName);
                setIsAdmin(userData.role === 'admin');
            }
        } catch (e) {
            console.log("Error fetching user data:", e);
        }
      } else {
        setUser(null);
        setUserName("User");
        setIsAdmin(false);
      }
    });

    // 2. Check Saved Theme Preference (Local Storage)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // 🌗 TOGGLE FUNCTION
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  return (
    // Added 'navbar-light' or 'navbar-dark' logic if using Bootstrap classes
    <nav className={`navbar fixed-top ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'} shadow-sm`}>
      <div className="container" style={{ display: 'flex', width: '90%', alignItems: 'center' }}>
        
        <a href="/#home" className="navbar-brand fw-bold">
          <i className="fa-solid fa-shield-halved me-2"></i> 
          <span style={{color: isDarkMode ? '#fff' : '#0ea5a4'}}>APS-System</span>
        </a>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          
          <a className="nav-link" href="/#home">Home</a>
          <a className="nav-link" href="/#contributors">About</a>

          {!isAdmin && (
            <>
                <Link to="/records" className="nav-link">Records</Link>
                <Link to="/schedule" className="nav-link">Schedule</Link>
            </>
          )}

          {!isAdmin ? (
            <Link 
              to="/admin-login" 
              target="_blank"
              className="nav-link fw-bold text-danger ms-3"
              style={{ fontSize: '0.9rem' }}
            >
              Admin Portal 🔒
            </Link>
          ) : (
            <Link 
              to="/admin-dashboard" 
              className="nav-link fw-bold text-primary ms-3"
              style={{ fontSize: '0.9rem', border: '1px solid #0d6efd', borderRadius: '20px', padding: '5px 15px' }}
            >
              Back to Admin Portal 🔙
            </Link>
          )}

          {user && !isAdmin && (
            <div className="d-flex align-items-center ms-3">
                <span className={`fw-bold me-3 ${isDarkMode ? 'text-light' : 'text-dark'}`}>
                    👋 {userName}
                </span>
                <button 
                    onClick={handleLogout}
                    className="btn btn-sm btn-outline-danger" 
                    style={{ borderRadius: '20px' }}
                >
                    Logout
                </button>
            </div>
          )}
          
          {!user && (
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
          
          {/* 🌙 THEME BUTTON (NOW WORKING) */}
          <button 
            onClick={toggleTheme}
            className="btn ms-2"
            style={{ fontSize: '1.2rem', border: 'none', background: 'transparent' }}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}