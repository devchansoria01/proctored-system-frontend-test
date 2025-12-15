import React from 'react';
import { Routes, Route } from 'react-router-dom'; // 👈 Import Router tools

// Import all your pages
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import ContributorsSection from './ContributorsSection';
import Footer from './Footer';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import './index.css'; 
import InsightsSection from './InsightsSection';

// Create a wrapper for the Landing Page so it stays clean
function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ContributorsSection />
      <InsightsSection />  {/* <--- Added here! */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen font-sans">
      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;