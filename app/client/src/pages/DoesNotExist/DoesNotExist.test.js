import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import { MemoryRouter, Routes, Route, BrowserRouter, createMemoryRouter } from 'react-router-dom'
import AuthContext, {AuthContextProvider} from '../../context/authContext';
import React from "react";
import DoesNotExist from "./DoesNotExist"


test("Does not exist page is rendered correctly", () => {
    render(<DoesNotExist/>);
    const info = screen.getByTestId(/info/i);
    expect(info).toBeInTheDocument();
  });