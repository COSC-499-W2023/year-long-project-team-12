import React, { useState } from 'react';
import './Register.scss';
import {useAuth} from '../../context/authContext.js';
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { saveCurrentUser } from "../../services/ClientAPI";

const Register = () => {

  const {currentUser, setCurrentUserFromToken, isCustomerAuthenticated} = useAuth();
  const [userType, setUserType] = useState('interviewee'); // Default to 'interviewee'
  const [username, setUsername] = useState('');
  let navigate = useNavigate();


  if(isCustomerAuthenticated()){
    return <Navigate to="/jobs"/>
  }

  const toggleLogin = () => {
     navigate("/login")
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault()
    const object= {}
    const formData = new FormData(event.target)
    formData.forEach((value, key) => object[key] = value);
    const currentUser = JSON.stringify(object)
    let token;
    saveCurrentUser(currentUser).then(resp => {
      token = resp.headers["authorization"];
      localStorage.setItem("access_token", token)
      setCurrentUserFromToken()
      navigate("/jobs");
      console.log(token)
    }).catch(err => {
        console.log(err);
    })
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>EX-ZBT</h1>
          <button onClick={toggleLogin}>Already have an account? Sign in</button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input type="text" name = "firstName" placeholder="First Name" />
            <input type="text" name = "lastName" placeholder="Last Name" />
            <input type="text" name = "email" placeholder="Email" />

            <input
                type="text"
                name = "username"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
            />

            <div className="user-type">
              <p>Select User Type:</p>
              <label>
                <input
                    type="radio"
                    value="interviewee"
                    checked={userType === 'interviewee'}
                    onChange={handleUserTypeChange}
                />
                Interviewee
              </label>
              <label>
                <input
                    type="radio"
                    value="interviewer"
                    checked={userType === 'interviewer'}
                    onChange={handleUserTypeChange}
                />
                Interviewer
              </label>
            </div>

            <input type="password" placeholder="Password" />
            <input type="password" name = "password" placeholder="Confirm Password" />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
