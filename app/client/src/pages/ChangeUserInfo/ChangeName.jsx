import React from 'react';
import { useState } from "react";
import "./ChangeUserInfo.scss";

function ChangeName() {
    const [newFirstName, setFirstNewName] = useState('');
    const [newLastName, setLastNewName] = useState('');
    const [formErrors, setFormErrors] = useState({});


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
          //await updateProfileName(newName);
         // handleModalClose();
        } catch (error) {
          console.error('Error updating name:', error);
        }
      };
    
     
  return (
  <div className='changeUserInfoContainer'>
    <div >
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
                placeholder="Enter New Last  Name"
                value={newLastName}
                onChange={(e) => setLastNewName(e.target.value)}
            />
      {formErrors.newLastName && <span className="error">{formErrors.newLastName}</span>}
      <button type="submit">Submit</button>
    </form>
    </div>
    </div>
  )
}

export default ChangeName