import React from 'react'
import { useState, useEffect } from 'react';
import "./Uploader.scss";
import Modal from "react-modal";  
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai'
import {useAuth} from "../../context/authContext";
import {uploadRequestVideo,getSavedVideoByVideoId, getVideoDetailsListByCreatorId} from "../../services/ClientAPI";
import {useNavigate} from "react-router-dom";

function Uploader() {
    const [videoPreview, setVideoPreview] = useState(null);
    const [video, setVideo] = useState(null);
    const [savedVideoURLId, setVideoURLId] = useState("");
    const { currentRequest, currentUser } = useAuth();
    let navigate = useNavigate();
    const [fileName, setFileName] = useState("No Selected File");
    const [isTermsModalOpen, setTermsModalOpen] = useState(false); 
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [savedVideo, setSavedVideoDialog] = useState(false);
    const [pcVideo, setPCVideoDialog] = useState(false);
    const [errorLabel, setErrorLabel] = useState("");
    const [myVideos, setMyVideos] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const getMyVideos = () => {
      getVideoDetailsListByCreatorId(currentUser.userId)
        .then((resp) => {
          let sorted = resp.data.sort((a,b) => b.created - a.created).filter(video => video.saved); 
          setMyVideos(sorted);
        })
        .catch((err) => {});
    };

    useEffect(() => {
      getMyVideos();
    }, [savedVideo]);

    const handleUpload = async (event) => {
      event.preventDefault();
        setSubmitting(true);
        if (!agreeTerms) {
            setErrorLabel("Please agree to the Terms of Agreement");
            setSubmitting(false);
            return;
        }

        if (savedVideo && savedVideoURLId!=="") {
          fetch(getSavedVideoByVideoId(savedVideoURLId))
            .then((resp) => resp.blob())
            .then((videoBlob) => setVideo(videoBlob));
        }

        if (video == null) {
            setSubmitting(false);
            return;
        }

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
            setSubmitting(false);
        }
    };

    const handleSavedVideoSelect = (event) => {
      setVideoURLId(event.target.value);
    };

    const openTermsModal = () => {
      setTermsModalOpen(true);
    };
    
    const closeTermsModal = () => {
      setTermsModalOpen(false);
    };
    
    const handleCheckboxChange = () => {
      setAgreeTerms(!agreeTerms);
      setErrorLabel("");
    };

  return (
    <main className='upload-main'>
        <div className='upload-container'>
          <div className='uploadOptions'>
            <button className='button' onClick={() => {
              setPCVideoDialog(false);
              setSavedVideoDialog(true);
            }}>Upload Saved Video</button>
            <button className='button' onClick={() => {
              setPCVideoDialog(true)
              setSavedVideoDialog(false);
            }}>Upload from PC</button>
          </div>
        {pcVideo && (
          <>
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
                    <span id='filename'>{fileName}</span> - 
                    <MdDelete id='deleteButton'
                    onClick={()=>{
                        setFileName("No Selected File")
                        setVideo(null)
                        setVideoPreview(null)
                    }}
                    />
                </span>
            </section>
            <div className="checkbox-container">
                <label>
                  <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />
                  I have read and agree to the <span id='termsofAgreementLink' onClick={openTermsModal}>Terms of Agreement and Privacy Policy</span>
                </label>
              </div>

              {errorLabel && <p className="error-label">{errorLabel}</p>}
          
          {submitting? 
            <h3>
              Please Wait
            </h3>
            :
            <>
            <button data-testid="upload-button" className='button' onClick={handleUpload}>Submit</button>
              <Modal isOpen={isTermsModalOpen} onRequestClose={closeTermsModal}>
                <div className="termsOfAgreement">
                  <h2>Terms of Agreement:</h2>
                  {<p>
                    By using this service, you acknowledge and agree that we are not liable for any privacy breaches that may occur. 
                    While we take reasonable measures to protect your information, we cannot guarantee absolute security. 
                    You are solely responsible for safeguarding your personal data and using the service at your own risk.</p>}
                  <button className="btn btn-primary" onClick={closeTermsModal}>
                    Close
                  </button>
                </div>  
              </Modal>
            </>
          }
          </>
        )}
        
        {savedVideo && (
          <>
            <select id='selectSavedVideo' value={savedVideoURLId} onChange={handleSavedVideoSelect}>
              <option value="">Select a Video</option>
              {myVideos.map((video) => (
                <option key={video.videoId} value={video.videoId}>
                  {video.videoName}
                </option>
              ))}
            </select>
            <div className="checkbox-container">
                <label>
                  <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />
                  I have read and agree to the <span id='termsofAgreementLink' onClick={openTermsModal}>Terms of Agreement and Privacy Policy</span>
                </label>
            </div>
            {errorLabel && <p className="error-label">{errorLabel}</p>}
          
            {submitting? 
            <h3>
              Please Wait
            </h3>
            :
            <>
            <button data-testid="upload-button" className='button' onClick={handleUpload}>Submit</button>
              <Modal isOpen={isTermsModalOpen} onRequestClose={closeTermsModal}>
                <div className="termsOfAgreement">
                  <h2>Terms of Agreement:</h2>
                  {<p>
                    By using this service, you acknowledge and agree that we are not liable for any privacy breaches that may occur. 
                    While we take reasonable measures to protect your information, we cannot guarantee absolute security. 
                    You are solely responsible for safeguarding your personal data and using the service at your own risk.</p>}
                  <button className="btn btn-primary" onClick={closeTermsModal}>
                    Close
                  </button>
                </div>  
              </Modal>
            </>
          }
          </>
        )}

      </div>
    </main>
  )
}

export default Uploader;