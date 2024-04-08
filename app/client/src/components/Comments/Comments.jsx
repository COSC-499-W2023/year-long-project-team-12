import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import "./Comments.scss";
import { useAuth } from '../../context/authContext';
import { getCommentsById, createNewComment } from '../../services/ClientAPI';

function Comments() {
  const { currentUser, currentRequest } = useAuth();
  const [comments, setComments] = useState([]);
  const [commentContent, setContent] = useState("");

  const getComments = () => {
    getCommentsById(currentRequest.requestId)
      .then((resp) => {
        let sorted = resp.data.sort((a,b) => a.created - b.created);
        setComments(sorted);
      })
      .catch((err) => {});
  };

  const handleSubmitComment = () => {
    const commentData = new FormData();
    commentData.append("requestId", currentRequest.requestId);
    commentData.append("creatorId", currentUser.userId);
    commentData.append("content", commentContent);
    commentData.append("sender", currentUser.lastname + ", " + currentUser.firstname);

    createNewComment(commentData, currentRequest.requestId)
    .then((resp) => {
      getCommentsById(currentRequest.requestId).then((resp) => {
        let sorted = resp.data.sort((a,b) => a.created - b.created);
        setComments(sorted);
        setContent("");
      })
    })
    .catch((err) => {});
  };
  
  useEffect(() => {
      getComments();
  }, []);

  const CommentList = (
    <Box id="box" sx={{ width: 350 }} role="presentation">
        <div>
            {comments.length === 0 ? (
                <div className="noNotifs">No recent comments!</div>
            ) : (
                <div id="commentsContainer">
                {comments.map((comment) => (
                    <div className="notificationBox commentsBox" key={comment.commentId}>
                        <div className="commentContent">
                            <p>
                                {comment.content}
                            </p>
                            <div className='commentInfo'>
                              <span>From {comment.sender}</span>
                              <span>{new Date(comment.created).toLocaleString()}</span>
                            </div>
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
    <div className='comments-main'>
        <div className='comments-flexbox'>
            <div className='commentEntries'>
              {CommentList}
            </div>
            <textarea onChange={(e) => setContent(e.target.value)} value={commentContent}  maxlength="200" data-testid="textArea"/>
            <button onClick={handleSubmitComment} data-testid="submitButton">Submit</button>
        </div>
       
    </div>
  )
}

export default Comments