{/*  import React from 'react'
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
          <Posts/>
      </div>

    </div>
    
  )
}

export default JobPostings; */}


import React, { useState, useEffect } from 'react';
import Posts from '../../components/Posts/Posts';
import "./jobPostings.scss";

// Example data - replace with your actual data source
const exampleRequests = [
    { id: 1, title: "Frontend Developer", date: "2024-01-02" },
    { id: 2, title: "Backend Developer", date: "2024-01-01" },
    // Add more requests as needed
];

function JobPostings() {
    const [searchTerm, setSearchTerm] = useState("");
    const [requests, setRequests] = useState(exampleRequests);

    useEffect(() => {
        // Assuming requests are sorted by date with the latest first
        // This could be replaced with fetching data from a static file or similar
        setRequests(requests.sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRequests = requests.filter(request =>
        request.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bodyContainer'>
            <div className='searchContainer'>
                <div className='searchBar'>
                    <input 
                        type="text" 
                        placeholder='Search...' 
                        value={searchTerm}
                        onChange={handleSearchChange} 
                    />
                    <button>Search</button>
                </div>
            </div>
            
            <div data-testid="jobPosting" className='jobs'>
                {/* You would need to adjust your Posts component to accept requests as a prop */}
                <Posts requests={filteredRequests} />
            </div>
        </div>
    );
}

export default JobPostings;
