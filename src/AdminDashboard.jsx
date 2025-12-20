import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth'; 

import AdminRecords from './AdminRecords';
import AdminSchedule from './AdminSchedule';
import LiveMonitoringTable from './LiveMonitoringTable'; 

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schedule');
  const [adminName, setAdminName] = useState('Admin'); 
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const isAdminLocal = localStorage.getItem('isAdminLoggedIn');

      if (user && user.displayName) {
        setAdminName(user.displayName); 
      } else if (!user && !isAdminLocal) {
        navigate('/admin-login'); 
      }
    });
    
    
    const checkTheme = () => {
      setIsDarkMode(document.body.classList.contains('dark-mode'));
    };
    checkTheme();
    
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
        await signOut(auth);
        localStorage.removeItem('isAdminLoggedIn'); 
        localStorage.removeItem('adminName');
        navigate('/admin-login'); 
    } catch (error) {
        console.error("Logout failed", error);
    }
  };

  return (
    <div className="admin-page-bg" style={{ minHeight: '100vh', paddingBottom: '2rem', position: 'relative' }}>
      
      {/* bg */}
      <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: -1, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: isDarkMode ? 
            'radial-gradient(circle, rgba(14, 165, 164, 0.12) 0%, transparent 70%)' : 
            'radial-gradient(circle, rgba(14, 165, 164, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: 'float-particle-1 20s ease-in-out infinite'
        }}></div>
      </div>
      
      {/* nav bar */}
      <nav className="navbar fixed-top admin-nav-bar" style={{ 
        zIndex: 1000,
        background: isDarkMode ? 
          'rgba(15, 23, 42, 0.9)' : 
          'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: isDarkMode ? 
          '1px solid rgba(14, 165, 164, 0.2)' : 
          '1px solid rgba(14, 165, 164, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="container-fluid px-4 px-lg-5 py-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="d-flex align-items-center gap-3">
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: isDarkMode ? 
                    'linear-gradient(135deg, rgba(14, 165, 164, 0.2), rgba(14, 165, 164, 0.1))' : 
                    'linear-gradient(135deg, rgba(14, 165, 164, 0.15), rgba(14, 165, 164, 0.05))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: isDarkMode ? 
                    '1px solid rgba(14, 165, 164, 0.3)' : 
                    '1px solid rgba(14, 165, 164, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                    <span style={{ 
                      fontSize: '1.2rem',
                      color: isDarkMode ? '#5eead4' : '#0ea5a4',
                      filter: 'drop-shadow(0 0 8px rgba(14, 165, 164, 0.3))'
                    }}>🛡️</span>
                </div>
                <div>
                  <span className="fw-bold" style={{ 
                    fontSize: '1.1rem',
                    color: isDarkMode ? '#f1f5f9' : '#0f172a',
                    letterSpacing: '0.5px'
                  }}>
                    ADMIN PORTAL
                  </span>
                  <div style={{ 
                    fontSize: '0.75rem',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    letterSpacing: '0.3px'
                  }}>
                    Powered by APS-System
                  </div>
                </div>
            </div>
            <div className="d-flex align-items-center gap-3">
                
                {/* Live Monitor Btn  */}
                <Link 
                  to="/live-monitor" 
                  className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-bold shadow-sm"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    border: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
                  }}
                >
                  <span style={{ fontSize: '0.9rem' }}>🔴</span>
                  Live Monitor
                </Link>

                {/* home btn */}
                <a 
                  href="/" 
                  className="text-decoration-none d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                  style={{
                    color: isDarkMode ? '#cbd5e1' : '#475569',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    background: isDarkMode ? 
                      'rgba(255, 255, 255, 0.05)' : 
                      'rgba(0, 0, 0, 0.02)',
                    border: isDarkMode ? 
                      '1px solid rgba(255, 255, 255, 0.1)' : 
                      '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? 
                      'rgba(255, 255, 255, 0.1)' : 
                      'rgba(0, 0, 0, 0.05)';
                    e.target.style.color = isDarkMode ? '#f8fafc' : '#0f172a';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = isDarkMode ? 
                      'rgba(255, 255, 255, 0.05)' : 
                      'rgba(0, 0, 0, 0.02)';
                    e.target.style.color = isDarkMode ? '#cbd5e1' : '#475569';
                  }}
                >
                  <i className="fa-solid fa-house" style={{ fontSize: '0.8rem' }}></i>
                  Home
                </a>

                {/*  */}
                <button 
                  onClick={handleLogout} 
                  className="btn d-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-bold"
                  style={{
                    color: '#ef4444',
                    background: isDarkMode ? 
                      'rgba(239, 68, 68, 0.1)' : 
                      'rgba(239, 68, 68, 0.05)',
                    border: isDarkMode ? 
                      '1px solid rgba(239, 68, 68, 0.3)' : 
                      '1px solid rgba(239, 68, 68, 0.2)',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? 
                      'rgba(239, 68, 68, 0.2)' : 
                      'rgba(239, 68, 68, 0.1)';
                    e.target.style.color = '#dc2626';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = isDarkMode ? 
                      'rgba(239, 68, 68, 0.1)' : 
                      'rgba(239, 68, 68, 0.05)';
                    e.target.style.color = '#ef4444';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <i className="fa-solid fa-arrow-right-from-bracket" style={{ fontSize: '0.8rem' }}></i>
                  Logout
                </button>
            </div>
        </div>
      </nav>

      {/*  */}
      <div style={{ 
          background: isDarkMode ? 
            'linear-gradient(135deg, rgba(14, 165, 164, 0.2) 0%, rgba(15, 23, 42, 0.9) 100%)' : 
            'linear-gradient(135deg, rgba(14, 165, 164, 0.1) 0%, rgba(241, 245, 249, 1) 100%)', 
          height: '280px', 
          width: '100%', 
          position: 'absolute', 
          top: 0, 
          left: 0,
          zIndex: 0,
          borderBottom: isDarkMode ? 
            '1px solid rgba(14, 165, 164, 0.1)' : 
            '1px solid rgba(14, 165, 164, 0.05)'
      }}></div>
      
      {/* MAIN CONTENT */}
      <div className="container-fluid px-4 px-lg-5" style={{ position: 'relative', zIndex: 1, paddingTop: '100px' }}>
        <div className="row g-4">
          
          {/* SIDEBAR */}
          <div className="col-md-3">
            <div className="card border-0 p-4 h-100" style={{ 
              borderRadius: '20px',
              background: isDarkMode ? 
                'rgba(30, 41, 59, 0.7)' : 
                'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isDarkMode ? 
                '1px solid rgba(255, 255, 255, 0.1)' : 
                '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
              <div className="mb-4">
                <div 
                    className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                    style={{ 
                      width: '100px', 
                      height: '100px', 
                      background: isDarkMode ? 
                        'linear-gradient(135deg, rgba(14, 165, 164, 0.3), rgba(14, 165, 164, 0.1))' : 
                        'linear-gradient(135deg, rgba(14, 165, 164, 0.2), rgba(14, 165, 164, 0.05))',
                      color: isDarkMode ? '#5eead4' : '#0ea5a4',
                      fontSize: '2.5rem',
                      border: isDarkMode ? 
                        '3px solid rgba(14, 165, 164, 0.3)' : 
                        '3px solid rgba(14, 165, 164, 0.2)',
                      fontWeight: '700',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {adminName.charAt(0).toUpperCase()}
                </div>
                
                {/*  */}
                <div className="text-center">
                  <h3 className="fw-bold mb-0" style={{ 
                    color: isDarkMode ? '#f8fafc' : '#0f172a',
                    fontSize: '1.3rem',
                    textAlign: 'center'
                  }}>{adminName}</h3>
                  <div className="d-flex align-items-center justify-content-center gap-2 mt-2">
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10b981',
                      animation: 'pulse 2s infinite'
                    }}></span>
                    <p className="small mb-0" style={{ 
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      fontSize: '0.85rem',
                      textAlign: 'center'
                    }}>Senior Administrator</p>
                  </div>
                </div>
              </div>
              <hr style={{ 
                border: 'none',
                height: '1px',
                background: isDarkMode ? 
                  'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' : 
                  'linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent)',
                margin: '1.5rem 0'
              }} />
              <div className="text-start px-1">
                <p className="text-uppercase small fw-bold mb-3" style={{
                  letterSpacing: '1px',
                  color: isDarkMode ? '#94a3b8' : '#64748b'
                }}>System Overview</p>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span style={{ 
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      fontSize: '0.9rem'
                    }}>Tests Organized</span>
                    <span className="fw-bold" style={{ 
                      color: isDarkMode ? '#f8fafc' : '#0f172a',
                      fontSize: '1.1rem'
                    }}>12</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span style={{ 
                      color: isDarkMode ? '#cbd5e1' : '#475569',
                      fontSize: '0.9rem'
                    }}>Active Labs</span>
                    <span className="fw-bold" style={{ 
                      color: isDarkMode ? '#f8fafc' : '#0f172a',
                      fontSize: '1.1rem'
                    }}>4</span>
                </div>
              </div>
            </div>
          </div>

          {/* WORKSPACE */}
          <div className="col-md-9">
            {/*  Contest Card */}
            <div className="card border-0 p-4 mb-4" style={{ 
              borderRadius: '20px',
              background: isDarkMode ? 
                'rgba(30, 41, 59, 0.7)' : 
                'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isDarkMode ? 
                '1px solid rgba(255, 255, 255, 0.1)' : 
                '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
            }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: isDarkMode ? 
                      'linear-gradient(135deg, rgba(14, 165, 164, 0.2), rgba(14, 165, 164, 0.1))' : 
                      'linear-gradient(135deg, rgba(14, 165, 164, 0.15), rgba(14, 165, 164, 0.05))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: isDarkMode ? 
                      '1px solid rgba(14, 165, 164, 0.3)' : 
                      '1px solid rgba(14, 165, 164, 0.2)'
                  }}>
                    <span style={{ 
                      fontSize: '1.2rem',
                      color: isDarkMode ? '#5eead4' : '#0ea5a4'
                    }}>🚀</span>
                  </div>
                  <h3 className="fw-bold mb-0" style={{ 
                    color: isDarkMode ? '#f8fafc' : '#0f172a',
                    background: 'linear-gradient(90deg, #0ea5a4, #22d3ee)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>Create New Contest</h3>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-9 text-start">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="small mb-2 fw-bold" style={{ 
                                  color: isDarkMode ? '#94a3b8' : '#64748b'
                                }}>HackerRank URL</label>
                                <input 
                                  type="text" 
                                  className="form-control border-0 p-3" 
                                  style={{
                                    background: isDarkMode ? 
                                      'rgba(255, 255, 255, 0.05)' : 
                                      'rgba(0, 0, 0, 0.02)',
                                    color: isDarkMode ? '#f8fafc' : '#0f172a',
                                    borderRadius: '12px',
                                    border: isDarkMode ? 
                                      '1px solid rgba(255, 255, 255, 0.1)' : 
                                      '1px solid rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.border = isDarkMode ? 
                                      '1px solid rgba(14, 165, 164, 0.5)' : 
                                      '1px solid rgba(14, 165, 164, 0.3)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 164, 0.1)';
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.border = isDarkMode ? 
                                      '1px solid rgba(255, 255, 255, 0.1)' : 
                                      '1px solid rgba(0, 0, 0, 0.05)';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                />
                            </div>
                            <div className="col-md-6">
                                <label className="small mb-2 fw-bold" style={{ 
                                  color: isDarkMode ? '#94a3b8' : '#64748b'
                                }}>Contest Password</label>
                                <input 
                                  type="text" 
                                  className="form-control border-0 p-3"
                                  style={{
                                    background: isDarkMode ? 
                                      'rgba(255, 255, 255, 0.05)' : 
                                      'rgba(0, 0, 0, 0.02)',
                                    color: isDarkMode ? '#f8fafc' : '#0f172a',
                                    borderRadius: '12px',
                                    border: isDarkMode ? 
                                      '1px solid rgba(255, 255, 255, 0.1)' : 
                                      '1px solid rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease'
                                  }}
                                  onFocus={(e) => {
                                    e.target.style.border = isDarkMode ? 
                                      '1px solid rgba(14, 165, 164, 0.5)' : 
                                      '1px solid rgba(14, 165, 164, 0.3)';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 164, 0.1)';
                                  }}
                                  onBlur={(e) => {
                                    e.target.style.border = isDarkMode ? 
                                      '1px solid rgba(255, 255, 255, 0.1)' : 
                                      '1px solid rgba(0, 0, 0, 0.05)';
                                    e.target.style.boxShadow = 'none';
                                  }}
                                />
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn px-5 py-3 rounded-pill fw-bold" style={{ 
                              background: 'linear-gradient(135deg, #0ea5a4, #0d9488)',
                              color: 'white',
                              border: 'none',
                              fontSize: '1rem',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'translateY(-2px)';
                              e.target.style.boxShadow = '0 8px 25px rgba(14, 165, 164, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = 'none';
                            }}>
                                Start Contest
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TABS SECTION - Premium */}
            <div className="card border-0 p-4" style={{ 
              borderRadius: '20px',
              background: isDarkMode ? 
                'rgba(30, 41, 59, 0.7)' : 
                'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: isDarkMode ? 
                '1px solid rgba(255, 255, 255, 0.1)' : 
                '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              minHeight: '400px'
            }}>
                {/* Tab Buttons - Premium */}
                <div className="d-flex gap-3 mb-4">
                    <button 
                        className={`d-flex align-items-center gap-2 px-4 py-3 rounded-pill border-0 fw-bold ${activeTab === 'schedule' ? 'active-tab' : 'inactive-tab'}`} 
                        onClick={() => setActiveTab('schedule')}
                        style={{
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          fontSize: '0.95rem'
                        }}
                    >
                        <span style={{ fontSize: '1rem' }}>📅</span>
                        Assessment Schedule
                    </button>
                    <button 
                        className={`d-flex align-items-center gap-2 px-4 py-3 rounded-pill border-0 fw-bold ${activeTab === 'records' ? 'active-tab' : 'inactive-tab'}`} 
                        onClick={() => setActiveTab('records')}
                        style={{
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          fontSize: '0.95rem'
                        }}
                    >
                        <span style={{ fontSize: '1rem' }}>📂</span>
                        Records
                    </button>
                </div>
                
                <div>
                    {activeTab === 'schedule' && <AdminSchedule />}
                    {activeTab === 'records' && <AdminRecords />}
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic CSS */}
      <style>{`
        .active-tab {
          background: linear-gradient(135deg, #0ea5a4, #0d9488) !important;
          color: white !important;
          box-shadow: 0 4px 15px rgba(14, 165, 164, 0.3) !important;
        }
        
        .inactive-tab {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'} !important;
          color: ${isDarkMode ? '#94a3b8' : '#64748b'} !important;
          border: ${isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)'} !important;
        }
        
        .inactive-tab:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'} !important;
          color: ${isDarkMode ? '#f8fafc' : '#0f172a'} !important;
          transform: translateY(-2px) !important;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes float-particle-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}