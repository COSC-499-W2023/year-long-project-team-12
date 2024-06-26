import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  test('renders First Name input', () => {
    render(<MockRegister />);
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    expect(firstNameInput).toBeInTheDocument();
  });

  test('renders Last Name input', () => {
    render(<MockRegister />);
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    expect(lastNameInput).toBeInTheDocument();
  });

  test('renders Email input', () => {
    render(<MockRegister />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test('renders Username input', () => {
    render(<MockRegister />);
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test('renders Password input', () => {
    render(<MockRegister />);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test('renders Confirm Password input', () => {
    render(<MockRegister />);
    const confirmPasswordInput = screen.getByPlaceholderText(/Confirm/i);
    expect(confirmPasswordInput).toBeInTheDocument();
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

  test("First Name input should change", () => {
    render(<MockRegister />);
    const firstNameInputEl = screen.getByPlaceholderText(/First Name/i);
    const testValue = "test";

    fireEvent.change(firstNameInputEl, { target: { value: testValue } });
    expect(firstNameInputEl.value).toBe(testValue);
  });

  test("Last Name input should change", () => {
    render(<MockRegister />);
    const lastNameInputEl = screen.getByPlaceholderText(/Last Name/i);
    const testValue = "test";

    fireEvent.change(lastNameInputEl, { target: { value: testValue } });
    expect(lastNameInputEl.value).toBe(testValue);
  });

  test("Email input should change", () => {
    render(<MockRegister />);
    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    const testValue = "test@example.com";

    fireEvent.change(emailInputEl, { target: { value: testValue } });
    expect(emailInputEl.value).toBe(testValue);
  });

  test("Username input should change", () => {
    render(<MockRegister />);
    const usernameInputEl = screen.getByPlaceholderText(/Username/i);
    const testValue = "testuser";

    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });

  test("Password input should change", () => {
    render(<MockRegister />);
    const passwordInputEl = screen.getByPlaceholderText(/Password/i);
    const testValue = "testpassword";

    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

  test("Confirm Password input should change", () => {
    render(<MockRegister />);
    const confirmPasswordInputEl = screen.getByPlaceholderText(/Confirm/i);
    const testValue = "testpassword";

    fireEvent.change(confirmPasswordInputEl, { target: { value: testValue } });
    expect(confirmPasswordInputEl.value).toBe(testValue);
  });

  test('displays error messages for invalid inputs', () => {
    render(<MockRegister />);

    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: '' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm/i), { target: { value: 'mismatch' } });

    fireEvent.submit(screen.getByRole('button', { name: /Register/i }));

    expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    
  });
});
