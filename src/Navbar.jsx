import React from 'react';
import { Link } from 'react-router-dom'; // 👈 Import Link

export default function Navbar() {
  return (
    <nav className="navbar fixed-top">
      <div className="container" style={{display: 'flex', width: '90%', alignItems: 'center'}}>
        {/* Make the logo go to Home */}
        <Link to="/" className="navbar-brand">
            <i className="fa-solid fa-shield-halved"></i> APS-Admin Proctored System
        </Link>
        
        <div style={{display: 'flex', alignItems: 'center'}}>
            <a className="nav-link" href="/#about">About</a>
            <a className="nav-link" href="/#team">Schedule</a>
            <a className="nav-link" href="/#insights">Result</a>
            
            {/* 👇 THIS IS THE FIX: Link to /signup */}
            <Link to="/signup" className="nav-link" style={{border: '1px solid #0ea5a4', padding: '5px 15px', borderRadius: '20px', color: '#0ea5a4', textDecoration: 'none'}}>
                Sign-up
            </Link>
            
            <button className="theme-btn">🌙</button>
        </div>
      </div>
    </nav>
  );
}