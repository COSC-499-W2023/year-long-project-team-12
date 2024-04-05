import React, { useEffect, useState } from 'react';
import './videos.scss';
import { getVideoDetailsListByCreatorId } from '../../services/ClientAPI';
import { useAuth } from '../../context/authContext';
import { Link } from 'react-router-dom';

const Videos = () => {
  const { currentUser } = useAuth();
  const [myVideos, setMyVideos] = useState([]);

  const getMyVideos = () => {
    getVideoDetailsListByCreatorId(currentUser.userId)
      .then((resp) => {
        setMyVideos(resp.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getMyVideos();
  }, []);
  
  return (
    <div>
      {myVideos.length === 0 ? (
        <div className="norequests">You have no saved videos!</div>
      ) : (
        <div className="videos">
          {myVideos.map((video) => (
            <>
            <div>{video.videoId}</div>
            <Link to="/jobs"><button  className="myRequestsButton"> Show More</button></Link>
            </>
            
          ))
          }
        </div>
      )}
    </div>
  );
}

export default Videos;
