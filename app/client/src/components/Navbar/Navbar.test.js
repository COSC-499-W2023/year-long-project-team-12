import {render,screen, fireEvent, waitFor, prettyDOM} from "@testing-library/react";
import React from "react";
import logo from "./logo.png";
import { BrowserRouter,Link } from "react-router-dom";

    const MockNavbar = (user) =>{
        const currentUser ={
          username : "Gollazo",
        };
      
        if(user.isCustomerAuthenticated===true){
            return(
                    <>
                    <div className='navbar'>
                        <div className="wrapper">
                            
                            <div className='left'>
                                <img src={logo} alt="logo"></img>
                            </div>
                            
                            <div className='center'></div>

                            <div className='right'>
                                <div className="item">
                                    <Link data-testid="username" className='link' to="/profile">{currentUser.username}</Link>
                                </div>

                                <div className="item">
                                    <Link data-testid="jobs" className='link' to="/jobs">Jobs</Link>
                                </div>
                            
                                <div className="item">  
                                    <button data-testid="logout" >Logout</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    </>
            )
        }
        else{
            return(
                <>
                
                    <div className='navbar'>
                        <div className="wrapper">
                            
                            <div className='left'>
                            <img  src={logo} alt="logo"></img>
                            </div>
                            
                            <div className='center'>
                                <Link data-testid="appName" className='link' to="/home">EX-ZBT</Link>
                            </div>

                            <div className='right'>
                                <div className="item">
                                    <Link data-testid="register" className='link' to="/register">Register</Link>
                                </div>

                                <div className="item">
                                    <Link data-testid="login" className='link' to="/login">Login</Link>
                                </div>

                            </div>
                        </div>
                    </div> 
                </>
                );
          }
      };
    
test("Navbar component for authenticated users contains the username", () => {
     render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    //console.log(prettyDOM(data.container.firstChild))
    expect(screen.getByTestId("username")).toHaveTextContent("Gollazo");


  });


  test("Navbar component for authenticated users contains the link to jobs page and redirects to jobs page", () => {
     render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    expect(screen.getByTestId("jobs")).toHaveTextContent("Jobs");
    const link = screen.getByRole('link', { name: /Jobs/i });
    expect(link.getAttribute('href')).toBe('/jobs');

  });


  test("Navbar component for authenticated users contains the logout button", () => {
    render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    expect(screen.getByTestId("logout")).toHaveTextContent("Logout");
    

  });

  test("Navbar component for authenticated users contains the logo", () => {
    render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    const testImage = document.querySelector("img");
    expect(testImage.src).toContain(logo);

  });
  test("Navbar component for authenticated users does not contain the App name", () => {
     render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    expect(screen.queryByText("EZ-ZBT")).not.toBeInTheDocument();

  });

  test("Navbar component for authenticated users does not contain login button", () => {
    render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    expect(screen.queryByText("login")).not.toBeInTheDocument();

  });

  test("Navbar component for authenticated users does not contain register button", () => {
    render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={true}/>
        </BrowserRouter>
    )
    expect(screen.queryByText("register")).not.toBeInTheDocument();

  });




 test("Navbar component for non authenticated users contains the logo", () => {
     render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={false}/>
        </BrowserRouter>
    )
    const testImage = document.querySelector("img");
    expect(testImage.src).toContain(logo);

  });

  test("Navbar component for non authenticated users contains the appName", () => {
     render(
        <BrowserRouter>
            <MockNavbar isCustomerAuthenticated={false}/>
        </BrowserRouter>
    )
    expect(screen.getByTestId("appName")).toHaveTextContent("EX-ZBT");

  });

  test("Navbar component for non authenticated users contains the register button and directs them to the register page", () => {
    render(
       <BrowserRouter>
           <MockNavbar isCustomerAuthenticated={false}/>
       </BrowserRouter>
   )
   expect(screen.getByTestId("register")).toHaveTextContent("Register");
   const link = screen.getByRole('link', { name: /Register/i });
   expect(link.getAttribute('href')).toBe('/register');

 });

 test("Navbar component for non authenticated users contains the login button and directs them to the login page", () => {
    render(
       <BrowserRouter>
           <MockNavbar isCustomerAuthenticated={false}/>
       </BrowserRouter>
   )
   expect(screen.getByTestId("login")).toHaveTextContent("Login");
   const link = screen.getByRole('link', { name: /Login/i });
   expect(link.getAttribute('href')).toBe('/login');

 });

 test("Navbar component for non authenticated users does not contain the username", () => {
    render(
       <BrowserRouter>
           <MockNavbar isCustomerAuthenticated={false}/>
       </BrowserRouter>
   )
   expect(screen.queryByText("Gollazo")).not.toBeInTheDocument();

 });


 test("Navbar component for non authenticated users does not contain the Jobs button", () => {
    render(
       <BrowserRouter>
           <MockNavbar isCustomerAuthenticated={false}/>
       </BrowserRouter>
   )
   expect(screen.queryByText("Jobs")).not.toBeInTheDocument();

 });

 test("Navbar component for non authenticated users does not contain the Logout button", () => {
    render(
       <BrowserRouter>
           <MockNavbar isCustomerAuthenticated={false}/>
       </BrowserRouter>
   )
   expect(screen.queryByText("Logout")).not.toBeInTheDocument();

 });

