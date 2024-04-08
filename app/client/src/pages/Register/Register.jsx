import React, { useState, useEffect } from 'react';
import './Register.scss';
import { useAuth } from '../../context/authContext.js';
import { useNavigate, Navigate } from 'react-router-dom';

const Register = () => {
  const { register, isCustomerAuthenticated } = useAuth();
  const [userType, setUserType] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  let navigate = useNavigate();

  if (isCustomerAuthenticated()) {
    return <Navigate to="/profile" />;
  }

  const toggleLogin = () => {
    navigate('/profile');
  };

  const validateForm = () => {
    const errors = {};

    if (!firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!password.trim()) {
      errors.password = 'Password is required';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleRegister = async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      try{
        const formData = new FormData(event.target);
        const object = {};

      formData.forEach((value, key) => (object[key] = value));
      const currentUser = JSON.stringify(object);

      register(currentUser).then(resp => {
        navigate('/profile');
      })
      } catch  {

      }
  };

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
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleInputChange(e, setFirstName)}
            />
            {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleInputChange(e, setLastName)}
            />
            {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
            />
            {formErrors.username && <span className="error">{formErrors.username}</span>}

            <div className="user-type">
              <p>Select User Type:</p>
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="User"
                  checked={userType === 'User'}
                  onChange={handleUserTypeChange}
                />
                User
              </label>
              <label>
                <input
                  type="radio"
                  name="userRole"
                  value="Admin"
                  checked={userType === 'Admin'}
                  onChange={handleUserTypeChange}
                />
                Admin
              </label>
            </div>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
            {formErrors.password && <span className="error">{formErrors.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm"
              value={confirmPassword}
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
            />
            {formErrors.confirmPassword && (
              <span className="error">{formErrors.confirmPassword}</span>
            )}

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
