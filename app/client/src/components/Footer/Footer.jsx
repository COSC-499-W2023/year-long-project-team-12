import React from 'react';
import "./Footer.scss";


const Footer = () => {
  return (
    <div className='footer'>
        <div className='bottom'> 

            <div className="left">
                <span data-testid="logo" className='logo'>EX-ZBT</span>
                <span data-testid="copyright"  className='copyright'>Copyright 2023. All Rights Reserved</span>
            </div>

            <div className="right">
                <div className="item">
                    <h1>About</h1>
                    <span data-testid="about">
                    The purpose of the software is to provide a video sharing platform specifically designed for job interviews.
                     It allows users to register, create profiles, upload and share videos for job interviews, and receive feedback/hiring decisions based on their video submissions.
                    
                    </span>
                </div>

                <div className="item">
                    <h1>Contact</h1>
                    <span data-testid="contact">
                    The purpose of the software is to provide a video sharing platform specifically designed for job interviews.
                     It allows users to register, create profiles, upload and share videos for job interviews, and receive feedback/hiring decisions based on their video submissions.                    
                    </span>
                </div>
            </div>
            

        </div>
    </div>
  )
}

export default Footer