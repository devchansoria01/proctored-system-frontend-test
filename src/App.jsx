import React, { useEffect } from 'react'; // 👈 Import useEffect
import { Routes, Route } from 'react-router-dom';

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

import './index.css'; 

function LandingPage() {
  return (
    <>
      <Navbar />
      <div id="home"><HeroSection /></div>
      <div id="contributors"><ContributorsSection /></div>
      <div id="insights"><InsightsSection /></div>
      <Footer />
    </>
  );
}

function App() {
  
  // 🌙 GLOBAL THEME CHECKER
  // This runs once when the app starts, ensuring Dark Mode applies to Login/Admin pages too!
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route 
          path="/admin-dashboard" 
          element={
            <ProtectedRoute>
               <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* PROTECTED ROUTES */}
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