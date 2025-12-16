import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Page Imports
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ContributorsSection from './ContributorsSection';
import Footer from './Footer';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import InsightsSection from './InsightsSection';

// Protected Pages & The Guard
import Records from './Records';
import Schedule from './Schedule';
import ProtectedRoute from './ProtectedRoute';

import './index.css'; 

// Helper Component for the Landing Page
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
  return (
    <div className="min-h-screen font-sans">
      <Routes>
        {/* Public Routes (Navbar is already inside these components) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 🔒 PROTECTED ROUTES */}
        {/* I added <Navbar /> here so it shows up on these pages too! */}
        
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