import React, { useState, useContext } from 'react';
import './assets/css/user-style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from "../App";

const ForgotPassword = () => {
  const { email } = useContext(RecoveryContext);
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);

  async function changePass(e) {
    e.preventDefault();

    if (password.trim() === '') {
      setPasswordValid(false);
      return;
    }

    if (!isPasswordValid(password)) {
      setPasswordValid(false);
      alert("Password must meet the required pattern.");
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordValid(false);
      return;
    }

    try {

      await axios.put("https://dbarangay.onrender.com/updatepass", {
        email,
        password
      });
      alert("Password Updated Successfully")
      navigate("/login");
    }
    catch (e) {
      console.log(e);
    }
  }

  //PASSWORD VALIDATION----------------------------------------------------
  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);

  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(isPasswordValid(value));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmPasswordValid(value === password);
  };



  return (
    <div className="container-fluid forgotpass-background-image">
      <div className="forgotpass-login-container">
        <div className="forgotpass-login-box">
          <h2 className="text-center pb-3 pt-3">New Password</h2>
          {/* Password */}
          <div className={`form-group pb-3 d-flex flex-column ${!passwordValid ? 'has-error' : ''}`}>
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className={`input-field form-control ${!passwordValid ? 'is-invalid' : ''}`}
              id="password"
              onChange={handlePasswordChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className={`form-group d-flex flex-column ${!confirmPasswordValid ? 'has-error' : ''}`}>
            <label className="label" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              type="password"
              className={`input-field form-control ${!confirmPasswordValid ? 'is-invalid' : ''}`}
              id="cpassword"
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>

          <div className="text-center pt-3 pb-3">
            <button type="submit" className="btn btn-primary"
              onClick={changePass}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
