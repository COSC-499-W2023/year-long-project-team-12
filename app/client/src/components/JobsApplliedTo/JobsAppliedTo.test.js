import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import JobsAppliedTo from "./JobsAppliedTo";
import { BrowserRouter } from "react-router-dom";




const Mocktest =()=>{
    const jobs =  {
        id:3,
        jobTitle:"Electrical Engineer",
        companyName:"Boeing",
        logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Boeing_full_logo_%28variant%29.svg/1280px-Boeing_full_logo_%28variant%29.svg.png",
        location:"Dallas",
        description:"",
    
    };
    
        
    
    return(
        <BrowserRouter>
            <JobsAppliedTo jobs={jobs}/>
        </BrowserRouter>
    )
  };

test("Jobs Applied To component is rendered correctly with job title", () => {
    render(<Mocktest/>)

    const jobTitle = screen.getByTestId(/jobTitle/i);
    expect(jobTitle).toHaveTextContent("Electrical Engineer");
  });



  test("Jobs Applied To component is rendered correctly with company name", () => {
    render(<Mocktest/>)

    const companyName = screen.getByTestId(/jobCompanyName/i);
    expect(companyName).toHaveTextContent("Boeing");
  });       


test("Jobs Applied To component is rendered correctly with location", () => {
    render(<Mocktest/>)

    const location = screen.getByTestId(/jobLocation/i);
    expect(location).toHaveTextContent("Dallas");
  });   



test("Jobs Applied To component is rendered correctly with image src ", () => {
    render(<Mocktest/>)
    const testImage = document.querySelector("img");
    expect(testImage.src).toContain("https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Boeing_full_logo_%28variant%29.svg/1280px-Boeing_full_logo_%28variant%29.svg.png");
  }); 

test("Jobs Applied To component is rendered correctly with image alt text", () => {
    render(<Mocktest/>)
    const testImage = document.querySelector("img");
    expect(testImage.alt).toContain("confidential");
  }); 

