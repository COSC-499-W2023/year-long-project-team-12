package com.exzbt.business.video;

import com.exzbt.business.request.RequestService;
import com.exzbt.business.video.mappers.VideoDetailsDTO;
import com.exzbt.business.video.mappers.VideoDetailsRequest;
import com.exzbt.s3.S3Buckets;
import com.exzbt.s3.transactions.S3Actions;
import com.exzbt.transaction.video.api.VideoActions;
import com.exzbt.transaction.video.impl.Video;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class VideoService {
    @Autowired
    private VideoActions videoActions;
    @Autowired
    private S3Actions s3Actions;

    private S3Buckets s3Buckets;

    public List<VideoDetailsDTO> getVideosByCreatorId(String creatorId) {
        List<Video> userVideos = videoActions.findByCreatorId(creatorId);
        return userVideos.stream()
                .map(userVideo -> new VideoDetailsDTO().convertDTO(userVideo)).toList();
    }

    public VideoDetailsDTO getVideoByRequestId(String requestId) {
        Video video = videoActions.findByRequestId(requestId)
                .orElseThrow(RuntimeException::new);
        return new VideoDetailsDTO().convertDTO(video);
    }

    public void createVideo(VideoDetailsRequest videoDetailsRequest) {
        videoActions.save(videoDetailsRequest.convertFromDTO());
    }

    public void deleteVideoById(String videoId) {
    }

    public void saveCreatedVideo(String creatorId, MultipartFile file) {
    }

    public byte[] getRequestVideoById(String videoId) {
        Video video = videoActions.findById(videoId)
                .orElseThrow(RuntimeException::new);

        if (Objects.isNull(video.getRequestId())) {
            //TODO: exception throw
            return null;
        }

        return s3Actions.getObject(
                s3Buckets.getAppUser(),
                "requestVideos/%s/%s".formatted(video.getRequestId(), videoId)
        );
    }
}
