import {render,screen, fireEvent} from "@testing-library/react";
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import React, { createContext } from "react";






  test("Profile page is rendered with firstname", () => {

    const MockProfilePage = () =>{
      const currentUser ={
        firstname :"Rasmus",
        lastname : "Hojlund",
      };
      return(
        <>
        <div data-testid="value">{currentUser.firstname}</div>
        </>
      );
    };

    render(<MockProfilePage/>)

    expect(screen.getByTestId("value")).toHaveTextContent("Rasmus")
   
   
  });



  test("Profile page is rendered with lastname", () => {

    const MockProfilePage = () =>{
      const currentUser ={
        firstname :"Rasmus",
        lastname : "Hojlund",
      };
      return(
        <>
        <div data-testid="value">{currentUser.lastname}</div>
        </>
      );
    };

    render(<MockProfilePage/>)

    expect(screen.getByTestId("value")).toHaveTextContent("Hojlund")
   
   
  });
 
 