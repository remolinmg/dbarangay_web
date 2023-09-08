import React, { useState } from 'react';
import './assets/css/user-style.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiCheckCircle } from "react-icons/bi";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    Axios.post('http://localhost:3001/api/loginuser', {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        alert("Account does not exist");

      } else {
        navigate('/');
      }
    });
  };

  return (
    // <div className="login-component">
    //   <div className="login-message w-50 h-100 bg-light">
    //     <row>
    //       <span>Welcome to Barangay Harapin Ang Bukas</span>
    //     </row>
    //   </div>
    //   <div className="w-50 p-3">
    //     <div className="login-container">
    //       <h2>LOGIN</h2>
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         onChange={(e) => { setUsername(e.target.value) }}
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         onChange={(e) => { setPassword(e.target.value) }}
    //       />
    //       <button onClick={login}>Login</button>
    //       <p className="register-link">
    //         New user? <a href="registration">Register here</a>
    //       </p>
    //     </div>
    //   </div>
    // </div>
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
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => { setUsername(e.target.value) }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <button onClick={login}>Login</button>
            <p className="register-link text-center text-dark">
              New user? <a href="registration">Register here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;