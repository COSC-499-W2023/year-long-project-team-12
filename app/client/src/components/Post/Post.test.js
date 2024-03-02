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
        submitted: true
    };

    return(
        <BrowserRouter>
            <Post request={request}/>
        </BrowserRouter>
    )
  };

test("Post component is rendered correctly with title", () => {
    render(<Mocktest/>)

    const jobTitle = screen.getByTestId(/jobTitle/i);
    expect(jobTitle).toHaveTextContent("Test Request");
  });


test("Post component is rendered correctly with status", async () => {
    jest.spyOn(require('../../services/ClientAPI'), 'getUserById').mockResolvedValue({
        data: { lastName: 'LastName', firstName: 'FirstName' },
    });

    render(<Mocktest/>)
    await waitFor(() => expect(screen.getByTestId(/status/i))
        .toHaveTextContent("Status: Submitted"));
});

  test("Post component is rendered correctly with apply button that should direct the user to the upload page", async () => {
    render(<Mocktest />);
    const upload = screen.getByText("View");

    fireEvent.click(upload);

    await waitFor(() => {
      expect(window.location.pathname).toBe('/viewVideo');
    });
  });