import React, { useState } from 'react';
import './assets/css/user-style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiCheckCircle } from "react-icons/bi";

const Login = () => {
  const [status, setStatus] = useState('active');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const isValidEmail = (email) => emailRegExp.test(email);
  const isValidPassword = (password) => password.length >= 8;


  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (formSubmitted) {
      if (value.trim() === '') {
        setEmailValid('Input Email address');
      } else if (!isValidEmail(value)) {
        setEmailValid('Wrong Credentials');
      } else {
        setEmailValid(true);
      }
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (formSubmitted) {
      if (value.trim() === '') {
        setPasswordValid('Please Input a Password');
      } else if (!isValidPassword(value)) {
        setPasswordValid('Invalid Password (minimum 8 characters)');
      } else {
        setPasswordValid(true);
      }
    }
  };

  async function login(e) {
    e.preventDefault();
    setFormSubmitted(true);

    if (!emailValid || !passwordValid) {
      setEmailValid('Invalid Email');
      setPasswordValid('Invalid Password');
      return;
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
              <div className={`form-group d-flex flex-column ${formSubmitted && emailValid !== true ? 'has-error' : ''}`}>
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  className={`input-field form-control w-100 ${formSubmitted && emailValid !== true ? 'is-invalid' : ''}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                />
                {formSubmitted && emailValid !== true && (
                  <div className="invalid-feedback">
                    <i className="bi bi-exclamation-triangle"></i> {emailValid}
                  </div>
                )}
              </div>

              <div className={`form-group d-flex flex-column ${formSubmitted && passwordValid !== true ? 'has-error' : ''}`}>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className={`input-field form-control w-100 ${formSubmitted && passwordValid !== true ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {formSubmitted && passwordValid !== true && (
                  <div className="invalid-feedback">
                    <i className="bi bi-exclamation-triangle"></i> {passwordValid}
                  </div>
                )}
              </div>


              <button onClick={login}>Login</button>
              <p className="register-link text-center text-dark">
                New user? <a href="registration">Register here</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
