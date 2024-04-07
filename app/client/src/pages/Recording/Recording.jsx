import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";  
import "./Recording.scss";
import { useAuth } from "../../context/authContext";
import { uploadRequestVideo, saveCreatedVideo, getVideoDetailsByVideoName } from "../../services/ClientAPI";
import { useNavigate } from "react-router-dom";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useStopwatch } from 'react-timer-hook';
import CloseIcon from '@mui/icons-material/Close';

const Recording = () => {
  let navigate = useNavigate();
  const { currentUser, currentRequest } = useAuth();
  const [webcamElement, setWebcamElement] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [stage, setStage] = useState('setup');
  const [isTermsModalOpen, setTermsModalOpen] = useState(false); 
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorLabel, setErrorLabel] = useState("");
  const [namingVideoDialog, setNamingVideoDialog] = useState(false);
  const {seconds,minutes,hours,start,pause,reset} = useStopwatch();
  const [submitting, setSubmitting] = useState(false);
  const [videoName, setVideoName] = useState("");
  const [currentVideoId, setCurrentVideoId] = useState("");
  
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    setCapturing(true);
    start();
    mediaRecorderRef.current = new MediaRecorder(webcamElement, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    pause();
    setStage('review');
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const approveVideo = async () => {
    setSubmitting(true);
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    try {
      const requestObject = new FormData();
      requestObject.append('videoId', currentVideoId);
      requestObject.append('requestId', currentRequest.requestId);
      requestObject.append('video', blob);
      requestObject.append('created', new Date());
      requestObject.append('userId', currentUser.userId);

      await uploadRequestVideo(currentRequest.requestId, requestObject);
      navigate("/profile");
    } catch (error) {
      setSubmitting(false);
      console.error('Error uploading video', error);
    }
  };

  const deleteVideo = () => {
    setRecordedChunks([]);
    reset();
    setStage('record'); 
    setWebcamElement(null);
  };

  const enableCamera = () => {
    if (!agreeTerms) {
      setErrorLabel("Please agree to the Terms of Agreement");
      return;
    }
    setCameraEnabled(true);
    setStage('record'); 
  };

  const saveVideo = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    
    try {
      const saveVideoObject = new FormData();
      saveVideoObject.append('video', blob);
      saveVideoObject.append('created', new Date());
      saveVideoObject.append('userId', currentUser.userId);
      saveVideoObject.append('videoName', videoName);

      await saveCreatedVideo(currentUser.userId, saveVideoObject).then(resp => {
        setCurrentVideoId(resp.data);
        setNamingVideoDialog(false);
      });
    } catch (error) {
      console.error('Error saving video', error);
    }
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
    <div className="recording-container">
      {(stage === 'setup' || stage === 'record') && <h2>Record your video</h2>}

      {stage === 'setup' && !cameraEnabled && (
        <>
          <button className="btn btn-primary" onClick={enableCamera}>
            Turn on Camera
          </button>

          <div className="checkbox-container">  
          <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />
            <label>
              I have read and agree to the <span id='termsofAgreementLink' onClick={openTermsModal}>Terms of Agreement and Privacy Policy</span>
            </label>
          </div>

          {errorLabel && <p className="error-label">{errorLabel}</p>}
        </>
      )}

      {namingVideoDialog && 
          <div className='modalbackground'>
              <div className="save-confirmation">
                  <label>Save Video</label>
                  <input type="text" placeholder="Video Name" className="videoName" value={videoName} onChange={(e) => setVideoName(e.target.value)}/>

                  <div className="button-container" onClick={saveVideo}>
                      <button>Save</button>
                  </div>

                  <div className='close'>   
                      <CloseIcon onClick={() => setNamingVideoDialog(false)}/>
                  </div> 
              </div>
          </div>
      }
          
      {stage === 'record' && cameraEnabled && (
        <>
          <Webcam
            className="webcamVideo"
            muted={true}
            audio={true}
            height={400}
            width={500}
            onUserMedia={(stream) => setWebcamElement(stream)}
          />
          {capturing && (
            <div id="recordingInfo">
              <FiberManualRecordIcon id="recordingSymbol"/>
              <div>
                <span>{String(hours).padStart(2, '0')}</span>:<span>{String(minutes).padStart(2, '0')}</span>:<span>{String(seconds).padStart(2, '0')}</span>
              </div>
            </div>
          )}
          {!capturing && recordedChunks.length === 0 && webcamElement && (
            <button className="btn btn-primary" onClick={startRecording}>
              Start Capture
            </button>
          )}
          {capturing && (          
            <button className="btn btn-danger" onClick={stopRecording}>
              Stop Capture
            </button>
          )}
        </>
      )}

      {stage === 'review' && recordedChunks.length > 0 && (
        <>
          <h2>Review your video</h2>
          <video
            id="video-replay"
            className="recording-video webcamVideo"
            height="400"
            width="500"
            controls
            autoPlay
          >
            <source
              src={URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }))}
              type="video/webm"
            />
          </video>
          
          
          <div className="btnsection">
            {submitting? 
            "Please Wait":
            <>
              <button className="btn btn-approve" onClick={() => setNamingVideoDialog(true)}>
                Save Video
              </button>
              <button className="btn btn-approve" onClick={approveVideo} >
                Submit
              </button>
              
              <button className="btn btn-danger" onClick={deleteVideo}>
                Retry
              </button>
            </>}
          </div>
        </>
      )}

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
    </div>
  );
};

export default Recording;
