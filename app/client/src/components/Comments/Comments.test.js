import {render,screen} from "@testing-library/react";
import React from "react";
import Comments from "./Comments";

jest.mock('../../context/authContext', () => ({
  useAuth: () => ({
    currentUser: { role: 'ADMIN' },
    currentRequest: {
      title: 'MockTitle', 
      description: 'MockDescription', 
      expiration: '05 October 2011 14:48 UTC' 
    }
  })  
}));

  test("Comments component is rendered correctly with text-area", () => {
    render(<Comments/>);
    const text_area = screen.getByTestId(/textArea/i);
    expect(text_area).toBeInTheDocument();
  });

  test("Comments component is rendered correctly with submitButton", () => {
    render(<Comments/>);
    const submitButton = screen.getByTestId(/submitButton/i);
    expect(submitButton).toBeInTheDocument();
  });