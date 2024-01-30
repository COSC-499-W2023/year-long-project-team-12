import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter, Routes, Route, BrowserRouter, createMemoryRouter } from 'react-router-dom'
import AuthContext, {AuthContextProvider} from '../../context/authContext';
import React from "react";


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



// test("user should be moved to the sign up page when sign up button is clicked", async ()=>{
  
//   render(
//         <Routes>
//           <Route path="/login" element={<Login/>}/>
//           <Route  path="/register" element={<Register/>}/>
//         </Routes>,
//         <MemoryRouter>
//           <Login/>
//           <Register />
//         </MemoryRouter>
//   );
  
//   // userEvent.click(screen.getAllByText("Register")[0]);
//   // await waitFor(()=>{
//   // expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument()
//   // }
//   // )

//   userEvent.click(screen.getAllByText("Register")[0]);
//   await screen.getByPlaceholderText(/First Name/i)
  

// });


// test('invalid path should redirect to 404', () => {
//  const user = {isCustomerAuthenticated:true}
//   render(
//     <AuthContextProvider value={user}>
//       <BrowserRouter>
//       <Login/>
//       </BrowserRouter>
//     </AuthContextProvider>
//   )

//   //expect(wrapper.find(DoesNotExist)).toHaveLength(1);
// });