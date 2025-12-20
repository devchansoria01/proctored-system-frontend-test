import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom'; 

// 1. Updated Imports
import { auth, db, googleProvider } from './firebase'; 
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export default function SignupPage() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // --- NEW: GOOGLE SIGNUP LOGIC ---
  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check Firestore to see if user data already exists
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create the student profile if it's a first-time user
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: "student", // 🛡️ Ensuring they are registered as student
          createdAt: new Date(),
          photoURL: user.photoURL
        });
      }

      console.log("Google Signup Successful!");
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError("Google authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault(); 
    setError('');
    setLoading(true);

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
        role: "student", // Consistent with your portal requirements
        createdAt: new Date()
      });

      console.log("User created:", user.uid);

      alert("Account created successfully! Please log in.");
      navigate('/login');
      
    } catch (err) {
      console.error("Signup Error:", err);
      
      if (err.code === 'auth/email-already-in-use') {
        alert("This email is already registered! Redirecting to login...");
        navigate('/login');
      } else {
        const errorMessage = err.message.replace('Firebase: ', '').replace('auth/', '');
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-wrapper">
        <div className="signup-card">
          <h1 className="signup-title">Sign Up</h1>

          {error && <div className="alert alert-danger p-2 small text-center theme-text-secondary">{error}</div>}

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

            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* --- GOOGLE SIGNUP SECTION --- */}
          <div className="text-center mt-3">
            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1 theme-hr" />
              <span className="mx-2 text-muted small theme-text-secondary">OR</span>
              <hr className="flex-grow-1 theme-hr" />
            </div>

            <button 
              type="button" 
              onClick={handleGoogleSignup}
              className="btn w-100 d-flex align-items-center justify-content-center shadow-sm"
              style={{ 
                border: '1px solid #ddd', 
                background: 'var(--card-bg, #fff)', 
                color: 'var(--text-primary, #444)', 
                fontWeight: 'bold',
                padding: '10px',
                borderRadius: '8px'
              }}
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="Google" 
                style={{ width: '20px', marginRight: '10px' }} 
              />
              Sign up with Google
            </button>
          </div>

          <div className="alt-link theme-text-secondary mt-3">
            Already have an account? <br/>
            <Link to="/login" style={{textDecoration: 'none'}}>Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}