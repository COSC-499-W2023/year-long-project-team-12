import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import JobPostings from "./JobPostings";
import { BrowserRouter } from "react-router-dom";


test("Job Postings page is rendered correctly", () => {
    render(
        <BrowserRouter>
        <JobPostings/>
        </BrowserRouter>
        );
    const info = screen.getByTestId(/jobPosting/i);
    expect(info).toBeInTheDocument();
  });