import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "./firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          role: "student",
          createdAt: new Date(),
          photoURL: user.photoURL
        });
      }
      navigate('/'); 
    } catch (err) {
      console.error(err);
      // 🛠️ Improved Error Messaging
      if (err.code === 'auth/popup-blocked') {
        setError("Popup blocked! Please allow popups for this site.");
      } else {
        setError("Google Auth failed. Ensure 'Support Email' is set in Firebase.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (err) {
      setError(err.code === 'auth/invalid-credential' ? "Incorrect email or password." : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-box">
        <div className="card-box shadow-lg" style={{ borderRadius: '25px' }}>
          <h3 className="text-center fw-bold mb-4 theme-text-primary">Welcome Back 👋</h3>
          
          {error && <div className="alert alert-danger py-2 small text-center">{error}</div>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="small mb-1 fw-bold theme-text-secondary">Email address</label>
              <input type="email" className="form-control admin-input" required onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-4">
              <label className="small mb-1 fw-bold theme-text-secondary">Password</label>
              <input type="password" className="form-control admin-input" required onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button className="login-btn w-100 py-2 fw-bold" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-3">
            <div className="d-flex align-items-center my-3"><hr className="flex-grow-1" /><span className="mx-2 text-muted small">OR</span><hr className="flex-grow-1" /></div>
            <button type="button" onClick={handleGoogleLogin} className="btn w-100 d-flex align-items-center justify-content-center shadow-sm border py-2" style={{ background: '#fff', fontWeight: 'bold' }}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ width: '18px', marginRight: '10px' }} />
              Continue with Google
            </button>
          </div>

          <p className="text-center mt-4 theme-text-secondary small">
            New user? <Link to="/signup" className="fw-bold text-decoration-none" style={{color: '#0ea5a4'}}>Create account</Link>
          </p>
        </div>
      </div>
    </>
  );
}