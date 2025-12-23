import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from './firebase'; 
import { onAuthStateChanged, signOut, updateEmail } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  const [showEditModal, setShowEditModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    college: '',
    phone: '',
    photoURL: ''
  });
  const [newImage, setNewImage] = useState(null);

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
            const displayName = userData.name || currentUser.displayName || "User";
            setUserName(displayName);
            setIsAdmin(localAdminCheck || userData.role === 'admin');
            
            setEditData({
              name: displayName,
              email: currentUser.email || '',
              college: userData.college || '',
              phone: userData.phone || '',
              photoURL: userData.photoURL || currentUser.photoURL || ''
            });
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

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      let finalPhotoURL = editData.photoURL;

      // Note: Image upload logic is bypassed here to prevent hanging due to Firebase plan restrictions
      
      await updateDoc(doc(db, "users", user.uid), {
        name: editData.name,
        college: editData.college,
        phone: editData.phone,
        photoURL: finalPhotoURL
      });

      if (editData.email !== user.email) {
        await updateEmail(auth.currentUser, editData.email);
      }

      setUserName(editData.name);
      setShowEditModal(false);
      alert("Profile updated successfully!"); // Clean message for the meeting
    } catch (error) {
      alert("Update error: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

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
    <>
      <nav className={`navbar glass-nav fixed-top ${isDarkMode ? 'nav-dark' : 'nav-light'}`}>
        <div className="container-fluid" style={{ display: 'flex', width: '90%', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <Link to="/" className="navbar-brand text-decoration-none d-flex align-items-center gap-2">
            <i className="fa-solid fa-shield-halved" style={{ fontSize: '1.8rem', color: isDarkMode ? '#60a5fa' : '#0ea5a4' }}></i> 
            <span style={{ color: isDarkMode ? '#fff' : '#0f766e', fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.5px', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              APS-System
            </span>
          </Link>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link className="nav-link" to="/" style={navItemStyle('home')} onMouseEnter={() => setIsHovered('home')} onMouseLeave={() => setIsHovered(null)}>
              <i className="fa-solid fa-house me-2" style={{ fontSize: '0.9rem' }}></i> Home
            </Link>

            {!isAdmin && (
              <>
                <Link to="/schedule" className="nav-link" style={navItemStyle('schedule')} onMouseEnter={() => setIsHovered('schedule')} onMouseLeave={() => setIsHovered(null)}>
                  <i className="fa-solid fa-calendar-alt me-2" style={{ fontSize: '0.9rem' }}></i> Schedule
                </Link>
                <Link to="/records" className="nav-link" style={navItemStyle('records')} onMouseEnter={() => setIsHovered('records')} onMouseLeave={() => setIsHovered(null)}>
                  <i className="fa-solid fa-chart-line me-2" style={{ fontSize: '0.9rem' }}></i> Records
                </Link>
              </>
            )}

            <Link className="nav-link" to="/about" style={navItemStyle('about')} onMouseEnter={() => setIsHovered('about')} onMouseLeave={() => setIsHovered(null)}>
              <i className="fa-solid fa-circle-info me-2" style={{ fontSize: '0.9rem' }}></i> About
            </Link>

            <Link to={isAdmin ? "/admin-dashboard" : "/admin-login"} className={`nav-link fw-bold ms-2 ${isAdmin ? 'text-primary' : 'text-danger'}`} style={{ padding: '10px 22px', borderRadius: '14px', fontSize: '0.9rem', fontWeight: '700', textDecoration: 'none', transition: 'all 0.3s ease', background: isAdmin ? (isDarkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(29, 78, 216, 0.1)') : (isDarkMode ? 'rgba(239, 68, 68, 0.2)' : 'rgba(239, 68, 68, 0.1)'), border: isAdmin ? (isDarkMode ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid rgba(29, 78, 216, 0.2)') : (isDarkMode ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(220, 38, 38, 0.2)'), color: isAdmin ? (isDarkMode ? '#93c5fd' : '#1d4ed8') : (isDarkMode ? '#fca5a5' : '#dc2626') }}>
              <i className={`fa-solid ${isAdmin ? 'fa-arrow-left' : 'fa-lock'} me-2`}></i> {isAdmin ? "Admin Portal" : "Admin Portal"}
            </Link>

            {user && !isAdmin ? (
              <div className="d-flex align-items-center gap-3">
                <div className="position-relative d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center gap-2" style={{ padding: '8px 16px', borderRadius: '20px', background: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)' }}>
                    <div className="hand-container position-relative">
                      <span>👋</span>
                      <img src={waveImageUrl} alt="waving" className={`wave-gif position-absolute ${isWaving ? 'fade-in' : 'fade-out'}`} style={{ top: '-8px', left: '-8px', width: '36px', height: '36px' }} />
                    </div>
                    <span className="fw-medium" style={{ color: isDarkMode ? '#cbd5e1' : '#475569', fontSize: '0.9rem' }}>
                      Welcome, <span className="fw-bold" style={{ color: isDarkMode ? '#fff' : '#0f766e' }}>{userName}</span>
                    </span>
                  </div>

                  <div onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer', position: 'relative' }}>
                    <div className="rounded-circle" style={{ width: '42px', height: '42px', overflow: 'hidden', border: isDarkMode ? '3px solid rgba(56, 189, 248, 0.5)' : '3px solid rgba(14, 165, 164, 0.5)' }}>
                      <img src={editData.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=${isDarkMode ? '1e293b' : '0ea5a4'}&color=fff&bold=true`} alt="Profile" className="w-100 h-100 object-fit-cover" />
                    </div>
                    
                    {showDropdown && (
                      <div className="position-absolute end-0 mt-3 rounded-xl shadow-xl" style={{ top: '100%', background: isDarkMode ? '#1e293b' : '#fff', minWidth: '180px', zIndex: 1050, border: '1px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                        <button onClick={() => { setShowEditModal(true); setShowDropdown(false); }} className="btn w-100 text-start px-4 py-3 d-flex align-items-center gap-3" style={{ color: isDarkMode ? '#fff' : '#1e293b', fontSize: '0.9rem' }}>
                          <i className="fa-solid fa-user-pen"></i> Edit Profile
                        </button>
                        <hr style={{ margin: 0, opacity: 0.1 }} />
                        <button onClick={handleLogout} className="btn w-100 text-start px-4 py-3 d-flex align-items-center gap-3" style={{ color: '#dc2626', fontWeight: '600', fontSize: '0.9rem' }}>
                          <i className="fa-solid fa-arrow-right-from-bracket"></i> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : !user ? (
              <Link to="/login" className="nav-link" style={{ padding: '10px 22px', borderRadius: '14px', border: '1px solid #0ea5a4', color: '#0ea5a4', fontSize: '0.9rem', fontWeight: '700' }}>
                <i className="fa-solid fa-right-to-bracket me-2"></i> Login
              </Link>
            ) : null}

            <button onClick={toggleTheme} className="btn d-flex align-items-center justify-content-center" style={{ width: '44px', height: '44px', borderRadius: '12px', background: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : 'rgba(14, 165, 164, 0.1)', color: isDarkMode ? '#60a5fa' : '#0ea5a4' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {showEditModal && (
        <div className="modal-overlay d-flex align-items-center justify-content-center" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000 }}>
          <div className="p-4 rounded shadow-lg" style={{ background: isDarkMode ? '#1e293b' : '#fff', width: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h5 className="fw-bold mb-4" style={{ color: isDarkMode ? '#fff' : '#1e293b' }}>Update Profile</h5>
            
            <div className="text-center mb-4">
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={editData.photoURL || 'https://via.placeholder.com/100'} alt="preview" className="rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover', border: '3px solid #0ea5a4' }} />
                <div className="position-absolute bottom-0 end-0 bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '30px', height: '30px', opacity: 0.8 }}>
                  <i className="fa-solid fa-camera" style={{ fontSize: '0.8rem' }}></i>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="small fw-bold opacity-75">Full Name</label>
              <input type="text" className="form-control" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold opacity-75">Email Address</label>
              <input type="email" className="form-control" value={editData.email} onChange={(e) => setEditData({...editData, email: e.target.value})} />
            </div>

            <div className="mb-3">
              <label className="small fw-bold opacity-75">College/University</label>
              <input type="text" className="form-control" value={editData.college} onChange={(e) => setEditData({...editData, college: e.target.value})} />
            </div>

            <div className="mb-4">
              <label className="small fw-bold opacity-75">Phone Number</label>
              <input type="text" className="form-control" value={editData.phone} onChange={(e) => setEditData({...editData, phone: e.target.value})} />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-primary w-100 fw-bold" onClick={handleSaveProfile} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Profile'}
              </button>
              <button className="btn btn-outline-secondary w-100" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}