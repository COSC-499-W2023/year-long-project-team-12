import React from 'react';
import "./Footer.scss";




const Footer = () => {

    const emailAddress = 'exzbt@exzbt.com';
    
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
                   <p>Where sending and receiving video requests is as simple as it gets. Our platform prioritizes your privacy with end-to-end encryption and facial blurring technology, ensuring your security every step of the way. Experience the ease and peace of mind knowing that your interactions are safeguarded while maintaining the utmost simplicity.
                    </p> 
                    
                    </span>
                </div>

                <div className="item">
                    <h1>Contact</h1>
                    <span data-testid="contact">
                    <p>
                        Have questions or feedback? Feel free to email us at{' '}
                        <a href={`mailto:${emailAddress}`}>{emailAddress}</a>. We value your input and strive to improve our experience constantly.
                    </p>
                                 
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer