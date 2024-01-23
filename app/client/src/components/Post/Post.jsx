import React from 'react'
import "./post.scss";
import { Link } from 'react-router-dom';

function Post({post}) {
  return (
    <div className='post'>
        <div className="container">
        <div className='job'>
            <div className='jobInfo'>
                <div className="details">
                
                <span data-testid="jobTitle" className='jobTitle'>{post.jobTitle}</span>
                <span data-testid="companyName" className='companyName'>{post.companyName}</span>
                <span data-testid="location" className='location'>{post.location}</span>
                </div>
            </div>
        </div>
        <div className='content'>
            <p>{post.description}</p>
            <div className="logo">
              <img  src={post.logo} alt="confidential"/>
            </div>  
        </div>
        <div className='info'>
          <Link to="/upload">
          <button >Upload</button>
          </Link>
        </div>
        <div className='info'>
          <Link to="/recording">
          <button >Record</button>
          </Link>
        </div>
    </div>
    </div>
  )
}

export default Post