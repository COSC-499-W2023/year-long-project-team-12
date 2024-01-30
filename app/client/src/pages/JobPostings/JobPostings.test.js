import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import JobPostings from "./JobPostings";
import { BrowserRouter } from "react-router-dom";

jest.mock('../../components/Posts/Posts', () => {
    return {
        __esModule: true,
        default: jest.fn(() => <div data-testid="mockPosts" />),
    };
});

test("Job Postings page is rendered correctly", () => {
    render(
        <JobPostings/>
    );
    const info = screen.getByTestId(/jobPosting/i);
    expect(info).toBeInTheDocument();
});