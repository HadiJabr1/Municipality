// src/components/admin/AdminLoginForm.jsx
import React, { useState } from 'react';
import './AdminLoginForm.css';
import { useNavigate } from 'react-router-dom';
import image13 from '../../assets/images/image13.jpg';

function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this logic with real authentication later
    if (email === 'admin@barelias.com' && password === 'admin123') {
      navigate('/admin/dashboard'); // This will now work with the updated routing
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-logo">
          <img 
            src={image13} 
            alt="Municipality Logo" 
            className="municipality-logo"
          />
        </div>
        <h2>Municipality of Barelias</h2>
        <h3>Log in</h3>
        <form onSubmit={handleSubmit}>
          <label>Your email</label>
          <input
            type="email"
            placeholder="admin@barelias.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Your password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Log in</button>
        </form>
        <a href="#">Forgot your password?</a>
      </div>
    </div>
  );
}

export default AdminLoginForm;