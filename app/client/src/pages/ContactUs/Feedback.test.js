import React from 'react';
import {render,screen, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { ContactUs } from './ContactUs';

describe('ContactUs component', () => {
  test('renders form fields and submit button', () => {
    const { getByText } = render(<ContactUs />);
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
    const { getByText } = render(<ContactUs />);
    const sendButton = getByText('Send');

    fireEvent.click(sendButton);

    const errorMessage = getByText('Fields Cant be Empty!');
    expect(errorMessage).toBeInTheDocument();
  });

  test('displays success message if form is submitted with valid data', () => {
    const {  getByText } = render(<ContactUs />);
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
