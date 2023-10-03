import React, { useState } from 'react';
import './assets/css/user-style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiCheckCircle } from "react-icons/bi";

const Login = () => {
  const [status, setStatus] = useState('active');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(value.trim() !== '');
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordValid(value.trim() !== '');
  };

  async function login(e) {
    e.preventDefault();

    if (!emailValid || !passwordValid) {
      return; // Don't proceed with login if email or password is invalid
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
            alert("Login Failed!");
          }
        })
        .catch(e => {
          alert("Login Failed!");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function login(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/login", {
        email, password, status
      })
        .then(res => {
          if (res.data == "exist") {
            navigate("/")
          }
          else if (res.data == "notexist") {
            alert("Login Failed!")
          }
        })
        .catch(e => {
          alert("Login Failed!")
          console.log(e);
        })

    }
    catch (e) {
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
            <form action="POST">
              <div className={`form-group d-flex flex-column ${!emailValid ? 'has-error' : ''}`}>
                <label className="label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className={`input-field form-control ${!emailValid ? 'is-invalid' : ''}`}
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {!emailValid && (
                  <div className="invalid-feedback">
                    <i className="bi bi-exclamation-triangle"></i> invalid Email address.
                  </div>
                )}
              </div>

              <div className={`form-group d-flex flex-column ${!passwordValid ? 'has-error' : ''}`}>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  className={`input-field form-control ${!passwordValid ? 'is-invalid' : ''}`}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                {!passwordValid && (
                  <div className="invalid-feedback">
                    <i className="bi bi-exclamation-triangle"></i> Invalid Wrong Password
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