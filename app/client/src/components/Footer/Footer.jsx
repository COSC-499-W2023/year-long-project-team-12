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
                    Our team is dedicated to providing you with an exceptional experience. If you have questions or need assistance, our support team is always on standby. We ensure that every user gets the guidance they need to navigate our platform with ease. Your success is our priority, and we are here to support you every step of the way in your journey towards landing your ideal job.
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer