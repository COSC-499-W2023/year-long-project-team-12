import React, { useState } from 'react';

import './Login.scss';

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { ...errors };

    // Basic validation checks
    if (formData.emailOrUsername === '') {
      newErrors.emailOrUsername = 'Email or username is required';
    } else {
      newErrors.emailOrUsername = '';
    }

    if (formData.password === '') {
      newErrors.password = 'Password is required';
    } else {
      newErrors.password = '';
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the login form
    if (!newErrors.emailOrUsername && !newErrors.password) {
      // Your login submission logic here
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>EX-ZBT</h1>
          <p>
            The purpose of the software is to provide a video sharing platform specifically designed for job interviews.
            It allows users to register, create profiles, upload and share videos for job interviews, and receive feedback/hiring decisions based on their video submissions.
          </p>
          <button>Register</button>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="emailOrUsername"
              placeholder="Email or username"
              value={formData.emailOrUsername}
              onChange={handleChange}
            />
            <span className="error">{errors.emailOrUsername}</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span className="error">{errors.password}</span>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
