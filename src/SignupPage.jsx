import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom'; 

// 👇 1. Import the real Firebase tools
import { auth, db } from './firebase'; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignupPage() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault(); 
    setError('');

    try {
      // A. Create the Account (Authentication)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // B. Update the "Auth Profile" Name immediately
      await updateProfile(user, {
        displayName: name
      });

      // C. Save the Name & Role to the Database (Firestore)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        role: "user",
        createdAt: new Date()
      });

      console.log("User created:", user.uid);

      // 👇 D. CHANGE HERE: Force them to Login
      alert("Account created successfully! Please log in.");
      navigate('/login');
      
    } catch (err) {
      console.error("Signup Error:", err);
      
      // E. Handle "Email Already Exists" specifically
      if (err.code === 'auth/email-already-in-use') {
        alert("This email is already registered! Redirecting to login...");
        navigate('/login');
      } else {
        const errorMessage = err.message.replace('Firebase: ', '').replace('auth/', '');
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-wrapper">
        <div className="signup-card">
          <h1 className="signup-title">Sign Up</h1>

          {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}

          <form onSubmit={handleSignup}>
            
            <div className="input-group-custom">
              <input 
                type="text" 
                required 
                placeholder=" " 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Full Name</label>
            </div>

            <div className="input-group-custom">
              <input 
                type="email" 
                required 
                placeholder=" " 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email Address</label>
            </div>

            <div className="input-group-custom">
              <input 
                type="password" 
                required 
                placeholder=" " 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
            </div>

            <button className="signup-btn" type="submit">Create Account</button>
          </form>

          <div className="alt-link">
            Already have an account? <br/>
            <Link to="/login" style={{textDecoration: 'none'}}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}