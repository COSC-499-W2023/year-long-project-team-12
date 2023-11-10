import {render,screen, fireEvent} from "@testing-library/react";
import Login from "./pages/Login/Login";
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import {AuthContextProvider} from './context/authContext';

const Mocktest =()=>{
    return(
    <AuthContextProvider>
      <BrowserRouter>
        <Login/>
      </BrowserRouter>
      </AuthContextProvider>
    )
  };




test("password input should be rendered", () => {
    render(<Mocktest/>);
    const passwordInputEl = screen.getByPlaceholderText(/Password/i);
    expect(passwordInputEl).toBeInTheDocument();
  });
 
  
  
test("username input should be rendered", ()=> {
    render(<Mocktest/>);
    const userInputEl = screen.getByPlaceholderText(/Email or username/i);
    expect(userInputEl).toBeInTheDocument();
});


test("Login button should be rendered", () => {
    render(<Mocktest />);
    const buttonEl = screen.getAllByText("Login")[1];
    expect(buttonEl).toBeInTheDocument();
  });



  test("username input should be empty", () => {
    render(<Mocktest />);
    const usernameInputEl = screen.getByPlaceholderText(/Email or username/i);
    expect(usernameInputEl.value).toBe("");
  });
  
  test("password input should be empty", () => {
    render(<Mocktest />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    expect(passwordInputEl.value).toBe("");
  });


  test("Login button should be disabled", () => {
    render(<Mocktest />);
    const buttonEl = screen.getAllByText("Login")[1];
    expect(buttonEl).toBeDisabled();
  });

  test("error message should not be visible", () => {
    render(<Mocktest />);
    const errorEl = screen.getByTestId("error");
    expect(errorEl).not.toBeVisible();
  });

  test("username input should change", () => {
    render(<Mocktest />);
    const usernameInputEl = screen.getByPlaceholderText(/Email or username/i);
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    expect(usernameInputEl.value).toBe(testValue);
  });
  
  test("password input should change", () => {
    render(<Mocktest />);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
    const testValue = "test";
  
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    expect(passwordInputEl.value).toBe(testValue);
  });

  test("button should not be disabled when inputs exist", () => {
    render(<Mocktest />);
    const buttonEl = screen.getAllByText("Login")[1];
    const usernameInputEl = screen.getByPlaceholderText(/Email or username/i);
    const passwordInputEl = screen.getByPlaceholderText(/password/i);
  
    const testValue = "test";
  
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
  
    expect(buttonEl).not.toBeDisabled();
  });



