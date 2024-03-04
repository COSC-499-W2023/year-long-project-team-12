import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Edit from './EditRequest';
import { AuthContextProvider } from '../../context/authContext';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../context/authContext', () => ({
  useAuth: () => ({
    currentUser: { role: 'ADMIN' },
    currentRequest: {
      title: 'MockTitle', 
      description: 'MockDescription', 
      expiration: '05 October 2011 14:48 UTC' 
    }
  })  
}));

jest.spyOn(require('../../services/ClientAPI'), 'getUserById').mockResolvedValue({
  data: { lastName: 'LastName', firstName: 'FirstName' },
});

const MockEdit = () => (
    <BrowserRouter>
      <Edit />
    </BrowserRouter>
);

describe('Edit Request Component', () => {
  test('Request Title input has former content', () => {
    render(<MockEdit />);
    const requestTitleInput = screen.getByPlaceholderText(/Request Title/i);
    expect(requestTitleInput.value).toBe('MockTitle');
  });


  test('Request Description has former content', () => {
    render(<MockEdit />);
    const requestDescriptionInput = screen.getByPlaceholderText(/Request Description/i);
    expect(requestDescriptionInput.value).toBe('MockDescription');
  });

  test('Expiration Date has former content', () => {
    let mockDate = new Date('05 October 2011 14:48 UTC');
    mockDate.setMinutes(mockDate.getMinutes() - mockDate.getTimezoneOffset());
    render(<MockEdit />);
    const expirationDateInput = screen.getByLabelText(/Request Expiration Date:/i);
    expect(expirationDateInput.value).toBe(mockDate.toISOString().slice(0, -8));
  });

  test('Request Title input can be changed', () => {
    render(<MockEdit />);
    const requestTitleInputEl = screen.getByPlaceholderText(/Request Title/i);
    const testValue = "NewTitle";

    fireEvent.change(requestTitleInputEl, { target: { value: testValue } });
    expect(requestTitleInputEl.value).toBe(testValue);
  });


  test('Request Description input can be changed', () => {
    render(<MockEdit />);
    const requestDescriptionInputEl = screen.getByPlaceholderText(/Request Description/i);
    const testValue = "Test Description change";

    fireEvent.change(requestDescriptionInputEl, { target: { value: testValue } });
    expect(requestDescriptionInputEl.value).toBe(testValue);
  });

  test('Expiration Date input can be changed', () => {
    render(<MockEdit />);
    const expirationDateInputEl = screen.getByLabelText(/Request Expiration Date:/i);
    const testValue = "2023-12-31T19:30";

    fireEvent.change(expirationDateInputEl, { target: { value: testValue } });
    expect(expirationDateInputEl.value).toBe(testValue);
  })


});






