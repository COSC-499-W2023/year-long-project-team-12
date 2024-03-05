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
  const [isPlaying, setIsPlaying] = useState(false);

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
  };

  const handleDataAvailable = ({ data }) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => prev.concat(data));
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };
  
  const approveVideo = async () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" })
    
    try{
      const requestObject = new FormData();
      requestObject.append('requestId', currentRequest.requestId)
      requestObject.append('video', blob)
      requestObject.append('created', new Date())
      requestObject.append('userId', currentRequest.assigneeId)
      
      uploadRequestVideo(currentRequest.requestId, requestObject).then(resp => {
        navigate("/profile");
      })
    } catch  {

    }
  }

  const deleteVideo = () => {
    setRecordedChunks([]);
    setIsPlaying(false); 
  };

  return (
    <div className="recording-container">
      <h2>Record your video</h2>
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

      {recordedChunks.length > 0 && (
        <div>
        </div>
      )}

      {recordedChunks.length > 0 && (
        <>
          <h2>Recorded video for submission</h2>
          <video
            id="video-replay"
            className={isPlaying ? "recording-video" : "recording-video hidden"}
            height="400"
            width="500"
            controls
            autoPlay={isPlaying}
            onEnded={stopPlayback}
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
            Delete Video
          </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Recording;

