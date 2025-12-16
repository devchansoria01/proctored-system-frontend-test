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
  const [loading, setLoading] = useState(false); // 🆕 Loading State

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    signOut(auth);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // ⏳ Start Loading
    
    try {
      if (isSigningUp) {
        // --- CREATE NEW ADMIN ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: email,
            role: "admin", 
            createdAt: new Date()
        });

        await updateProfile(user, { displayName: name });
        await user.reload();

      } else {
        // --- EXISTING ADMIN LOGIN ---
        await signInWithEmailAndPassword(auth, email, password);
      }

      navigate('/admin-dashboard'); 
      
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
          setError("This email is already registered. Try logging in.");
      } else if (err.code === 'auth/user-not-found') {
          setError("No admin found with this email.");
      } else {
          setError("Failed. Check credentials.");
      }
    } finally {
      setLoading(false); // 🏁 Stop Loading
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
        
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label className="fw-bold text-secondary small">FULL NAME</label>
            <input 
                type="text" 
                className="form-control p-2" 
                placeholder={isSigningUp ? "Enter Admin Name" : "Profile Display Name"}
                onChange={(e) => setName(e.target.value)} 
                required={isSigningUp} 
            />
          </div>

          <div className="mb-3">
            <label className="fw-bold text-secondary small">ADMIN EMAIL</label>
            <input 
                type="email" 
                className="form-control p-2" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
          </div>
          
          <div className="mb-4">
            <label className="fw-bold text-secondary small">PASSWORD</label>
            <input 
                type="password" 
                className="form-control p-2" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
          </div>

          {/* 🆕 IMPROVED BUTTON */}
          <button 
            disabled={loading} // 🚫 Disable while loading
            className="btn w-100 text-white fw-bold py-2" 
            style={{
                background: loading ? '#64748b' : '#0ea5a4', // Grey if loading
                transition: '0.2s',
                transform: loading ? 'none' : 'active: scale(0.98)' // Clicking Effect
            }}
          >
            {loading ? (
                <span><i className="fa-solid fa-spinner fa-spin me-2"></i> Processing...</span>
            ) : (
                isSigningUp ? "Create Admin ID" : "Secure Login"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
            <p className="small text-muted mb-1">
                {isSigningUp ? "Already have an ID?" : "Need an Admin ID?"}
            </p>
            <button 
                onClick={() => setIsSigningUp(!isSigningUp)}
                className="btn btn-link text-decoration-none fw-bold text-danger"
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