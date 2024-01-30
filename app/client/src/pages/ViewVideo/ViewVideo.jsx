import React, {useEffect} from 'react'
import { useState } from 'react';
import "./ViewVideo.scss";
import {useAuth} from "../../context/authContext";
import {getVideoDetailsByRequestId, getVideoByVideoId} from "../../services/ClientAPI";

function ViewVideo() {
    const [video, setVideo] = useState('');
    const { currentRequest } = useAuth();
    const [videoDetails, setVideoDetails] = useState(null);

    const getRequestVideo = async () => {
        try {
            const resp = await getVideoDetailsByRequestId(currentRequest.requestId);
            setVideoDetails(resp.data);
        } catch (err) {
            console.error('Error fetching video details:', err);
        }
    };

    useEffect(() => {
        getRequestVideo();
    }, [currentRequest.requestId]);

    useEffect(() => {
        if (videoDetails) {
            const getVideo = async () => {
                const videoUrl = await getVideoByVideoId(videoDetails.videoId);
                setVideo(videoUrl);
            };
            getVideo();
        }
    }, [videoDetails]);


return (
    <main className='upload-main'>
        <form className='upload-form'>
            {video ?
                <video controls width="600" height="500">
                    <source src={video} type="video/mp4" />
                </video>
        :
        <>
        <p><i>No video submissions</i></p>
        </>
        }
        </form>
    </main>
  )
}

export default ViewVideo;