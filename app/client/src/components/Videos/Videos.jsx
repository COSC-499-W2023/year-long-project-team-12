import React, { useEffect, useState } from 'react';
import './videos.scss';
import { getVideoDetailsListByCreatorId } from '../../services/ClientAPI';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const Videos = () => {
  const { currentUser, setCurrentVideo } = useAuth();
  const [myVideos, setMyVideos] = useState([]);

  const getMyVideos = () => {
    getVideoDetailsListByCreatorId(currentUser.userId)
      .then((resp) => {
        let sorted = resp.data.sort((a,b) => b.created - a.created).filter(video => video.saved); 
        setMyVideos(sorted);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getMyVideos();
  }, []);

  const handleVideoContext = (videoDetails) => {
    setCurrentVideo(videoDetails);
  };
  
  return (
    <div>
      {myVideos.length === 0 ? (
        <div className="norequests">You have no saved videos!</div>
      ) : (
        <div id="videosContainer">
          {myVideos.map((video) => (
            <div className="videos" key={video.videoId}>
              <Link to="/savedVideo">
                <span onClick={() => handleVideoContext(video)}>
                  {video.videoName}
                </span>
              </Link>
              <span>{new Date(video.created).toLocaleString()}</span>
            </div>
          ))
          }
        </div>
      )}
    </div>
  );
}

export default Videos;
