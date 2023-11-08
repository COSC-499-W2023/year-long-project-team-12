import React, { useState } from 'react';
import './Register.scss';
import { useAuth } from '../../context/authContext.js';
import { useNavigate } from 'react-router-dom';
import { saveCurrentUser } from '../../services/ClientAPI';
import { useEffect } from 'react';

const Register = () => {
  const {currentUser, setCurrentUserFromToken } = useAuth();
  const [userType, setUserType] = useState('interviewee');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const toggleLogin = () => {
    navigate('/login');
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrors({ ...errors, username: '' });
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    setErrors({ ...errors, firstName: '' });
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    setErrors({ ...errors, lastName: '' });
  };

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    setErrors({ ...errors, email: '' });

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(enteredEmail)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email address' }));
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors({ ...errors, confirmPassword: '' });
  };

  const handleRegister = (event) => {
    event.preventDefault();

    // Reset error state
    setErrors({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    // Error validation
    let valid = true;

    if (!username) {
      setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is required' }));
      valid = false;
    }

    if (!firstName) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: 'First Name is required' }));
      valid = false;
    }

    if (!lastName) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Last Name is required' }));
      valid = false;
    }

    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      valid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      valid = false;
    }

    if (!confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Confirm Password is required' }));
      valid = false;
    }

    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
      valid = false;
    }

    if (valid) {
      // If all validations pass, proceed with registration
      const object = {
        username,
        firstName,
        lastName,
        email,
        password,
        userType,
      };
      const currentUser = JSON.stringify(object);
      let token;
      saveCurrentUser(currentUser)
        .then((resp) => {
          token = resp.headers['authorization'];
          localStorage.setItem('access_token', token);
          setCurrentUserFromToken();
          navigate('/jobs');
          console.log(token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>EX-ZBT</h1>
          <button onClick={toggleLogin}>
            Already have an account? Sign in
          </button>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleFirstNameChange}
              style={{
                borderColor: errors.firstName ? 'red' : 'lightgray',
              }}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleLastNameChange}
              style={{
                borderColor: errors.lastName ? 'red' : 'lightgray',
              }}
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleEmailChange}
              style={{
                borderColor: errors.email ? 'red' : 'lightgray',
              }}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              style={{
                borderColor: errors.username ? 'red' : 'lightgray',
              }}
            />
            {errors.username && <p className="error">{errors.username}</p>}
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
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              style={{
                borderColor: errors.password ? 'red' : 'lightgray',
              }}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              style={{
                borderColor: errors.confirmPassword ? 'red' : 'lightgray',
              }}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
