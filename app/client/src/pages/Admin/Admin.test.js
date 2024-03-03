import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Admin from './Admin';
import { AuthContextProvider } from '../../context/authContext';
import { BrowserRouter } from 'react-router-dom';

const MockAdmin = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Admin />
    </BrowserRouter>
  </AuthContextProvider>
);

describe('Admin Component', () => {
 

  test('Request Title input starts empty', () => {
    render(<MockAdmin />);
    const requestTitleInput = screen.getByPlaceholderText(/Request Title/i);
    expect(requestTitleInput.value).toBe('');
  });



  test('Request Description input starts empty', () => {
    render(<MockAdmin />);
    const requestDescriptionInput = screen.getByPlaceholderText(/Request Description/i);
    expect(requestDescriptionInput.value).toBe('');
  });

  test('Expiration Date input starts empty', () => {
    render(<MockAdmin />);
    const expirationDateInput = screen.getByLabelText(/Request Expiration Date:/i);
    expect(expirationDateInput.value).toBe('');
  });

  test('Request Title input can be changed', () => {
    render(<MockAdmin />);
    const requestTitleInputEl = screen.getByPlaceholderText(/Request Title/i);
    const testValue = "Software Engineer";

    fireEvent.change(requestTitleInputEl, { target: { value: testValue } });
    expect(requestTitleInputEl.value).toBe(testValue);
  });


  test('Request Description input can be changed', () => {
    render(<MockAdmin />);
    const requestDescriptionInputEl = screen.getByPlaceholderText(/Request Description/i);
    const testValue = "Exciting opportunity for software engineers.";

    fireEvent.change(requestDescriptionInputEl, { target: { value: testValue } });
    expect(requestDescriptionInputEl.value).toBe(testValue);
  });

  test('Expiration Date input can be changed', () => {
    render(<MockAdmin />);
    const expirationDateInputEl = screen.getByLabelText(/Request Expiration Date:/i);
    const testValue = "2023-12-31T19:30";

    fireEvent.change(expirationDateInputEl, { target: { value: testValue } });
    expect(expirationDateInputEl.value).toBe(testValue);
  })

});
