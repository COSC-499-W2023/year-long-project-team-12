package com.exzbt.widget.comment;

import com.exzbt.business.comment.CommentService;
import com.exzbt.business.comment.mappers.CommentDTO;
import com.exzbt.business.comment.mappers.CommentRequest;
import com.exzbt.business.notification.NotificationService;
import com.exzbt.business.notification.mappers.NotificationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/comments")
public class CommentCRUD {
    @Autowired
    private CommentService commentService;

    @GetMapping("{requestId}")
    public List<CommentDTO> getComments(@PathVariable("requestId") String requestId) {
        return commentService.getCommentsByRequestId(requestId);
    }

    @PostMapping("create/{requestId}")
    public void updateNotifications(@RequestBody CommentRequest request) {
         commentService.createComment(request);
    }
}
