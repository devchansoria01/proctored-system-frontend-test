import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// 1. Import the Firebase tools
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; 

export default function LoginPage() {
  const navigate = useNavigate();
  
  // 2. State for inputs and errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); // Clear old errors before trying

    try {
      // 3. THE REAL LOGIN LOGIC
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log("Login Successful!");
      
      // 4. Success? Go Home.
      navigate('/'); 

    } catch (err) {
      // 5. If it fails, show the error
      console.log(err.code);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError("Incorrect email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-box">
        <div className="card-box">
            {/* ADDED: theme-text-primary */}
          <h3 className="text-center fw-bold mb-4 theme-text-primary">Welcome Back 👋</h3>
          
          {/* ADDED: theme-text-secondary */}
          {error && <div className="alert alert-danger p-2 text-center theme-text-secondary">{error}</div>}

          <form onSubmit={handleLogin}>
            
            {/* 1. EMAIL FIELD: Switched to standard layout */}
            <div className="mb-4">
                {/* ADDED: theme-text-secondary for label color */}
                <label htmlFor="emailInput" className="small mb-1 fw-bold theme-text-secondary">Email address</label>
                <input 
                  type="email" 
                  className="form-control admin-input" /* Using admin-input class for dark mode style */
                  id="emailInput" 
                  placeholder="name@example.com" 
                  required 
                  onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            {/* 2. PASSWORD FIELD: Switched to standard layout */}
            <div className="mb-4">
                {/* ADDED: theme-text-secondary for label color */}
                <label htmlFor="passwordInput" className="small mb-1 fw-bold theme-text-secondary">Password</label>
                <input 
                  type="password" 
                  className="form-control admin-input" /* Using admin-input class for dark mode style */
                  id="passwordInput" 
                  placeholder="Password" 
                  required 
                  onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="login-btn w-100">Login</button>
          </form>

            {/* ADDED: theme-text-secondary */}
          <p className="text-center mt-4 theme-text-secondary">
            New user? <br/>
            <Link to="/signup" className="fw-bold" style={{color: 'var(--accent)', textDecoration: 'none'}}>
              Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}