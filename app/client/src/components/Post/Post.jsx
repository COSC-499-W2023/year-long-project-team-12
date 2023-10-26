import React from 'react'
import "./post.scss";


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
        <button >Apply</button>
        </div>
    </div>
    </div>
  )
}

export default Post