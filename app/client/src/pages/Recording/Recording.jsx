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

  const playRecording = () => {
    setIsPlaying(true);
  };

  const stopPlayback = () => {
    setIsPlaying(false);
  };

  const approveVideo = () => {
    // Implement logic to handle approved video
    alert("Video approved!");
  };

  const reRecord = () => {
    setRecordedChunks([]);
  };

  const deleteVideo = () => {
    setRecordedChunks([]);
    setIsPlaying(false); // Stop playback if it's currently playing
  };

  const downloadVideo = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="recording-container">
      <h2>Record your video</h2>
      <Webcam audio={true} ref={webcamRef} height={400} width={500} />
      
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
          <button className="btn btn-success" onClick={approveVideo}>
            Keep Video
          </button>
          <button className="btn btn-danger" onClick={deleteVideo}>
            Delete Video
          </button>
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
        </>
      )}
    </div>
  );
};

export default Recording;

