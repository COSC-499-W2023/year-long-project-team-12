package com.exzbt.business.comment.mappers;

import com.exzbt.transaction.comments.impl.Comment;
import com.exzbt.transaction.notifications.impl.Notification;
import jakarta.persistence.Column;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class CommentDTO {
    private String commentId;
    private String sender;
    private String requestId;
    private String content;
    private Date created;

    public CommentDTO convertDTO(Comment comment) {
        this.setCommentId(comment.getCommentId());
        this.setSender(comment.getSender());
        this.setRequestId(comment.getRequestId());
        this.setContent(comment.getContent());
        this.setCreated(comment.getCreated());
        return this;
    }
}
