package com.exzbt.transaction.video.api;

import com.exzbt.transaction.video.impl.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface VideoActions extends JpaRepository<Video, String> {
    List<Video> findByCreatorId(String creatorId);

    Optional<Video> findByRequestId(String requestId);

}
