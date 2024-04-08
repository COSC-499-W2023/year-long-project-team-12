package com.exzbt.transaction.comments.api;

import com.exzbt.transaction.comments.impl.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
public interface CommentsTransactions extends JpaRepository<Comment, String> {
    List<Comment> findByRequestId(String requestId);
}
