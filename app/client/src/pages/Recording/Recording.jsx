import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
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
          <div className="btnsection">
            <button className="btn btn-approve" onClick={approveVideo}>
              Approve and submit video
            </button>
            <button className="btn btn-danger" onClick={deleteVideo}>
              Retry
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Recording;


