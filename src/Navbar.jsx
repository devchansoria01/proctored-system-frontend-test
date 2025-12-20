import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from './firebase'; 
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; 

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("User");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdminLoggedIn') === 'true'); 

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored === 'light' ? false : true; 
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [isWaving, setIsWaving] = useState(true);
  const [isHovered, setIsHovered] = useState(null);

  const waveImageUrl = "https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif";

  useEffect(() => {
    const img = new Image();
    img.src = waveImageUrl;
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const localAdminCheck = localStorage.getItem('isAdminLoggedIn') === 'true';
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserName(userData.name || currentUser.displayName);
            setIsAdmin(localAdminCheck || userData.role === 'admin');
          }
        } catch (e) { console.error(e); }
      } else { 
        setIsAdmin(localAdminCheck); 
      }
    });
    return () => unsubscribe();
  }, []); 

  useEffect(() => {
    let timer;
    if (isWaving) {
      timer = setTimeout(() => setIsWaving(false), 2500);
    } else {
      timer = setTimeout(() => setIsWaving(true), 5000);
    }
    return () => clearTimeout(timer);
  }, [isWaving]);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('isAdminLoggedIn');
    setIsAdmin(false);
    navigate('/login');
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Sleek hover effects
  const navItemStyle = (itemName) => ({
    position: 'relative',
    padding: '10px 18px',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '600',
    letterSpacing: '0.3px',
    color: isDarkMode ? 
      (isHovered === itemName ? '#fff' : '#cbd5e1') : 
      (isHovered === itemName ? '#0f766e' : '#475569'),
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '12px',
    background: isHovered === itemName ? 
      (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(14, 165, 164, 0.08)') : 
      'transparent',
    border: 'none',
    backdropFilter: isHovered === itemName ? 'blur(10px)' : 'none',
  });

  return (
    <nav className={`navbar glass-nav fixed-top ${isDarkMode ? 'nav-dark' : 'nav-light'}`}>
      <div className="container-fluid" style={{ 
        display: 'flex', 
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0 2rem'
      }}>
        {/* Brand Logo - Enhanced */}
        <Link 
          to="/" 
          className="navbar-brand text-decoration-none d-flex align-items-center gap-2"
          
        >
          <i className="fa-solid fa-shield-halved" style={{ 
            fontSize: '1.8rem',
            color: isDarkMode ? '#60a5fa' : '#0ea5a4',
            
          }}></i> 
          <span style={{
            color: isDarkMode ? '#fff' : '#0f766e',
            fontSize: '1.4rem',
            fontWeight: '800',
            letterSpacing: '-0.5px',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
      
          }}>
            APS-System
          </span>
        </Link>
        
        {/*  */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link 
            className="nav-link"
            to="/"
            style={navItemStyle('home')}
            onMouseEnter={() => setIsHovered('home')}
            onMouseLeave={() => setIsHovered(null)}
          >
            <i className="fa-solid fa-house me-2" style={{ fontSize: '0.9rem' }}></i>
            Home
          </Link>
          
          <Link 
            className="nav-link"
            to="/about"
            style={navItemStyle('about')}
            onMouseEnter={() => setIsHovered('about')}
            onMouseLeave={() => setIsHovered(null)}
          >
            <i className="fa-solid fa-circle-info me-2" style={{ fontSize: '0.9rem' }}></i>
            About
          </Link>

          {!isAdmin && (
            <>
              <Link 
                to="/records" 
                className="nav-link"
                style={navItemStyle('records')}
                onMouseEnter={() => setIsHovered('records')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <i className="fa-solid fa-chart-line me-2" style={{ fontSize: '0.9rem' }}></i>
                Records
              </Link>
              
              <Link 
                to="/schedule" 
                className="nav-link"
                style={navItemStyle('schedule')}
                onMouseEnter={() => setIsHovered('schedule')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <i className="fa-solid fa-calendar-alt me-2" style={{ fontSize: '0.9rem' }}></i>
                Schedule
              </Link>
            </>
          )}

          {/* Admin Portal Button - Premium */}
          <Link
            to={isAdmin ? "/admin-dashboard" : "/admin-login"}
            className={`nav-link fw-bold ms-2 ${isAdmin ? 'text-primary' : 'text-danger'}`}
            style={{
              padding: '10px 22px',
              borderRadius: '14px',
              fontSize: '0.9rem',
              fontWeight: '700',
              letterSpacing: '0.2px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: isAdmin ? 
                (isDarkMode ? 
                  'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.15))' : 
                  'linear-gradient(135deg, rgba(29, 78, 216, 0.1), rgba(37, 99, 235, 0.08))') : 
                (isDarkMode ? 
                  'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.15))' : 
                  'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.08))'),
              border: isAdmin ? 
                (isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(29, 78, 216, 0.2)') : 
                (isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(220, 38, 38, 0.2)'),
              color: isAdmin ? 
                (isDarkMode ? '#93c5fd' : '#1d4ed8') : 
                (isDarkMode ? '#fca5a5' : '#dc2626'),
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
            }}
          >
            <i className={`fa-solid ${isAdmin ? 'fa-arrow-left' : 'fa-lock'} me-2`}></i>
            {isAdmin ? "Admin Portal" : "Admin Portal"}
          </Link>

          {/* User Profile / Login */}
          {user && !isAdmin ? (
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative d-flex align-items-center gap-3">
                {/* Welcome Message - Enhanced */}
                <div 
                  className="d-flex align-items-center gap-2"
                  style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    backdropFilter: 'blur(10px)',
                    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <div className="hand-container position-relative">
                    <span className="static-hand" style={{ fontSize: '1.2rem', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>👋</span>
                    <img
                      src={waveImageUrl}
                      alt="waving"
                      className={`wave-gif position-absolute ${isWaving ? 'fade-in' : 'fade-out'}`}
                      style={{
                        top: '-8px',
                        left: '-8px',
                        width: '36px',
                        height: '36px',
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                      }}
                    />
                  </div>
                  <span className="fw-medium" style={{ 
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    fontSize: '0.9rem'
                  }}>
                    Welcome, <span className="fw-bold" style={{ 
                      color: isDarkMode ? '#fff' : '#0f766e',
                      letterSpacing: '0.2px'
                    }}>{userName}</span>
                  </span>
                </div>

                {/* Profile Picture - Enhanced */}
                <div onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
                  <div
                    className="rounded-circle position-relative"
                    style={{
                      width: '42px',
                      height: '42px',
                      overflow: 'hidden',
                      border: isDarkMode ? 
                        '3px solid rgba(56, 189, 248, 0.5)' : 
                        '3px solid rgba(14, 165, 164, 0.5)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.boxShadow = '0 6px 20px rgba(14, 165, 164, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                  >
                    <img
                      src={user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=${isDarkMode ? '1e293b' : '0ea5a4'}&color=fff&bold=true`}
                      alt="Profile"
                      className="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </div>
                
                {/* Dropdown - Enhanced */}
                {showDropdown && (
                  <div
                    className="position-absolute end-0 mt-3 rounded-xl shadow-xl"
                    style={{
                      top: '100%',
                      background: isDarkMode ? 
                        'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))' : 
                        'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95))',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      zIndex: 1050,
                      minWidth: '160px',
                      border: isDarkMode ? 
                        '1px solid rgba(255, 255, 255, 0.15)' : 
                        '1px solid rgba(0, 0, 0, 0.1)',
                      overflow: 'hidden',
                    }}
                  >
                    <button
                      onClick={handleLogout}
                      className="btn w-100 text-start px-4 py-3 d-flex align-items-center gap-3"
                      style={{
                        background: 'transparent',
                        color: isDarkMode ? '#f87171' : '#dc2626',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = isDarkMode ? 
                          'rgba(248, 113, 113, 0.1)' : 
                          'rgba(220, 38, 38, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                      }}
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : !user ? (
            <div className="d-flex align-items-center">
              <Link
                to="/login"
                className="nav-link d-flex align-items-center gap-2"
                style={{
                  padding: '10px 22px',
                  borderRadius: '14px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  letterSpacing: '0.2px',
                  textDecoration: 'none',
                  color: '#0ea5a4',
                  border: isDarkMode ? 
                    '1px solid rgba(14, 165, 164, 0.4)' : 
                    '1px solid #0ea5a4',
                  background: isDarkMode ? 
                    'rgba(14, 165, 164, 0.1)' : 
                    'transparent',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.background = isDarkMode ? 
                    'rgba(14, 165, 164, 0.2)' : 
                    '#0ea5a4';
                  e.target.style.color = isDarkMode ? '#a5f3fc' : 'white';
                  e.target.style.boxShadow = '0 8px 20px rgba(14, 165, 164, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = isDarkMode ? 
                    'rgba(14, 165, 164, 0.1)' : 
                    'transparent';
                  e.target.style.color = '#0ea5a4';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </Link>
            </div>
          ) : null}

          {/* Theme Toggle - Enhanced */}
          <button
            onClick={toggleTheme}
            className="btn d-flex align-items-center justify-content-center"
            style={{
              fontSize: '1.1rem',
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: isDarkMode ? 
                'rgba(96, 165, 250, 0.15)' : 
                'rgba(14, 165, 164, 0.15)',
              border: isDarkMode ? 
                '1px solid rgba(96, 165, 250, 0.3)' : 
                '1px solid rgba(14, 165, 164, 0.3)',
              color: isDarkMode ? '#60a5fa' : '#0ea5a4',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'rotate(12deg) scale(1.1)';
              e.target.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'rotate(0) scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
}