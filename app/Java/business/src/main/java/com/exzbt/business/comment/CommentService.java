package com.exzbt.business.comment;

import com.exzbt.business.comment.mappers.CommentDTO;
import com.exzbt.business.comment.mappers.CommentRequest;
import com.exzbt.business.notification.NotificationService;
import com.exzbt.business.request.RequestService;
import com.exzbt.business.request.mappers.RequestDetailsDTO;
import com.exzbt.transaction.comments.api.CommentsTransactions;
import com.exzbt.transaction.comments.impl.Comment;
import com.exzbt.transaction.notifications.api.NotificationTransactions;
import com.exzbt.transaction.notifications.impl.Notification;
import com.exzbt.transaction.request.impl.Request;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class CommentService {
    @Autowired
    private CommentsTransactions commentsTransactions;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private RequestService requestService;

    public List<CommentDTO> getCommentsByRequestId(String requestId) {
        List<Comment> comments = commentsTransactions.findByRequestId(requestId);
        return comments.stream()
                .map(comment -> new CommentDTO().convertDTO(comment)).toList();
    }

    public void createComment(CommentRequest commentRequest) {
        RequestDetailsDTO requestDetails = requestService.getRequestByRequestId(commentRequest.getRequestId());

        commentsTransactions.save(commentRequest.convertFromDTO());

        String assigneeId = Objects.equals(commentRequest.getCreatorId(), requestDetails.getAssigneeId())?
                requestDetails.getCreatorId() : requestDetails.getAssigneeId();

        notificationService.sendNotification(requestDetails.getTitle() + " - has a new comment!",
               assigneeId , commentRequest.getCreatorId(), new Date());
    }
}
