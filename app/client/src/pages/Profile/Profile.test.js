import {render,screen, fireEvent, prettyDOM} from "@testing-library/react";
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import React, { createContext, useState } from "react";
import MockJobsAppliedTo from "../../components/JobsApplliedTo/MockJobsAppliedTo";
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '@testing-library/react';
import Profile from './Profile.jsx';


const MockProfilePage = ({open,text}) =>{
  const currentUser ={
    firstname :"Rasmus",
    lastname : "Hojlund",
  };

  return(
    <>
    <div data-testid="firstname">{currentUser.firstname}</div>
    <div data-testid="lastname">{currentUser.lastname}</div>
    <button data-testid="toggleJobsAppliedTo" className="toggleJobsAppliedTo">{text} Jobs you have applied to...</button>
    {open && (
            <div className="jobsAppliedToContainer">
            <h1>Jobs You Have Applied To</h1>
            <MockJobsAppliedTo />

            </div>
          )
          }
    </>
  );
};


  test("Profile page is rendered with firstname", () => {
    const renderer  = render(<MockProfilePage open={false} text={"Show"}/>)
    expect(screen.getByTestId("firstname")).toHaveTextContent("Rasmus")
  });



  test("Profile page is rendered with lastname", () => {

    render(<MockProfilePage open={false} text={"Show"}/>)

    expect(screen.getByTestId("lastname")).toHaveTextContent("Hojlund")
   
   
  });

  test("Profile page is rendered with toggle Jobs Applied To Button", () => {

    render(<MockProfilePage open={false} text={"Show"}/>)

    expect(screen.getByTestId("toggleJobsAppliedTo")).toBeInTheDocument();
   
   
  });


  test("Profile page is rendered by default hiding the \"Jobs Applied To\"", () => {

    render(<MockProfilePage open={false} text={"Show"} />)
    expect(screen.getByTestId("toggleJobsAppliedTo")).toHaveTextContent("Show Jobs you have applied to...")
    expect(screen.queryByText("Jobs You Have Applied To")).not.toBeInTheDocument();
   
   
  });

  test("Profile page is rendered  after toggling the \"Jobs Applied To Button\" showing the \"Jobs Applied To\"",async () => {
    

    render(<MockProfilePage open={true} text={"Hide"} />)
   
   // console.log(prettyDOM(renderer.container))
    expect(screen.getByTestId("toggleJobsAppliedTo")).toHaveTextContent("Hide Jobs you have applied to...")
    expect(screen.queryByText("Jobs You Have Applied To")).toBeInTheDocument();
   
   
  });

  test('handleMyRequestsClick is called when My Requests button is clicked', () => {
  const { getByText } = render(<Profile />);
  const myRequestsButton = getByText('My Requests');
  const consoleSpy = jest.spyOn(console, 'log');

  fireEvent.click(myRequestsButton);

  expect(consoleSpy).toHaveBeenCalledWith('My Requests button clicked!');
});

test('handleRecordedVideosClick is called when Recorded Videos button is clicked', () => {
  const { getByText } = render(<Profile />);
  const recordedVideosButton = getByText('Recorded Videos');
  const consoleSpy = jest.spyOn(console, 'log');

  fireEvent.click(recordedVideosButton);

  expect(consoleSpy).toHaveBeenCalledWith('Recorded Videos button clicked!');
});

test('handleNotificationsClick is called when Notifications button is clicked', () => {
  const { getByText } = render(<Profile />);
  const notificationsButton = getByText('Notifications');
  const consoleSpy = jest.spyOn(console, 'log');

  fireEvent.click(notificationsButton);

  expect(consoleSpy).toHaveBeenCalledWith('Notifications button clicked!');
});

test('handleSettingsClick toggles dropdown visibility when settings button is clicked', () => {
  const { getByRole, getByText } = render(<Profile />);
  const settingsButton = getByRole('button', { name: /settings/i });
  const dropdown = getByText('Change Profile Name'); 
  expect(dropdown).not.toBeVisible(); 

  fireEvent.click(settingsButton);
  expect(dropdown).toBeVisible(); 

  fireEvent.click(settingsButton);
  expect(dropdown).not.toBeVisible(); 
});

  
 

  
  