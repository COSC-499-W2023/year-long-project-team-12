package com.exzbt.business.comment.mappers;

import com.exzbt.transaction.comments.impl.Comment;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class CommentRequest {
    private String sender;
    private String requestId;
    private String creatorId;
    private String content;
    private Date created;

    public Comment convertFromDTO() {
        Comment comment = new Comment();
        comment.setContent(this.getContent());
        comment.setCreated(new Date());
        comment.setSender(this.getSender());
        comment.setRequestId(this.getRequestId());

        return comment;
    }
}
