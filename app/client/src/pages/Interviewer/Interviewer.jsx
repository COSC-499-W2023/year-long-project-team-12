import React, { useState } from 'react';
import './Interviewer.scss';
import { useAuth } from '../../context/authContext';
import {saveJobPosting} from '../../services/ClientAPI';
import logo from "../../components/Navbar/logo.png";

const Interviewer = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
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

    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setJobDescription('');
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
          <h1>Add a job posting</h1>
          <form>
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <textarea
              name="jobDescription"
              placeholder="Job Description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            ></textarea>

            <label htmlFor="expirationDate">Job Expiration Date:</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

            <label htmlFor="logoUpload">Add your company logo:</label>
            <input
              type="file"
              accept="image/*"
              id="logoUpload"
              name="image"
              onChange={handleImageChange}
            />

            <button type="button" onClick={handleAddJobPosting}>
              Add Job Posting
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Interviewer;
