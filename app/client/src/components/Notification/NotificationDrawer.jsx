import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import './Notificationdrawer.scss';
import { getNotifications, deleteNotificationById } from '../../services/ClientAPI';
import { useAuth } from '../../context/authContext';
import CloseIcon from '@mui/icons-material/Close';

const NotificationDrawer = () => {
  const { currentUser } = useAuth();
  const [notifications, setMyNotifications] = useState([]);

  const getMyNotifications = () => {
    getNotifications(currentUser.userId)
      .then((resp) => {
        let sorted = resp.data.sort((a,b) => b.created - a.created);
        setMyNotifications(sorted);
      })
      .catch((err) => {});
  };

  const handleNotifDelete = (notifId) => {
    deleteNotificationById(notifId).then((resp) => {
        getNotifications(currentUser.userId)
        .then((resp) => {
            let sorted = resp.data.sort((a,b) => b.created - a.created);
            setMyNotifications(sorted);
        })
    })
  }

  useEffect(() => {
    getMyNotifications();
  }, []);

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
        <div>
            {notifications.length === 0 ? (
                <div className="noNotifs">No new notifications!</div>
            ) : (
                <div id="notificationContainer">
                {notifications.map((notification) => (
                    <div className="notificationBox" key={notification.notificationId}>
                        <div className="notifContent">
                            <span>
                                {notification.content}
                            </span>
                            <span>{new Date(notification.created).toLocaleString()}</span>
                        </div>
                        <div>
                            <CloseIcon className='close' onClick={() => handleNotifDelete(notification.notificationId)}/>
                        </div>
                    </div>
                ))
                }
                </div>
            )}
        </div>
    </Box>
  );

  return (
    <div>
      {DrawerList}
    </div>
  );
}

export default NotificationDrawer;
