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
                
                <span className='jobTitle'>{post.jobTitle}</span>
                <span className='companyName'>{post.companyName}</span>
                <span className='location'>{post.location}</span>
                </div>
            </div>
        </div>
        <div className='content'>
            <p>{post.description}</p>
            <div className="logo">
              <img  src={post.logo} alt=""/>
            </div>  
        </div>
        <div className='info'>
          <Link to="/upload">
          <button >Apply</button>
          </Link>
        
        </div>
    </div>
    </div>
  )
}

export default Post