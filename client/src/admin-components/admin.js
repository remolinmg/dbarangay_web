import React, { useState } from 'react';
import './assets/css/style.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lastFailedAttempt, setLastFailedAttempt] = useState(null);
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['access_token']);

  async function login(e) {
    e.preventDefault();
    setEmailValid('');
    setPasswordValid('');

    if (loginAttempts >= 3 && lastFailedAttempt && (Date.now() - lastFailedAttempt) < 30 * 60 * 1000) {
      setEmailValid('Try again after 30 minutes');
      return;
    }

    try {
      const response = await axios.post("https://dbarangay.onrender.com/adminlogin", {
        email, password
      });

      if (response.status === 201) {
        setCookie('access_token', response.data.token);
        window.localStorage.setItem('accountType', response.data.type);
        setLoginAttempts(0); // Reset login attempts on successful login
        navigate("/dashboard3");
      } else {
        setEmailValid('Invalid data');
        setPasswordValid('Invalid data');
        setLoginAttempts(loginAttempts + 1);
        setLastFailedAttempt(Date.now());
      }
    } catch (error) {
      setEmailValid('Invalid data');
      setPasswordValid('Invalid data');
      setLoginAttempts(loginAttempts + 1);
      setLastFailedAttempt(Date.now());
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className="admin-background-image">
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2>Admin Login</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${emailValid ? 'is-invalid' : ''}`}
              id="exampleInputEmail1"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {emailValid && (
              <div className="invalid-feedback">{emailValid}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${passwordValid ? 'is-invalid' : ''}`}
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {passwordValid && (
              <div className="invalid-feedback">{passwordValid}</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary" onClick={login} disabled={loginAttempts >= 3 && lastFailedAttempt && (Date.now() - lastFailedAttempt) < 30 * 60 * 1000}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
