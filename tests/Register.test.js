import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Register from '../app/client/src/pages/Register/Register'; 

describe('Register Component', () => {
  it('displays error messages for empty fields', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

    const registerButton = getByText('Register');
    fireEvent.click(registerButton);


    expect(getByText('First Name is required')).toBeInTheDocument();
    expect(getByText('Last Name is required')).toBeInTheDocument();
    expect(getByText('Username is required')).toBeInTheDocument();
    expect(getByText('Email is required')).toBeInTheDocument();
    expect(getByText('Password is required')).toBeInTheDocument();
    expect(getByText('Confirm Password is required')).toBeInTheDocument();
  });

  it('displays an error message for an invalid email format', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);

   
    const emailInput = getByPlaceholderText('Email');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

   
    const registerButton = getByText('Register');
    fireEvent.click(registerButton);

   
    expect(getByText('Invalid email format')).toBeInTheDocument();
  });

  it('displays an error message when passwords do not match', () => {
    const { getByText, getByPlaceholderText } = render(<Register />);


    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');

  
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'mismatched' } });

    const registerButton = getByText('Register');
    fireEvent.click(registerButton);

    expect(getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('displays an error message for special symbols in First Name and Last Name', () => {
    const { getByText, getByPlaceholderText } = render(<Register/>);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');

    fireEvent.change(firstNameInput, { target: { value: 'John@' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe$' } });

    const registerButton = getByText('Register');
    fireEvent.click(registerButton);

    expect(getByText('First Name cannot contain special symbols')).toBeInTheDocument();
    expect(getByText('Last Name cannot contain special symbols')).toBeInTheDocument();
  });

  it('successfully submits the form when all data is valid', () => {
    const { getByPlaceholderText } = render(<Register />);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');
    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const userTypeInput = document.querySelector('input[name="userType"]');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(usernameInput, { target: { value: 'johndoe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(userTypeInput);

   
    const registerButton = getByText('Register');
    fireEvent.click(registerButton);
  });
});
