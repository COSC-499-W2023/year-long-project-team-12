import React from 'react'
import { useState } from 'react';
import "./Uploader.scss";
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai'
import {useAuth} from "../../context/authContext";
import {uploadRequestVideo} from "../../services/ClientAPI";
import {useNavigate} from "react-router-dom";

function Uploader() {
    const [videoPreview, setVideoPreview] = useState(null);
    const [video, setVideo] = useState(null);
    const { currentRequest } = useAuth();
    let navigate = useNavigate();
    const [fileName, setFileName] = useState("No Selected File");

    const handleUpload = async () => {
        if (video == null) {
            return;
        }

        console.log(currentRequest);

        try{
            const requestObject = new FormData();
            requestObject.append('requestId', currentRequest.requestId)
            requestObject.append('video', video)
            requestObject.append('created', new Date())
            requestObject.append('userId', currentRequest.assigneeId)

            uploadRequestVideo(currentRequest.requestId, requestObject).then(resp => {
                navigate('/jobs');
            })
        } catch  {

        }
    };
  return (
    <main className='upload-main'>
        <form data-testid="upload-form" className='upload-form'
        onClick={() => {
                if(video == null) {
                    document.querySelector('.input-field').click()
                }}}
        >
            <input data-testid="upload-input" type='file' accept='video/*' className='input-field' hidden
            onChange={({target:{files}}) =>{
                files[0] && setFileName(files[0].name)
                if(files && files[0]){
                    setVideoPreview(URL.createObjectURL(files[0]))
                    setVideo(files[0])
                }
            }
            }/>
            {video ?
            <video src={videoPreview} width={500} height={300} alt={fileName} controls/>
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
                    setVideoPreview(null)
                }}
                />
            </span>
        </section>
        <button data-testid="upload-button" className='upload-button' onClick={handleUpload}>Upload</button>
    </main>
  )
}

export default Uploader;