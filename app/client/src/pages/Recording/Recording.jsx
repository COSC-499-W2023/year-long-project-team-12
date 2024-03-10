import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Modal from "react-modal";  
import "./Recording.scss";
import {useAuth} from "../../context/authContext";
import {uploadRequestVideo} from "../../services/ClientAPI";
import {Navigate, useNavigate} from "react-router-dom";

const Recording = () => {
  let navigate = useNavigate();
  const { currentRequest } = useAuth();
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [stage, setStage] = useState('setup');
  const [isTermsModalOpen, setTermsModalOpen] = useState(false); 
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorLabel, setErrorLabel] = useState("");

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable);
    mediaRecorderRef.current.start();
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setStage('review');
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const approveVideo = async () => {
    if (!agreeTerms) {
      setErrorLabel("Please agree to the Terms of Agreement");
      return;
    }
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    try {
      const requestObject = new FormData();
      requestObject.append('requestId', currentRequest.requestId);
      requestObject.append('video', blob);
      requestObject.append('created', new Date());
      requestObject.append('userId', currentRequest.assigneeId);

      await uploadRequestVideo(currentRequest.requestId, requestObject);
      navigate("/profile");
    } catch (error) {
      console.error('Error uploading video', error);
    }
  };

  const deleteVideo = () => {
    setRecordedChunks([]);
    setStage('record'); 
  };

  const enableCamera = () => {
    setCameraEnabled(true);
    setStage('record'); 
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
        <button className="btn btn-primary" onClick={enableCamera}>
          Turn on Camera
        </button>
      )}

      {stage === 'record' && cameraEnabled && (
        <>
          <Webcam muted={true} audio={true} ref={webcamRef} height={400} width={500} />
          {!capturing && recordedChunks.length === 0 && (
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
            className="recording-video"
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

          <div className="checkbox-container">
            <label>
              <input type="checkbox" checked={agreeTerms} onChange={handleCheckboxChange} />
              I agree to the Terms of Agreement
            </label>
          </div>

          {errorLabel && <p className="error-label">{errorLabel}</p>}
          
          <div className="btnsection">
          <button className="btn btn-approve" onClick={openTermsModal}>
              View Terms of agreement
            </button>
            <button className="btn btn-approve" >
              Save and Come back
            </button>
            <button className="btn btn-approve" onClick={approveVideo} >
              Approve and submit video
            </button>
            
            <button className="btn btn-danger" onClick={deleteVideo}>
              Retry
            </button>
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


