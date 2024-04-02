import React, { useState } from 'react';
import './Admin.scss';
import { useAuth } from '../../context/authContext';
import {saveRequest, getUserByEmail} from '../../services/ClientAPI';
import logo from "../../components/Navbar/logo.png";
import {useNavigate} from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

const Admin = () => {
  let navigate = useNavigate();
  const {currentUser} = useAuth();
  const [title, setRequestTitle] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [userFound, setUserFound] = useState(false);
  const [description, setRequestDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [findUserMessage, setMessage] = useState('');

  const handleSubmitRequest = async (event) => {
    event.preventDefault();

    if (userFound) {
      try {
        userDetails.map(user => {
          const requestData = new FormData();
          requestData.append("title", title)
          requestData.append("description", description)
          requestData.append("assigneeEmail", user.email)
          requestData.append("created", new Date().toISOString())
          requestData.append("creatorId", currentUser.userId)
          requestData.append("expiration", new Date(expirationDate).toISOString())
          
          const object = {};
          requestData.forEach((value, key) => (object[key] = value));
          const requestDataObject = JSON.stringify(object);
    
          saveRequest(requestDataObject).then(resp => {
            navigate('/jobs');
          })
        })
      } catch  {
  
      }
    }
    
  };

  const handleFindUser = async (email) => {
    if(emailSearch!=='') {
      await getUserByEmail(email).then(resp => {
        setUserDetails([
          ...userDetails,
          { firstName: resp.data.firstName, 
            lastName: resp.data.lastName, 
            userId: resp.data.userId,
            email: resp.data.email,
            role: resp.data.userRole
          }
        ]);
        setUserFound(true);
        setEmailSearch('');
        setMessage('');
        
      }).catch(error => {
        setUserFound(false);
        setMessage("User does not exist! Please ensure e-mail address is correct!");
      })
    }
  }

  const handleOnChange = (value) => {
    setMessage('');
    setEmailSearch(value);
  }

  const removeUser = (userIdToRemove) => {
    let updatedUserDetails = userDetails.filter(user => user.userId !== userIdToRemove);
    setUserDetails(updatedUserDetails);
  }

  return (
    <div className="adminUser">
      <div className="card">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="right">
          <h1>Create Request</h1>
          <form onSubmit={handleSubmitRequest}>
            <input
              type="text"
              name="title"
              placeholder="Request Title"
              value={title}
              onChange={(e) => setRequestTitle(e.target.value)}
            />

            <input
                type="text"
                name="Assignee"
                className='emailBox'
                value={emailSearch}
                placeholder="Assign to: (Email Address)"
                onChange={(e) => handleOnChange(e.target.value)}
                onBlur={(e) => handleFindUser(e.target.value)}
            />

            {(() => {
              if(userDetails.length!==0 && findUserMessage==='') {
                return (
                  <div className='recipients'>
                          {userDetails.map(user => (
                            <div className='userBox'>
                              {user.lastName}, {user.firstName}
                              <CloseIcon className='close' onClick={() => removeUser(user.userId)}/>
                            </div>
                        ))}
                  </div>
                )
              }else if (findUserMessage!=='' && emailSearch!==''){
                return (
                  <div className='errorUser'>
                      <span className='findUserWarning'>
                        {findUserMessage}
                      </span>
                      <div className='recipients'>
                          {userDetails.map(user => (
                            <div className='userBox'>
                              {user.lastName}, {user.firstName}
                              <CloseIcon className='close' onClick={() => removeUser(user.userId)}/>
                            </div>  
                        ))}
                      </div>
                      
                  </div>
                )
              }else {

              }
            })()}
            
            <textarea
              name="requestDescription"
              placeholder="Request Description"
              value={description}
              onChange={(e) => setRequestDescription(e.target.value)}
            ></textarea>

            <label htmlFor="expirationDate">Request Expiration Date:</label>
            <input
              type="datetime-local"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

            <button type="submit">
              Save 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
