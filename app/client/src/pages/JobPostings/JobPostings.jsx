import React from 'react'
import Posts from '../../components/Posts/Posts'
import "./jobPostings.scss";
function JobPostings() {
  return (
    <div className='bodyContainer'>
      <div className='searchContainer'>
        <div className='searchBar'>
              <input type="text" placeholder='Search...' className="search" />
              <button>Search</button>
        </div>
      </div>
      
      
      <div data-testid="jobPosting" className='jobs'>    
          <Posts  />
      </div>

    </div>
    
  )
}

export default JobPostings;