import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChangePassword from './ChangePassword';
import ChangeName from './ChangeName';
import { BrowserRouter } from 'react-router-dom';

const MockChangePassword = () => (
  <BrowserRouter>
    <ChangePassword />
  </BrowserRouter>
);

const MockChangeName = () => (
  <BrowserRouter>
    <ChangeName />
  </BrowserRouter>
);


describe('ChangePassword Component', () => {
  test('renders correctly', () => {
    render(<MockChangePassword />);
    
    expect(screen.getByText('Enter Your New Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter New Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change Password' })).toBeInTheDocument();
  });

  test('displays error messages for invalid input', () => {
    render(<MockChangePassword />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Change Password' }));
    
    expect(screen.getByText('New password is required')).toBeInTheDocument();
    //expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  test('submits form with valid input', async () => {
    render(<MockChangePassword />);
    
    const newPasswordInput = screen.getByPlaceholderText('Enter New Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: 'Change Password' });
    
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword123' } });
    fireEvent.click(submitButton);

  
  });
});


describe('ChangeName Component', () => {
    test('renders correctly', () => {
      render(<MockChangeName />);
      
      expect(screen.getByText('Enter Your New Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter New First Name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter New Last Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });
  
    test('displays error messages for invalid input', () => {
      render(<MockChangeName />);
      
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
      
      expect(screen.getByText('A New First name is required')).toBeInTheDocument();
      //expect(screen.getByText('A New Last name is required')).toBeInTheDocument();
    });
  
    test('submits form with valid input', async () => {
      render(<MockChangeName />);
      
      const newFirstNameInput = screen.getByPlaceholderText('Enter New First Name');
      const newLastNameInput = screen.getByPlaceholderText('Enter New Last Name');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      fireEvent.change(newFirstNameInput, { target: { value: 'John' } });
      fireEvent.change(newLastNameInput, { target: { value: 'Doe' } });
      fireEvent.click(submitButton);
    });
  });