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
      <Webcam audio={true} ref={webcamRef}  />
      <div>
        {capturing ? (
          <>
            <button className="btn btn-danger" onClick={stopRecording}>
              Stop Capture
            </button>
            <button className="btn btn-success" onClick={playRecording}>
              Play Recording
            </button>
          </>
        ) : (
          <button className="btn btn-danger" onClick={startRecording}>
            Start Capture
          </button>
        )}
      </div>
      {isPlaying && (
        <div>
          <button className="btn btn-danger" onClick={stopPlayback}>
            Stop Playback
          </button>
        </div>
      )}
      {recordedChunks.length > 0 && (
        <div>
          <button className="btn btn-primary" onClick={approveVideo}>
            Approve Video
          </button>
          <button className="btn btn-warning" onClick={reRecord}>
            Re-record
          </button>
        </div>
      )}
      <video
        id="video-replay"
        className={isPlaying ? "recording-video" : "recording-video hidden"}
        height="400"
        width="500"
        controls
        autoPlay={isPlaying}
        onEnded={stopPlayback}
      >
        {recordedChunks.length > 0 && (
          <source
            src={URL.createObjectURL(new Blob(recordedChunks, { type: "video/webm" }))}
            type="video/webm"
          />
        )}
      </video>
    </div>
  );
};

export default Recording;
