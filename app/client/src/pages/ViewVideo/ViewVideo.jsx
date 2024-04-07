import React, {useEffect} from 'react'
import { useState } from 'react';
import "./ViewVideo.scss";
import {useAuth} from "../../context/authContext";
import Comments from '../../components/Comments/Comments';
import {getVideoSubmissionsByRequestId, getRequestVideoByVideoId} from "../../services/ClientAPI";

function ViewVideo() {
    const [video, setVideo] = useState('');
    const { currentRequest } = useAuth();
    const [submissions, setSubmissions] = useState([]);

    const getRequestVideoSubmissions = async () => {
        try {
            const resp = await getVideoSubmissionsByRequestId(currentRequest.requestId);
            setSubmissions(resp.data);
        } catch (err) {
            console.error('Error fetching video submissions:', err);
        }
    };

    useEffect(() => {
        getRequestVideoSubmissions();
    }, [currentRequest.requestId]);

    useEffect(() => {
        if (submissions.length > 0) {
            const getVideo = () => {
                var submission = submissions[0];
                const videoUrl =  getRequestVideoByVideoId(submission.videoId, submission.requestId);
                setVideo(videoUrl);
            };
            getVideo();
        }
    }, [submissions]);

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