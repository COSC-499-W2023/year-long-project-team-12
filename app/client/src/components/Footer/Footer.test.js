import {render,screen} from "@testing-library/react";
import React from "react";
import Footer from "./Footer";


  test("Footer component is rendered correctly with logo", () => {
    render(<Footer/>);
    const logo = screen.getByTestId(/logo/i);
    expect(logo).toBeInTheDocument();
  });


  test("Footer component is rendered correctly with copyright info", () => {
    render(<Footer/>);
    const copyright = screen.getByTestId(/copyright/i);
    expect(copyright).toBeInTheDocument();
  });

  test("Footer component is rendered correctly with about org info", () => {
    render(<Footer/>);
    const about = screen.getByTestId(/about/i);
    expect(about).toBeInTheDocument();
  });

  test("Footer component is rendered correctly with contact info", () => {
    render(<Footer/>);
    const contact = screen.getByTestId(/contact/i);
    expect(contact).toBeInTheDocument();
  });