import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./style.css";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Updated to useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/login`, { email, password });
      console.log('Login successful:', response.data);
      const userId = response.data.userId;
      // Store the user ID in local storage
      localStorage.setItem('userId', userId);
      // Redirect to the user's groups page
      navigate('/users/:userId/groups');
      // Handle successful login (e.g., redirect, store token)
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  const handleCreateAccount = () => {
    navigate('/signup'); // Updated to use navigate
  };

  return (
      <div className="container">
          <div className="header">
              <div className="text">Login</div>
              <div className="underline"></div>
          </div>
          <form onSubmit={handleSubmit} className="form">
              <div className="inputs">
                  <div className="input">
                      <img src="/mail.png" alt="" />
                      <input
                          type="email"
                          placeholder="Email Id"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className="input">
                      <img src="/5832.jpg" alt="" />
                      <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>
              </div>
              <div className="forgot-password">
                  <span>Forgot password</span>
              </div>
              <div className="submit-container">
                  <button type="submit" className="submit">
                      Login
                  </button>
                  <button
                      type="button"
                      className="submit"
                      onClick={handleCreateAccount}
                  >
                      Create Account
                  </button>
              </div>
          </form>
      </div>
  );
};
