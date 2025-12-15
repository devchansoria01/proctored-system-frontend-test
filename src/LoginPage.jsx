import React from 'react';
import { Link } from 'react-router-dom'; // 👈 IMPORTANT: We need this to make the link work!
import Navbar from './Navbar';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <div className="container-box">
        <div className="card-box">
          <h3 className="text-center fw-bold mb-3">Welcome Back 👋</h3>

          <form>
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
              <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="login-btn w-100">Login</button>
          </form>

          <p className="text-center mt-4">
            New user? <br/>
            {/* 👇 Fixed the Link here */}
            <Link to="/signup" className="fw-bold" style={{color: 'var(--accent)', textDecoration: 'none'}}>
                Create account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}