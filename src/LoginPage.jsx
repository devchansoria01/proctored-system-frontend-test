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
      // We ask Firebase: "Does this email and password match?"
      await signInWithEmailAndPassword(auth, email, password);
      
      console.log("Login Successful!");
      
      // 4. Success? Go Home.
      // Firebase automatically "persists" the session, so we don't need manual localStorage!
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
          <h3 className="text-center fw-bold mb-3">Welcome Back 👋</h3>
          
          {/* Show Error Message if it exists */}
          {error && <div className="alert alert-danger p-2 text-center">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input 
                type="email" 
                className="form-control" 
                id="floatingInput" 
                placeholder="name@example.com" 
                required 
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input 
                type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password" 
                required 
                // Connect this input to our state
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="login-btn w-100">Login</button>
          </form>

          <p className="text-center mt-4">
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