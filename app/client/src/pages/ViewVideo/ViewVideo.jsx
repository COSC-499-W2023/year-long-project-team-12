import React, {useEffect} from 'react'
import { useState } from 'react';
import "./ViewVideo.scss";
import {useAuth} from "../../context/authContext";
import Comments from '../../components/Comments/Comments';
import {getVideoDetailsByRequestId, getRequestVideoByVideoId} from "../../services/ClientAPI";

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
                const videoUrl = await getRequestVideoByVideoId(videoDetails.videoId);
                setVideo(videoUrl);
            };
            getVideo();
        }
    }, [videoDetails]);


return (
    <main className='view-main'>
        <form className='view-form'>
            {video ?
            <>
                <video controls width="600" height="500">
                    <source src={video} type="video/mp4" />
                </video>
               
            </>
        :
        <>
        <p><i>No video submissions</i></p>
        </>
        }
         <Comments />
        </form>
    </main>
  )
}

export default ViewVideo;