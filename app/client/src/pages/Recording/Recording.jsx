import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import "./Recording.scss";

const Recording = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

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

  //approve video function for the submissoin of the video
  
  const approveVideo = async () => {
  //   if (recordedChunks.length) {
      
  //     const formData = new FormData();
  //     formData.append("video", new Blob(recordedChunks, { type: "video/webm" }), "recorded-video.webm");

  //     try {
        
  //       const response = await axios.post("YOUR_SERVER_API_ENDPOINT", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       });

        
  //       console.log("Video uploaded successfully:", response.data);

    
  //       alert("Video uploaded successfully!");
  //     } catch (error) {
        
  //       console.error("Error uploading video:", error.message);
  //       alert("Error uploading video. Please try again.");
  //     }
  //   } else {
  
  //     alert("No recorded video to approve.");
  //   }
  };

  
  const deleteVideo = () => {
    setRecordedChunks([]);
    setIsPlaying(false); 
  };

  return (
    <div className="recording-container">
      <h2>Record your video</h2>
      <Webcam audio={false} ref={webcamRef} height={400} width={500} />
      
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
          <button className="btn btn-approve" onClick={approveVideo}>
            Approve and submit video
          </button>
          <button className="btn btn-danger" onClick={deleteVideo}>
            Delete Video
          </button>
        </>
      )}
    </div>
  );
};

export default Recording;

