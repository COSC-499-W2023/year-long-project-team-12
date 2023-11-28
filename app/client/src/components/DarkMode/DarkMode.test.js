import {render,screen, fireEvent, waitFor, prettyDOM} from "@testing-library/react";
import { MemoryRouter, Routes, Route, BrowserRouter, createMemoryRouter } from 'react-router-dom'
import AuthContext, {AuthContextProvider} from '../../context/authContext';
import React from "react";
import DarkMode from "./DarkMode";


test("That the darkmode switch exists on the page", () => {
    render(<DarkMode/>);
    const darkModeSwitch = screen.getByTestId(/darkModeSwitch/i);

    expect(darkModeSwitch).toBeInTheDocument();
  });

test("Clicking on the darkmode switch enables darkmode", () => {
    render(<DarkMode/>);
    const darkModeSwitch = screen.getByTestId(/darkModeSwitch/i);
    fireEvent.click(darkModeSwitch);
    const selectedTheme = localStorage.getItem("selectedTheme")
    expect(selectedTheme).toBe("dark");
  });


  test("Clicking on the darkmode again should default back to light mode", () => {
    render(<DarkMode/>);
    const darkModeSwitch = screen.getByTestId(/darkModeSwitch/i);
    fireEvent.click(darkModeSwitch);
    
    const selectedTheme = localStorage.getItem("selectedTheme");
    console.log(selectedTheme)
    expect(selectedTheme).toBe("light");
  });
 
  