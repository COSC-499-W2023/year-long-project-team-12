import React from 'react'
import "./Comments.scss";
function Comments() {
  return (
    <div className='comments-main'>
        <div className='comments-flexbox'>
            <h3 data-testid="header">Comments</h3>
            <textarea data-testid="textArea"/>
            <button data-testid="submitButton">Submit</button>
        </div>
       
    </div>
  )
}

export default Comments