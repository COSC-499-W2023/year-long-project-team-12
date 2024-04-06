import React, { useRef } from 'react';
import {render,screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import emailjs from '@emailjs/browser';


const Mocktest =()=>{
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
      .sendForm("publicKey", "templateId", form.current, {
        publicKey: "HAHAGOTYA!",
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
  

  return(
    <div className='contactUsContainer'>
       
    <form ref={form} onSubmit={sendEmail} className='contactUsForm'>
    <h1 className='formHeader'>Feedback Form</h1>
    <div className='formField'>
        <label>Name</label>
        <input data-testid="name" id='name' type="text" name="from_name" />
    </div>

  <div className='formField'>
    <label>Email</label>
    <input id='email' data-testid="email" type="email" name="from_email" />
  </div>

  <div className='formField' id="msg">
    <label>Message</label>
    <textarea id='msg' data-testid="msg" name="message" />
  </div>
  
  <div className='sendButtonContainer'>
    <input className='sendButton' type="submit" value="Send" />
  </div>

  <div className='message' >
        <div className='success' id='success'>Your message has been successfully sent! Our developers will reach out to you soon.</div>
        <div className='danger' id='danger'>Fields Cant be Empty!</div>
  </div>
  
</form>

</div>
  )
};
describe('ContactUs component', () => {
  test('renders form fields and submit button', () => {
    const { getByText } = render(<Mocktest />);
    const nameInput = screen.getByTestId(/name/i)
    const emailInput = screen.getByTestId(/email/i)
    const messageInput = screen.getByTestId(/msg/i)
    const sendButton = getByText('Send');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test('displays error message if form fields are empty on submit', () => {
    const { getByText } = render(<Mocktest />);
    const sendButton = getByText('Send');

    fireEvent.click(sendButton);

    const errorMessage = getByText('Fields Cant be Empty!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays success message if form is submitted with valid data', () => {
    const { getByText } = render(<Mocktest />);
    const nameInput = screen.getByTestId(/name/i)
    const emailInput =screen.getByTestId(/email/i)
    const messageInput = screen.getByTestId(/msg/i)
    const sendButton = getByText('Send');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    const successMessage = getByText('Your message has been successfully sent! Our developers will reach out to you soon.');
    expect(successMessage).toBeInTheDocument();
  });
});
