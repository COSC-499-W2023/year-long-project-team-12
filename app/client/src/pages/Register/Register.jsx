import React, { useState } from 'react';
import './Register.scss';
import Login from '../Login/Login';

const Register = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState('interviewee'); // Default to 'interviewee'
  const [username, setUsername] = useState('');

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <div className="register">
      {showLogin ? (
        <Login />
      ) : (
        <div className="card">
          <div className="left">
            <h1>EX-ZBT</h1>
            <button onClick={toggleLogin}>Already have an account? Sign in</button>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form>
              <input type="text" placeholder="Full Name" />
              <input type="text" placeholder="Email" />
              
              <input
                type="text"
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
              <input type="password" placeholder="Confirm Password" />

              <button>Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
