import React from 'react'
import "./JobsAppliedTo.scss";

function JobsAppliedTo({jobs}) {
  return (
    
      <div className="work">
          <div className="primary">
          <div className="logo">
              <img data-testid="jobLogo" src={jobs.logo} alt="confidential"/>
            </div> 
              <h2 data-testid="jobTitle">{jobs.jobTitle}</h2>
              <span data-testid="jobCompanyName">{jobs.companyName}</span>
              <span data-testid="jobLocation">{jobs.location}</span>
              <p>{jobs.description}</p>
          </div>
    </div>
    
    
  )
}

export default JobsAppliedTo;