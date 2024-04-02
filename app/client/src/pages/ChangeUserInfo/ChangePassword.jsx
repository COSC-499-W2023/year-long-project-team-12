import React from 'react';
import "./ChangeUserInfo.scss";
import { useState } from "react";


const ChangePassword = () =>  {
  
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});


  
    
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
         // await updatePassword(newPassword);
        } catch (error) {
          console.error('Error updating password:', error);
        }
      };
  return (

    <div className='changeUserInfoContainer'>

      <div className='changeUserInfoMain'>  
      <div>
      <h2>Enter Your New Password</h2>
      </div>
    
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
  )
}

export default ChangePassword;