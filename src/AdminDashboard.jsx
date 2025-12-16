import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth'; 
// ------------------------------------------------------------------
// --- IMPORTANT: CHANGE IMPORTS TO USE ADMIN-SCOPED COMPONENTS ---
import AdminRecords from './AdminRecords';
import AdminSchedule from './AdminSchedule';
// ------------------------------------------------------------------

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedule');
  const [adminName, setAdminName] = useState('Admin'); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.displayName) {
        setAdminName(user.displayName); 
      } else if (!user) {
        navigate('/admin-login'); 
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); 
  };

  return (
    // Replaced hardcoded background color with a CSS variable
    <div className="admin-page-bg" style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      
      {/* 🛡️ TOP BAR - Added class admin-nav-bar */}
      <nav className="navbar fixed-top shadow-sm admin-nav-bar" style={{ borderBottom: '2px solid #0ea5a4', zIndex: 1000 }}>
        <div className="container-fluid px-5" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="d-flex align-items-center">
                <span className="theme-text-primary" style={{ fontSize: '1.5rem', marginRight: '10px' }}>🛡️</span>
                {/* Added theme-text-primary */}
                <span className="fw-bold theme-text-primary" style={{ fontSize: '1.25rem', color: '#0f172a', letterSpacing: '1px' }}>
                    ADMIN PORTAL
                </span>
            </div>
            <div className="d-flex align-items-center gap-4">
                {/* Added theme-text-secondary */}
                <a href="/" className="text-decoration-none fw-bold theme-text-secondary" style={{ fontSize: '0.95rem' }}>
                    Home
                </a>
                <button onClick={handleLogout} className="btn btn-danger btn-sm px-3 rounded-pill fw-bold">
                    Logout
                </button>
            </div>
        </div>
      </nav>

      {/* 🌟 DECORATIVE BACKGROUND HEADER (Kept as is - it's dark in both modes) */}
      <div style={{ 
          background: 'linear-gradient(135deg, #0ea5a4 0%, #0f172a 100%)', 
          height: '250px', 
          width: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          zIndex: 0
      }}></div>
      
      {/* MAIN CONTENT CONTAINER */}
      <div className="container-fluid px-5" style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>
        <div className="row g-4">
          
          {/* 🟢 SIDEBAR: PROFILE */}
          <div className="col-md-3">
            {/* Added theme-card class, removed hardcoded background color */}
            <div className="card theme-card border-0 shadow-lg p-4 text-center h-100 sidebar-card" style={{ borderRadius: '20px' }}>
              <div className="mb-4">
                {/* Profile Circle is fine */}
                <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3 shadow-sm"
                    style={{ width: '100px', height: '100px', background: '#d1fae5', color: '#10b981', fontSize: '2.5rem', border: '4px solid white' }}
                >
                    {adminName.charAt(0).toUpperCase()}
                </div>
                {/* ADDED: theme-text-primary */}
                <h3 className="fw-bold mb-0 theme-text-primary">{adminName}</h3>
                {/* ADDED: theme-text-secondary */}
                <p className="text-muted small theme-text-secondary">Senior Administrator</p>
                <div className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mt-2">
                    Verified Organisation
                </div>
              </div>
              <hr className="my-4 theme-hr" />
              <div className="text-start px-2">
                {/* ADDED: theme-text-secondary */}
                <p className="text-uppercase small fw-bold mb-3 theme-text-secondary" style={{letterSpacing: '1px'}}>Overview</p>
                
                {/* Overview Details */}
                <div className="d-flex justify-content-between mb-2">
                    <span className="theme-text-secondary"><i className="fa-solid fa-list-check me-2"></i>Tests Organized</span>
                    <span className="fw-bold theme-text-primary">12</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span className="theme-text-secondary"><i className="fa-solid fa-laptop-code me-2"></i>Active Labs</span>
                    <span className="fw-bold theme-text-primary">4</span>
                </div>
              </div>
              <div className="mt-auto pt-4 d-grid gap-2">
                 {/* ADDED: sidebar-btn class */}
                 <button className="btn sidebar-btn fw-bold text-start">
                    💳 Billing & Plans
                 </button>
                 {/* ADDED: sidebar-btn class */}
                 <button className="btn sidebar-btn fw-bold text-start">
                    ⚙️ Settings
                 </button>
              </div>
            </div>
          </div>

          {/* 🔵 RIGHT COLUMN: WORKSPACE */}
          <div className="col-md-9">
            
            {/* Create Contest Card */}
            {/* Added theme-card class, removed hardcoded background color */}
            <div className="card theme-card border-0 shadow-lg p-4 mb-4 text-center" style={{ borderRadius: '20px' }}>
                <h3 className="fw-bold mb-4" style={{ color: '#0ea5a4', letterSpacing: '0.5px' }}>
                    🚀 Create New Contest
                </h3>
                
                <div className="row justify-content-center">
                    <div className="col-md-8 text-start">
                        {/* Compact Inputs */}
                        <div className="row g-3">
                            <div className="col-md-6">
                                {/* ADDED: theme-text-secondary, admin-input */}
                                <label className="small mb-1 fw-bold theme-text-secondary">HackerRank Contest URL</label>
                                <input type="text" className="form-control admin-input border-0" />
                            </div>
                            <div className="col-md-6">
                                {/* ADDED: theme-text-secondary, admin-input */}
                                <label className="small mb-1 fw-bold theme-text-secondary">Contest Password</label>
                                <input type="text" className="form-control admin-input border-0" />
                            </div>
                            <div className="col-md-12">
                                {/* ADDED: theme-text-secondary, admin-input */}
                                <label className="small mb-1 fw-bold theme-text-secondary">Duration (minutes)</label>
                                <input type="number" className="form-control admin-input border-0" />
                            </div>
                        </div>
                        
                        <div className="text-center mt-4">
                            <button 
                                className="btn text-white px-5 py-2 rounded-pill fw-bold" 
                                style={{ background: '#0ea5a4', fontSize: '1rem', boxShadow: '0 4px 14px rgba(14, 165, 164, 0.4)', transition: '0.3s' }}
                            >
                                <i className="fa-solid fa-play me-2"></i> Start Contest
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Tabs Container */}
            {/* Added theme-card class, removed hardcoded background color */}
            <div className="card theme-card border-0 shadow-lg p-4" style={{ borderRadius: '20px', minHeight: '400px' }}>
                <div className="d-flex gap-3 mb-4 border-bottom pb-3">
                    {/* Schedule Button */}
                    <button 
                        className={`btn rounded-pill px-4 tab-button ${activeTab === 'schedule' ? 'active' : 'inactive'}`}
                        onClick={() => setActiveTab('schedule')}
                    >
                        📅 Exam Schedule
                    </button>
                    {/* Records Button */}
                    <button 
                        className={`btn rounded-pill px-4 tab-button ${activeTab === 'records' ? 'active' : 'inactive'}`}
                        onClick={() => setActiveTab('records')}
                    >
                        📂 Student Records
                    </button>
                </div>
                
                {/* Scrollable Area to keep height contained */}
                <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {/* --- FIXED: USING ADMIN-SCOPED COMPONENTS --- */}
                    {activeTab === 'schedule' && <AdminSchedule />}
                    {activeTab === 'records' && <AdminRecords />}
                </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Admin Dashboard Specific Styles */}
      <style>{`
        /* CSS Variables for global colors used in fixed elements */
        :root {
            --admin-nav-bg: #ffffff;
            --admin-page-bg: #f0f4f8;
            --admin-hr-color: #e2e8f0;
            --admin-tab-bg-active: #212529;
            --admin-tab-text-inactive: #6c757d;
            --admin-tab-bg-inactive: #f8f9fa;
        }
        .dark, .dark-mode {
            --admin-nav-bg: #0f172a;
            --admin-page-bg: #0f172a;
            --admin-hr-color: #334155;
            --admin-tab-bg-active: #0ea5a4;
            --admin-tab-text-inactive: #cbd5e1;
            --admin-tab-bg-inactive: #334155;
        }

        .admin-page-bg {
            background-color: var(--admin-page-bg) !important;
            transition: background-color 0.3s ease;
        }
        
        /* Top Navigation Bar */
        .admin-nav-bar {
            background-color: var(--admin-nav-bg) !important;
            transition: background-color 0.3s ease;
        }

        /* Sidebar HR divider */
        .theme-hr {
            border-top: 1px solid var(--admin-hr-color) !important;
        }

        /* Sidebar Buttons (Billing & Settings) */
        .sidebar-btn {
            background-color: var(--admin-tab-bg-inactive);
            color: var(--admin-tab-text-inactive) !important;
            border: 1px solid var(--admin-hr-color);
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        .sidebar-btn:hover {
            background-color: #0ea5a4 !important;
            color: white !important;
        }

        /* Input Fields (Create Contest) */
        .admin-input {
            background-color: var(--admin-tab-bg-inactive) !important;
            border-color: var(--admin-hr-color) !important;
            color: var(--admin-tab-text-inactive) !important;
            transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }
        
        /* Tab Buttons (Exam Schedule/Records) */
        .tab-button {
            border: none;
            font-weight: bold;
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .tab-button.active {
            background-color: var(--admin-tab-bg-active) !important;
            color: white !important;
        }

        .tab-button.inactive {
            background-color: var(--admin-tab-bg-inactive) !important;
            color: var(--admin-tab-text-inactive) !important;
        }
        .tab-button.inactive:hover {
             background-color: var(--admin-hr-color) !important;
        }
      `}</style>

    </div>
  );
}