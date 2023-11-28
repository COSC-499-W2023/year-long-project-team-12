import {render,screen, fireEvent, waitFor} from "@testing-library/react";
import { MemoryRouter, Routes, Route, BrowserRouter, createMemoryRouter } from 'react-router-dom'
import AuthContext, {AuthContextProvider} from '../../context/authContext';
import React from "react";
import { useState } from 'react';
import Uploader from "./Uploader";
import userEvent from '@testing-library/user-event'
import {MdDelete, MdCloudUpload} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai'
import { type } from "@testing-library/user-event/dist/type";

const MockUploadPage = () =>{
  const [video, setVideo] = useState(null);
    const [fileName, setFileName] = useState("No Selected File");
  
  return(
    <>
     <form data-testid="upload-form" className='upload-form'
        onClick={()=> document.querySelector('.input-field').click()}
        >
            <input data-testid="upload-input" type='file' accept='video/*' className='input-field' />
             {video ?
        <video src={video} width={200} height={200} alt={fileName} />    
        :
        <>
        <MdCloudUpload data-testid="upload-image" color='#1475cf' size={60}/>
        <p>Browse Files to upload</p>
        </>
        }
        </form>
        <section className='uploaded-row'>
            <AiFillFileImage color='#1475cf'/>
            <span className='upload-content'>
                {fileName} - 
                <MdDelete  
                onClick={()=>{
                    setFileName("No Selected File")
                    setVideo(null)
                }}
                />
            </span>
        </section>
        <button data-testid="upload-button" className='upload-button'>Upload</button>
    </>
  );
};

test("Upload page is rendered correctly with the upload form", () => {
    render(<MockUploadPage/>);
    const uploadForm = screen.getByTestId(/upload-form/i);
    expect(uploadForm).toBeInTheDocument();
  });

  test("Upload page is rendered correctly with the upload button", () => {
    render(<MockUploadPage/>);
    const uploadButton = screen.getByTestId(/upload-button/i);
    expect(uploadButton).toBeInTheDocument();
  });

  test("Upload page is rendered correctly with the upload image", () => {
    render(<MockUploadPage/>);
    const uploadImage = screen.getByTestId(/upload-image/i);
    expect(uploadImage).toBeInTheDocument();
  });


  test("Make sure the correct video file uploaded",  async () => {
    

    const file = new File(["Rasmus"], "Rasmus.mp4", {type: "video/mov"})

    render(<MockUploadPage/>);

    const input = screen.getByTestId(/upload-input/i);
    await userEvent.upload(input,file);

 
    expect(input.files[0]).toStrictEqual(file);
  });

  test("Make sure the file uploaded is a video file",  async () => {
    

    const file = new File(["Rasmus"], "Rasmus.mp4", {type: "video/mov"})

    render(<MockUploadPage/>);

    const input = screen.getByTestId(/upload-input/i);
    await userEvent.upload(input,file);

   
    expect(input.files[0].type).toStrictEqual("video/mov");
  });

  test("Make sure only one video is uploaded",  async () => {
    

    const file = new File(["Rasmus"], "Rasmus.mp4", {type: "image/png"})

    render(<MockUploadPage/>);

    const input = screen.getByTestId(/upload-input/i);
    await userEvent.upload(input,file);

   
    expect(input.files).toHaveLength(1);
  });