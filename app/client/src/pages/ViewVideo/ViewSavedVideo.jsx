import React, {useEffect} from 'react'
import { useState } from 'react';
import {useAuth} from "../../context/authContext";
import "./ViewVideo.scss";
import {getSavedVideoByVideoId} from "../../services/ClientAPI";

function ViewSavedVideo() {
    const [video, setVideo] = useState('');
    const { currentVideo } = useAuth();

    useEffect(() => {
        if (currentVideo) {
            const getVideo = () => {
                const videoUrl = getSavedVideoByVideoId(currentVideo.videoId);
                setVideo(videoUrl);
            };
            getVideo();
        }
    }, [currentVideo]);


return (
    <main className='view-main'>
        <form className='view-form'>
            {video ?
            <>
                <p><i>{currentVideo.videoName}</i></p>
                <video controls width="600" height="500">
                    <source src={video} type="video/mp4" />
                </video>
               
            </>
            :
            <>
            <p><i>Video Unavailable!</i></p>
            </>
            }
        </form>
    </main>
  )
}

export default ViewSavedVideo;