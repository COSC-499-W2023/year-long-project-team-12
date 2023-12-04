import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Interviewer from './Interviewer';
import { AuthContextProvider } from '../../context/authContext';
import { BrowserRouter } from 'react-router-dom';

const MockInterviewer = () => (
  <AuthContextProvider>
    <BrowserRouter>
      <Interviewer />
    </BrowserRouter>
  </AuthContextProvider>
);

describe('Interviewer Component', () => {
  test('renders Interviewer component', () => {
    render(<MockInterviewer />);
    const addJobPostingElement = screen.queryByText(/Add Job Posting/i);
    expect(addJobPostingElement).toBeInTheDocument();
  });

  test('Job Title input starts empty', () => {
    render(<MockInterviewer />);
    const jobTitleInput = screen.getByPlaceholderText(/Job Title/i);
    expect(jobTitleInput.value).toBe('');
  });

  test('Company Name input starts empty', () => {
    render(<MockInterviewer />);
    const companyNameInput = screen.getByPlaceholderText(/Company Name/i);
    expect(companyNameInput.value).toBe('');
  });

  test('Location input starts empty', () => {
    render(<MockInterviewer />);
    const locationInput = screen.getByPlaceholderText(/Location/i);
    expect(locationInput.value).toBe('');
  });

  test('Job Description input starts empty', () => {
    render(<MockInterviewer />);
    const jobDescriptionInput = screen.getByPlaceholderText(/Job Description/i);
    expect(jobDescriptionInput.value).toBe('');
  });

  test('Expiration Date input starts empty', () => {
    render(<MockInterviewer />);
    const expirationDateInput = screen.getByLabelText(/Job Expiration Date:/i);
    expect(expirationDateInput.value).toBe('');
  });

  test('Job Title input can be changed', () => {
    render(<MockInterviewer />);
    const jobTitleInputEl = screen.getByPlaceholderText(/Job Title/i);
    const testValue = "Software Engineer";

    fireEvent.change(jobTitleInputEl, { target: { value: testValue } });
    expect(jobTitleInputEl.value).toBe(testValue);
  });

  test('Company Name input can be changed', () => {
    render(<MockInterviewer />);
    const companyNameInputEl = screen.getByPlaceholderText(/Company Name/i);
    const testValue = "ABC Corporation";

    fireEvent.change(companyNameInputEl, { target: { value: testValue } });
    expect(companyNameInputEl.value).toBe(testValue);
  });

  test('Location input can be changed', () => {
    render(<MockInterviewer />);
    const locationInputEl = screen.getByPlaceholderText(/Location/i);
    const testValue = "New York";

    fireEvent.change(locationInputEl, { target: { value: testValue } });
    expect(locationInputEl.value).toBe(testValue);
  });

  test('Job Description input can be changed', () => {
    render(<MockInterviewer />);
    const jobDescriptionInputEl = screen.getByPlaceholderText(/Job Description/i);
    const testValue = "Exciting opportunity for software engineers.";

    fireEvent.change(jobDescriptionInputEl, { target: { value: testValue } });
    expect(jobDescriptionInputEl.value).toBe(testValue);
  });

  test('Expiration Date input can be changed', () => {
    render(<MockInterviewer />);
    const expirationDateInputEl = screen.getByLabelText(/Job Expiration Date:/i);
    const testValue = "2023-12-31";

    fireEvent.change(expirationDateInputEl, { target: { value: testValue } });
    expect(expirationDateInputEl.value).toBe(testValue);
  })

});
