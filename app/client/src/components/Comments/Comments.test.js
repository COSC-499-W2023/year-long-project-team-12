import {render,screen} from "@testing-library/react";
import React from "react";
import Comments from "./Comments";


  test("Comments component is rendered correctly with header", () => {
    render(<Comments/>);
    const header = screen.getByTestId(/header/i);
    expect(header).toBeInTheDocument();
  });


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