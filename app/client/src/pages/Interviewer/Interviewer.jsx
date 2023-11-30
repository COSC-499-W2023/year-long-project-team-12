import React, { useState } from 'react';
import './Interviewer.scss';
import { useAuth } from '../../context/authContext';

const Interviewer = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [image, setImage] = useState(null); 

  const handleAddJobPosting = () => {
    
    console.log('Job Posting Added:', {
      jobTitle,
      companyName,
      location,
      jobDescription,
      image,
    });

    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setJobDescription('');
    setImage(null);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  return (
    <div className="interviewer">
      <div className="card">
        <div className="right">
          <h1>Welcome, Interviewer!</h1>
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

            
            <input
              type="file"
              accept="image/*"
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
