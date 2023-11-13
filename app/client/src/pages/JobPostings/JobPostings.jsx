import React from 'react'
import Posts from '../../components/Posts/Posts'
import "./jobPostings.scss";
function JobPostings() {
  return (
    <div data-testid="jobPosting" className='jobs'>
        <Posts  />
    </div>
  )
}

export default JobPostings;