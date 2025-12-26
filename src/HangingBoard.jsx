import React, { useState, useEffect } from 'react';
import './HangingBoard.css';

export default function HangingBoard() {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const appcard = () => {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 100);

      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setShouldRender(false), 1200);
      }, 25000); 
    };

    appcard();
    const interval = setInterval(appcard, 80000);
    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`hanging-container ${isAnimating ? 'show' : ''}`}>
        <div className="glass-chain left"></div>
        <div className="glass-chain right"></div>
        
        <div className="glass-plaque">
          <div className="plaque-shine"></div>
          <div className="plaque-content">
            <span className="shimmer-text"> Experience the App</span>
            <span className="subtitle-text">Monitor exams from anywhere</span>
            <div className="glass-icons">
                <i className="fa-brands fa-google-play"></i>
                <i className="fa-brands fa-apple"></i>
            </div>
          </div>
        </div>
    </div>
  );
}