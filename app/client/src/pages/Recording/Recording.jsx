import React, { useState, useRef } from 'react';
import { MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import "./Recording.scss"

function Recording() {
  const [isRecording, setIsRecording] = useState(false);
  const [fileName, setFileName] = useState("No Recorded File");
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const blob = new Blob([event.data], { type: 'video/webm' });
          setFileName("Recorded Video");
          setIsRecording(false);
          setVideo(URL.createObjectURL(blob));
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const setVideo = (url) => {
    videoRef.current.srcObject = null;
    setVideo(url);
  };

  return (
    <main className='recording-main'>
      <form data-testid="recording-form" className='recording-form'>
        {isRecording ? (
          <>
            <video ref={videoRef} width={200} height={200} autoPlay muted />
            <MdDelete
              onClick={() => {
                stopRecording();
                setFileName("No Recorded File");
              }}
            />
          </>
        ) : (
          <>
            <AiFillFileImage color='#1475cf' />
            <p onClick={startRecording}>Start Recording</p>
          </>
        )}
      </form>
      <section className='recorded-row'>
        <span className='recording-content'>
          {fileName} -
          <MdDelete
            onClick={() => {
              setFileName("No Recorded File");
              setVideo(null);
            }}
          />
        </span>
      </section>
    </main>
  );
}

export default Recording;
