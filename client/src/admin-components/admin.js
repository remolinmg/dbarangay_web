import React, { useState } from 'react';
import './assets/css/style.css';
import axios from "axios";
import {useNavigate } from 'react-router-dom';


const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type,setType] = useState('admin');
  const navigate = useNavigate();
  async function login(e){
    e.preventDefault();

    try{
        await axios.post("http://localhost:8000/adminlogin",{
            email,password,type
        })
        .then(res=>{
            if(res.data=="exist"){
              navigate("/dashboard")
            }
            else if(res.data=="notexist"){
                alert("Login Failed!")
            }
        })
        .catch(e=>{
            alert("Login Failed!")
            console.log(e);
        })

    }
    catch(e){
        console.log(e);

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