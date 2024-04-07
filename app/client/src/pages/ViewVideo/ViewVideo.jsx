import React, {useEffect} from 'react'
import { useState } from 'react';
import "./ViewVideo.scss";
import {useAuth} from "../../context/authContext";
import Drawer from '@mui/material/Drawer';
import Comments from '../../components/Comments/Comments';
import {getVideoSubmissionsByRequestId, getRequestVideoByVideoId} from "../../services/ClientAPI";

function ViewVideo() {
    const [video, setVideo] = useState('');
    const { currentRequest } = useAuth();
    const [submissions, setSubmissions] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [comments, setComments] = useState([]);

    const getComments = () => {
        
    };
    
    useEffect(() => {
        getComments();
    }, []);

    const toggleDrawer = (newOpen) => () => {
        setOpenDrawer(newOpen);
    };
  
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
         <h4 onClick={toggleDrawer(true)}>View Comments</h4>
        </form>

        <Drawer anchor={'right'} open={openDrawer} onClose={toggleDrawer(false)}>
            <div className="notifDrawer"> 
              <div className="headingNotif">
                <h3>Comments</h3>
              </div>  
                <Comments />
            </div>
        </Drawer>
    </main>
  )
}

export default ViewVideo;