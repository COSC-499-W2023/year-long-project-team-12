import React, { useState } from 'react';
import './Register.scss';
import Login from '../Login/Login';

const Register = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [userType, setUserType] = useState('interviewee'); // Default to 'interviewee'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Basic validation to check for special symbols in first and last names
    const specialSymbols = /[^A-Za-z\s-]/; // This regex allows letters, spaces, and hyphens

    if (name === 'firstName' || name === 'lastName') {
      if (specialSymbols.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Name should not contain special symbols',
        });
      } else {
        setErrors({
          ...errors,
          [name]: '',
        });
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { ...errors };

    // Basic validation checks
    if (formData.firstName === '') {
      newErrors.firstName = 'First Name is required';
    }

    if (formData.lastName === '') {
      newErrors.lastName = 'Last Name is required';
    }

    if (formData.email === '') {
      newErrors.email = 'Email is required';
    } else if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.username === '') {
      newErrors.username = 'Username is required';
    }

    if (formData.password === '') {
      newErrors.password = 'Password is required';
    }

    if (formData.confirmPassword === '') {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the registration form
    if (
      !newErrors.firstName &&
      !newErrors.lastName &&
      !newErrors.email &&
      !newErrors.username &&
      !newErrors.password &&
      !newErrors.confirmPassword
    ) {
      // Your registration submission logic here
    }
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
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <span className="error">{errors.firstName}</span>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <span className="error">{errors.lastName}</span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <span className="error">{errors.username}</span>
              <div className="user-type">
                <p>Select User Type:</p>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="interviewee"
                    checked={userType === 'interviewee'}
                    onChange={handleUserTypeChange}
                  />
                  Interviewee
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="interviewer"
                    checked={userType === 'interviewer'}
                    onChange={handleUserTypeChange}
                  />
                  Interviewer
                </label>
              </div>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="error">{errors.password}</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span className="error">{errors.confirmPassword}</span>
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
