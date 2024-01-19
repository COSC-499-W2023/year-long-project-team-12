import React, { useState } from 'react';
import './Admin.scss';
import { useAuth } from '../../context/authContext';
import {saveJobPosting} from '../../services/ClientAPI';
import logo from "../../components/Navbar/logo.png";

const Admin = () => {
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [expirationDate, setExpirationDate] = useState(''); 
  const [image, setImage] = useState(null);
  // const {saveJobPosting} = saveJobPosting();


  const handleAddJobPosting = async (event) => {
    
    // event.preventDefault();
    
    // try {
    //   const formData = new FormData(event.target);
    //   const jobData = {};
  
    //   formData.forEach((value, key) => (jobData[key] = value));
  
    //   const jobDataJson = JSON.stringify(jobData);
    //   console.log(jobDataJson);
  
    
    //   saveJobPosting(jobDataJson).then((resp) => {
       
    //   });
    // } catch (error) {
    //   console.error("Error");
    // }

    setRequestTitle('');
    setRequestDescription('');
    setExpirationDate(''); 
    setImage(null);
  };
  

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="interviewer">
      <div className="card">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="right">
          <h1>Add a Request</h1>
          <form>
            <input
              type="text"
              name="requestTitle"
              placeholder="Request Title"
              value={requestTitle}
              onChange={(e) => setRequestTitle(e.target.value)}
            />

           

  

            <textarea
              name="requestDescription"
              placeholder="Request Description"
              value={requestDescription}
              onChange={(e) => setRequestDescription(e.target.value)}
            ></textarea>

            <label htmlFor="expirationDate">Request Expiration Date:</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

           

            <button type="button" onClick={handleAddJobPosting}>
              Add Request 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
