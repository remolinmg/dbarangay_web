import React, { useState } from 'react';
import './assets/css/style.css';
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [, setCookie] = useCookies(['access_token']);

  async function login(e){
    e.preventDefault();

    try{
        const response = await axios.post("https://dbarangay.onrender.com/adminlogin",{
            email,password
        })
        if (response.status===201) {
          const result = response.data.token
          setCookie('access_token', result);
          window.localStorage.setItem('accountType',  response.data.type);
          navigate("/dashboard")
            }
            else{
                alert("Login Failed!")
            }
    }
    catch(e){
    }
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
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {setEmail(e.target.value)}}
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={login}>
              Submit
            </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;