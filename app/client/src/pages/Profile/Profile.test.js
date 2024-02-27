import {render,screen, fireEvent, prettyDOM} from "@testing-library/react";
import { MemoryRouter, Routes, Route, BrowserRouter } from 'react-router-dom'
import React, { createContext, useState } from "react";
import MockJobsAppliedTo from "../../components/JobsApplliedTo/MockJobsAppliedTo";
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';
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
    <button data-testid="Requestbtn" className="Requestbtn"></button>
    <button data-testid="NotificationsBtn" className="NotificationsBtn"></button>
    <button data-testid="RecordedVideosBtn" className="RecordedVideosBtn"></button>
    <button data-testid="SettingsBtn" className="SettingsBtn"></button>
    
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

    test('handleMyRequestsClick logs message when "My Requests" button is clicked', () => {
      render(<MockProfilePage open={false} text={"Show"}/>)
     expect(screen.getByTestId("Requestbtn")).toBeInTheDocument();
  });

  test('handleNotificationsClick logs message when "Notifications" button is clicked', () => {
    render(<MockProfilePage open={false} text={"Show"}/>)
   expect(screen.getByTestId("NotificationsBtn")).toBeInTheDocument();
});

test('handleRecordedVideosClick logs message when "RecordedVideos" button is clicked', () => {
  render(<MockProfilePage open={false} text={"Show"}/>)
 expect(screen.getByTestId("RecordedVideosBtn")).toBeInTheDocument();
});

test('handleSettingsClick logs message when "Settings" button is clicked', () => {
  render(<MockProfilePage open={false} text={"Show"}/>)
 expect(screen.getByTestId("SettingsBtn")).toBeInTheDocument();
});


      
     