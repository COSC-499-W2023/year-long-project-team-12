package com.exzbt.transaction.request.api;

import com.exzbt.transaction.request.impl.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface RequestActions extends JpaRepository<Request, String> {
    Optional<Request> findRequestByRequestId(String requestId);
    List<Request> findByCreatorId(String creatorId);
    List<Request> findByAssigneeId(String assigneeId);

}
