import React, { useState } from 'react';
import './Interviewer.scss';
import { useAuth } from '../../context/authContext';
import logo from "../../components/Navbar/logo.png";

const Interviewer = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [image, setImage] = useState(null); 

  const handleAddJobPosting = () => {
    
   

    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setJobDescription('');
    setImage(null);

    //unsure of how to proceed with this functino of handling adding the job posting.
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
