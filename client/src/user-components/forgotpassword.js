import React, { useState, useContext } from 'react';
import './assets/css/user-style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RecoveryContext } from "../App";


// export const RecoveryContext = createContext();

const ForgotPassword = () => {
  // const [email, setEmail] = useState();
  // const [otp, setOTP] = useState();
  const navigate = useNavigate();
  const { setEmail, email, otp, setOTP } = useContext(RecoveryContext);


  // backend
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      console.log(OTP);
      console.log(email);
      setOTP(OTP);
      setEmail(email);
      // Send a POST request to your Node.js server to initiate the password reset process
      await axios.post('http://localhost:8000/forgotpass', { OTP, email });
      alert('Email sent successfully.');

      navigate("/resetpass")
    } catch (error) {
      console.error('Axios Error:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        const { status, data } = error.response;

        if (status === 400) {
          if (data.message === 'User not found') {
            alert('User not found. Please check your email address.');
          } else if (data.message === 'Invalid email format') {
            alert('Invalid email format. Please enter a valid email address.');
          } else {
            alert('Bad request. Please check your input and try again.');
          }
        } else {
          alert('Error sending password reset email. Please try again later.');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        alert('No response received. Please try again later.');
      } else {
        // Something happened in setting up the request
        console.error('Error setting up the request:', error.message);
        alert('Error setting up the request. Please try again later.');
      }
    }
  };

  return (
    // <RecoveryContext.Provider
    //   value={{ otp, setOTP, setEmail, email }}
    // >
    <div className="container-fluid forgotpass-background-image">
      <div className="forgotpass-login-container">
        <div className="forgotpass-login-box">
          <h2 className="text-center pb-3 pt-3">Forgot Password</h2>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={handleEmailChange}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
    // </RecoveryContext.Provider>
  );
};

export default ForgotPassword;
