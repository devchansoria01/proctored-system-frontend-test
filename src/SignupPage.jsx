import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom'; // 👈 Essential for navigation

export default function SignupPage() {
  return (
    <>
      <Navbar />
      <div className="signup-wrapper">
        <div className="signup-card">
          <h1 className="signup-title">Sign Up</h1>

          <form>
            <div className="input-group-custom">
              <input type="email" required placeholder=" " />
              <label>Email Address</label>
            </div>

            <div className="input-group-custom">
              <input type="password" required placeholder=" " />
              <label>Password</label>
            </div>

            <button className="signup-btn">Create Account</button>
          </form>

          <div className="alt-link">
            Already have an account? <br/>
            {/* Links to the Login Page */}
            <Link to="/login" style={{textDecoration: 'none'}}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}