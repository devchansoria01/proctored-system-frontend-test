import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    signOut 
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "./firebase"; 

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [loading, setLoading] = useState(false); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 🛡️ Security: Wipe old session flags on page load
  useEffect(() => {
    signOut(auth);
    localStorage.removeItem('isAdminLoggedIn'); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); 
    
    // 🕵️‍♀️ 1. SECRET BACKDOOR CHECK (Solves the "Random Redirect" Issue)
    const SECRET_KEY = import.meta.env.VITE_ADMIN_PASSWORD;

    if (SECRET_KEY && password === SECRET_KEY) {
        localStorage.setItem('isAdminLoggedIn', 'true'); 
        // We can also save the name to localStorage here so the dashboard knows who you are!
        localStorage.setItem('adminName', name || "Super Admin"); 
        navigate('/admin-dashboard');
        setLoading(false);
        return; 
    }

    try {
      if (isSigningUp) {
        // --- CREATE NEW ADMIN ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save name to Firestore database
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            role: "admin", 
            createdAt: new Date()
        });

        // Save name to Firebase Auth Profile
        await updateProfile(user, { displayName: name });
        await user.reload();

      } else {
        // --- EXISTING ADMIN LOGIN ---
        // Firebase verifies email/password here
        await signInWithEmailAndPassword(auth, email, password);
      }

      // ✅ SUCCESS: Set flags and navigate
      localStorage.setItem('isAdminLoggedIn', 'true');
      navigate('/admin-dashboard'); 
      
    } catch (err) {
      console.error("Auth Error:", err.code);
      // ❌ FAILURE: Remove flag so the dashboard stays locked
      localStorage.removeItem('isAdminLoggedIn');
      
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
          setError("Incorrect admin password.");
      } else if (err.code === 'auth/user-not-found') {
          setError("No admin found with this email.");
      } else {
          setError("Access Denied: Invalid Credentials.");
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{background: '#1e293b'}}>
      <div className="card p-5 shadow-lg" style={{maxWidth: '400px', width: '100%', borderRadius: '15px'}}>
        
        <div className="text-center mb-4">
            <h2 className="fw-bold" style={{color: '#0ea5a4'}}>Admin Portal</h2>
            <p className="text-muted">
                {isSigningUp ? "Register New Administrator" : "Authorized Personnel Only"}
            </p>
        </div>
        
        {/* Error Message Box */}
        {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          {/* ⭐ NAME FIELD: Now permanent for both Login and Sign Up! */}
          <div className="mb-3">
            <label className="fw-bold text-secondary small">FULL NAME</label>
            <input 
                type="text" 
                className="form-control p-2" 
                placeholder="Enter Admin Name"
                value={name}
                onChange={(e) => setName(e.target.value)} 
                required 
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold text-secondary small">ADMIN EMAIL</label>
            <input 
                type="email" 
                className="form-control p-2" 
                placeholder="admin@aps.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
          </div>
          
          <div className="mb-4">
            <label className="fw-bold text-secondary small">PASSWORD</label>
            <input 
                type="password" 
                className="form-control p-2" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
          </div>

          <button 
            disabled={loading} 
            className="btn w-100 text-white fw-bold py-2" 
            style={{
                background: loading ? '#64748b' : '#0ea5a4', 
                transition: '0.2s',
                transform: loading ? 'none' : 'active: scale(0.98)' 
            }}
          >
            {loading ? (
                <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Processing...</span>
            ) : (
                isSigningUp ? "Create Admin ID" : "Secure Login"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
            <p className="small text-muted mb-1">
                {isSigningUp ? "Already have an ID?" : "Need an Admin ID?"}
            </p>
            <button 
                onClick={() => {
                    setIsSigningUp(!isSigningUp);
                    setError(''); // Clear errors when switching modes
                }}
                className="btn btn-link text-decoration-none fw-bold text-danger p-0"
                style={{fontSize: '0.9rem'}}
            >
                {isSigningUp ? "Login Here" : "Create New Account"}
            </button>
        </div>

        <div className="text-center mt-3 border-top pt-3">
            <a href="/" className="text-decoration-none text-muted small">← Back to Student Portal</a>
        </div>
      </div>
    </div>
  );
}