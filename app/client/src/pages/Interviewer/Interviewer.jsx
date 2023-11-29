import React from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Interviewer = () => {
  const { isInterviewerAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

 

 

  return (
    <div className="interviewer">
      <h1>Welcome, Interviewer!</h1>
    </div>
  );
};

export default Interviewer;
