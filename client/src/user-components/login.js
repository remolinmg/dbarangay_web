import React, { useState } from 'react';
import './assets/css/user-style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiCheckCircle } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  const navigate = useNavigate();

  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const passwordRegExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const isValidEmail = (email) => emailRegExp.test(email);
  const isValidPassword = (password) => passwordRegExp.test(password);
  // const isValidPassword = (password) => password.length >= 8;


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(''); // Clear email validation error

    if (formSubmitted) {
      if (value.trim() === '') {
        setEmailValid('Input Email address');
      } else if (!isValidEmail(value)) {
        setEmailValid('Invalid Email');
      }
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(''); // Clear password validation error

    if (formSubmitted) {
      if (value.trim() === '') {
        setPasswordValid('Please Input a Password');
      } else if (!isValidPassword(value)) {
        setPasswordValid('Invalid Password (minimum 8 characters)');
      }
    }
  };

  async function login(e) {
    e.preventDefault();
    setFormSubmitted(true);

    if (isLockedOut) {
      setEmailValid('Try again after 30 mins');
      return;
    }

    if (!emailValid || !passwordValid) {
      setEmailValid('Wrong Credentials');
      setPasswordValid('Invalid Password');
      setLoginAttempts(loginAttempts + 1);

      if (loginAttempts >= 2) {
        // User has reached 3 failed login attempts, set lockout status
        setIsLockedOut(true);
        setTimeout(() => {
          setIsLockedOut(false);
          setLoginAttempts(0);
        }, 30 * 60 * 1000); // Reset lockout after 30 minutes
      }
      // return;
    }

    try {
      await axios.post("http://localhost:8000/login", {
        email,
        password,
        status: 'active'
      })
        .then(res => {
          if (res.data === "exist") {
            navigate("/");
          } else if (res.data === "notexist") {

          }
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }



  return (
    <div className="container-fluid main">
      <div className="row">
        <div className="col-12 col-md-8 left-side text-light">
          <h2 className="p-5 ps-5">Welcome to Barangay Harapin Ang Bukas</h2>
          <hr />
          <div className="ps-5 pt-1 d-flex flex-column justify-content-center">
            <h4>Sign up now, do everything remotely later</h4>
            <span><BiCheckCircle /> <i>Request documents online</i></span>
            <span><BiCheckCircle /> <i>Keep up with barangay programs</i></span>
            <span><BiCheckCircle /> <i>Discover nearby local shops</i></span>
            <span><BiCheckCircle /> <i>Be prepared against disaster</i></span>
          </div>
        </div>
        <div className="col-12 col-md-4 right-side">
          <div className="login-container">
            <h2>LOGIN</h2>
            <form>
              <div className={`form-group d-flex flex-column ${formSubmitted && emailValid !== '' ? 'has-error' : ''}`}>
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`input-field form-control w-100 ${formSubmitted && emailValid !== '' ? 'is-invalid' : ''}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {formSubmitted && emailValid !== '' && (
                  <div className="error-message">
                    <i className="bi bi-exclamation-triangle"></i> {emailValid}
                  </div>
                )}
              </div>

              <div className={`form-group d-flex flex-column ${formSubmitted && passwordValid !== '' ? 'has-error' : ''}`}>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className={`input-field form-control w-100 ${formSubmitted && passwordValid !== '' ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {formSubmitted && passwordValid !== '' && (
                  <div className="error-message">
                    <i className="bi bi-exclamation-triangle"></i> {passwordValid}
                  </div>
                )}
              </div>

              <button
                onClick={login}
                disabled={isLockedOut}
              >
                Login
              </button>
              <p className="register-link text-center text-dark">
                New user? <a href="registration">Register here</a>
              </p>
              <p className="register-link text-center text-dark">
                <a href="registration">Forgot Password</a>
              </p>
              {isLockedOut && (
                <div className="error-message">
                  <i className="bi bi-exclamation-triangle"></i> Try again after 30 mins
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </div>




  );
};
export default Login;
