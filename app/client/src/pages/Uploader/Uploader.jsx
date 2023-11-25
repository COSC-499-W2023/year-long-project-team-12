import React from 'react'
import { useState } from 'react';
import "./Uploader.scss";
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai'

function Uploader() {

    const [video, setVideo] = useState(null);
    const [fileName, setFileName] = useState("No Selected File");
  return (
    <main className='upload-main'>
        <form data-testid="upload-form" className='upload-form'
        onClick={()=> document.querySelector('.input-field').click()}
        >
            <input data-testid="upload-input" type='file' accept='video/*' className='input-field' hidden
            onChange={({target:{files}}) =>{
                files[0] && setFileName(files[0].name)
                if(files){
                    setVideo(URL.createObjectURL(files[0]))
                }
            }
            }/>
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
    </main>
  )
}

export default Uploader;