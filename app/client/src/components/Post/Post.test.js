import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import Post from "./Post";
import { BrowserRouter } from "react-router-dom";
import * as PropTypes from "prop-types";

jest.mock('../../context/authContext', () => ({
    useAuth: () => ({
        setCurrentRequest: jest.fn(),
        currentUser: { role: 'ADMIN' }
    }),
}));

const Mocktest =()=>{
    const request =  {
        id:3,
        title:"Test Request",
        expiration:new Date(2024, 1, 1),
        description:"",
    };

    return(
        <BrowserRouter>
            <Post request={request}/>
        </BrowserRouter>
    )
  };

test("Post component is rendered correctly with job title", () => {
    render(<Mocktest/>)

    const jobTitle = screen.getByTestId(/jobTitle/i);
    expect(jobTitle).toHaveTextContent("Test Request");
  });


test("Post component is rendered correctly with location", () => {
    render(<Mocktest/>)

    const expiration = screen.getByTestId(/expiration/i);
    expect(expiration).toHaveTextContent(new Date(2024, 1, 1).toString());
  });   


/*
test("Post component is rendered correctly with image src ", () => {
    render(<Mocktest/>)
    const testImage = document.querySelector("img");
    expect(testImage.src).toContain("https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Boeing_full_logo_%28variant%29.svg/1280px-Boeing_full_logo_%28variant%29.svg.png");
  }); 
*/

/*
test("Post component is rendered correctly with image alt ", () => {
    render(<Mocktest/>)
    const testImage = document.querySelector("img");
    expect(testImage.alt).toContain("confidential");
  }); 
*/

  test("Post component is rendered correctly with apply button that should direct the user to the upload page", async () => {
    render(<Mocktest />);
    const upload = screen.getByText("View");
  
    fireEvent.click(upload);
  
    await waitFor(() => {
      expect(window.location.pathname).toBe('/viewVideo');
    });
  });