import React, { useState } from 'react';
import './assets/css/style.css';
import Axios from "axios";
import {useNavigate } from 'react-router-dom';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate =useNavigate();
  

  const login = () =>{
    Axios.post('http://localhost:3001/api/loginadmin',{
      email:email,
      password:password,
    }).then((response)=>{
      if(response.data.message){
        alert("Account does not exist");

      }else{
       navigate('/dashboard');
      }
    });
};

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