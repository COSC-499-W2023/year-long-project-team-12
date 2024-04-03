import React, { useRef } from 'react';
import "./ContactUs.scss";
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    var Name = document.getElementById('name');
    var email = document.getElementById('email');
    var msg = document.getElementById('msg');
    const success = document.getElementById('success');
    const danger = document.getElementById('danger');


    if(Name.value === '' || email.value === '' || msg.value === ''){
        danger.style.display = 'block';
    }
    else{
        setTimeout(() => {
            Name.value = '';
            email.value = '';
            msg.value = '';
        }, 2000);
        emailjs
      .sendForm('service_7d1h1b7', 'template_ghyn6vm', form.current, {
        publicKey: 'wTpL4bKtsHmQMpnVa',
      })
      .then(
        () => {
          //console.log('SUCCESS!');
        },
        (error) => {
          //console.log('FAILED...', error.text);
        },
      );
        success.style.display = 'block';

    }


    setTimeout(() => {
        danger.style.display = 'none';
        success.style.display = 'none';
    }, 4000);

    
  };

  return (
    <div className='contactUsContainer'>
       
        <form ref={form} onSubmit={sendEmail} className='contactUsForm'>
        <h2 className='formHeader'>Feedback Form</h2>
        <div className='formField'>
            <label>Name</label>
            <input data-testid="name" id='name' type="text" name="from_name" />
        </div>

      <div className='formField'>
        <label>Email</label>
        <input id='email' data-testid="email" type="email" name="from_email" />
      </div>

      <div className='formField'>
        <label>Message</label>
        <textarea id='msg' data-testid="msg" name="message" />
      </div>
      
      <div className='sendButtonContainer'>
        <input className='sendButton' type="submit" value="Send" />
      </div>

      <div className='message'>
            <div className='success' id='success'>Your message has been successfully sent! Our developers will reach out to you soon.</div>
            <div className='danger' id='danger'>Fields Cant be Empty!</div>
      </div>
      
    </form>

    </div>
    
  );
};