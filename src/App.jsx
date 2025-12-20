import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ContributorsSection from './ContributorsSection';
import Footer from './Footer';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import InsightsSection from './InsightsSection';
import AdminLoginPage from './AdminLoginPage';
import AdminDashboard from './AdminDashboard';
import Records from './Records';
import Schedule from './Schedule';
import ProtectedRoute from './ProtectedRoute';


import AdminProtectedRoute from './AdminProtectedRoute';
import LiveMonitorPage from './LiveMonitorPage';

import './index.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="home"><HeroSection /></div>
      <div id="insights"><InsightsSection /></div>
      <Footer />
    </>
  );
}

function App() {
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      document.body.classList.remove('dark-mode');
    } else {
      // default + "dark" value both lead here
      document.body.classList.add('dark-mode');
    }
  }, []); 

  return (
    <div className="min-h-screen font-sans">
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <div style={{ paddingTop: '100px', minHeight: '80vh' }}>
                <ContributorsSection />
              </div>
              <Footer />
            </>
          }
        />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />

        {/*  */}
        <Route 
          path="/live-monitor" 
          element={
            <AdminProtectedRoute>
              <LiveMonitorPage />
            </AdminProtectedRoute>
          } 
        />

        <Route
          path="/records"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Records />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Schedule />
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;