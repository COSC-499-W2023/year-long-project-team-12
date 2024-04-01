package com.exzbt.transaction.video.api;

import com.exzbt.transaction.video.impl.VideoSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface SubmissionActions extends JpaRepository<VideoSubmission, String> {
    Optional<VideoSubmission> findBySubmissionId(String submissionId);

    List<VideoSubmission> findByRequestId(String requestId);

    List<VideoSubmission> findByCreatorId(String creatorId);

    List<VideoSubmission> findByVideoId(String videoId);
}
