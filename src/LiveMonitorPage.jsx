import React from 'react';
import { Link } from 'react-router-dom';
import LiveMonitoringTable from './LiveMonitoringTable'; 

export default function LiveMonitorPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', paddingBottom: '2rem' }}>
      
      {/* 🔴 LIVE MONITOR TOP BAR (Red Accent) */}
      <nav className="navbar fixed-top shadow-sm" style={{ background: '#1e293b', borderBottom: '2px solid #ef4444', zIndex: 1000 }}>
        <div className="container-fluid px-5 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>🔴</span>
                <span className="fw-bold text-white" style={{ fontSize: '1.25rem', letterSpacing: '1px' }}>
                    LIVE MONITORING CONSOLE
                </span>
            </div>
            <div>
                <Link to="/admin-dashboard" className="btn btn-outline-secondary btn-sm rounded-pill fw-bold text-white">
                    ← Back to Dashboard
                </Link>
            </div>
        </div>
      </nav>

      {/* 📋 TABLE CONTAINER */}
      <div
  className="container-fluid"
  style={{
    paddingTop: '100px',
    display: 'flex',
    justifyContent: 'center',
  }}
>
  <LiveMonitoringTable />
</div>

    </div>
  );
}