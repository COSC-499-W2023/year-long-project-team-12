import React from 'react';
import { useState } from "react";
import "./ChangeUserInfo.scss";
import { useAuth } from '../../context/authContext';
import {useNavigate} from "react-router-dom";
import {updateUser} from "../../services/ClientAPI";

function ChangeName() {
    let navigate = useNavigate();
    const [newFirstName, setFirstNewName] = useState('');
    const [newLastName, setLastNewName] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const {currentUser, updateContextCurrentUser} = useAuth();

    const handleChangeName = async (e) => {
        e.preventDefault();
        if (!newFirstName.trim()) {
          setFormErrors({ newFirstName: 'A New First name is required' });
          return;
        }
        else if(!newLastName.trim()){
            setFormErrors({newLastName:"A New Last name is required "})
        }
        try {
          const userData = new FormData();
          userData.append("firstName", newFirstName);
          userData.append("lastName", newLastName);

          updateUser(currentUser.userId, userData).then(resp => {
            updateContextCurrentUser(resp.data);
            navigate('/profile');
          }); 
          
        } catch (error) {
          console.error('Error updating name:', error);
        }
      };
    
     
  return (
  <div className='changeUserInfoContainer'>
    <div className='formContainer'>
    <div>
      <h2>Enter Your New Name</h2>
    </div>
    <div className='changeUserInfoMain'>
        
        <form onSubmit={handleChangeName}>
            <input
                type="text"
                placeholder="Enter New First Name"
                value={newFirstName}
                onChange={(e) => setFirstNewName(e.target.value)}
            />
            {formErrors.newFirstName && <span className="error">{formErrors.newFirstName}</span>}
            <input
                type="text"
                placeholder="Enter New Last Name"
                value={newLastName}
                onChange={(e) => setLastNewName(e.target.value)}
            />
      {formErrors.newLastName && <span className="error">{formErrors.newLastName}</span>}
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  </div>
  )
}

export default ChangeName