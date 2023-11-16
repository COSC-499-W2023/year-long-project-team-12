import React from 'react';
import { render, screen } from '@testing-library/react';
import Register from './Register';
import { AuthContextProvider } from '../../context/authContext';
import { BrowserRouter } from 'react-router-dom';

const MockRegister = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  </AuthContextProvider>
);

describe('Register Component', () => {
  test('renders Register component', () => {
    render(<MockRegister />);
    const registerElement = screen.queryByText(/Already have an account\? Sign in/i);
    expect(registerElement).toBeInTheDocument();
  });

  test('First Name input starts empty', () => {
    render(<MockRegister />);
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    expect(firstNameInput.value).toBe('');
  });

  test('Last Name input starts empty', () => {
    render(<MockRegister />);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    expect(lastNameInput.value).toBe('');
  });

  test('Email input starts empty', () => {
    render(<MockRegister />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput.value).toBe('');
  });

  test('Username input starts empty', () => {
    render(<MockRegister />);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    expect(usernameInput.value).toBe('');
  });

  test('Password input starts empty', () => {
    render(<MockRegister />);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput.value).toBe('');
  });

  test('Confirm Password input starts empty', () => {
    render(<MockRegister />);
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirm/i);
    expect(confirmPasswordInput.value).toBe('');
  });

});
