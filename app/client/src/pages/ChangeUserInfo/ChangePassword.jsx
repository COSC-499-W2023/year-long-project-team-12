import React from 'react';
import "./ChangeUserInfo.scss";
import { useState } from "react";
import { useAuth } from '../../context/authContext';
import {useNavigate} from "react-router-dom";
import {updateUser} from "../../services/ClientAPI";

const ChangePassword = () =>  {  
  let navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const {currentUser, logOut} = useAuth();
    
      const handleChangePassword = async (e) => {
        e.preventDefault();
        if (!newPassword.trim()) {
          setFormErrors({ newPassword: 'New password is required' });
          return;
        }
        if (newPassword !== confirmPassword) {
          setFormErrors({ confirmPassword: 'Passwords do not match' });
          return;
        }
        try {
          const userData = new FormData();
          userData.append("firstName", currentUser.firstname);
          userData.append("lastName", currentUser.lastname);
          userData.append("password", newPassword);

          updateUser(currentUser.userId, userData).then(resp => {
            logOut();
            navigate('/login');
          }); 
        } catch (error) {
          console.error('Error updating password:', error);
        }
      };
  return (

    <div className='changeUserInfoContainer'>
      <div className='formContainer'>
        <div>
        <h2>Enter Your New Password</h2>
        </div>
      <div className='changeUserInfoMain'>  
        {<form onSubmit={handleChangePassword}>
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {formErrors.newPassword && <span className="error">{formErrors.newPassword}</span>}
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
              <button type="submit">Change Password</button>
          </form> }
      </div>
      </div>
      
    </div>
  )
}

export default ChangePassword;