package com.exzbt.widget.video;

import com.exzbt.business.video.VideoService;
import com.exzbt.business.video.mappers.VideoDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/video")
public class VideoCRUD {
    @Autowired
    private VideoService videoService;

    @GetMapping("{creatorId}/videos")
    public List<VideoDetailsDTO> getVideoDetailsListByCreatorId(@PathVariable("creatorId") String creatorId) {
        return videoService.getVideosByCreatorId(creatorId);
    }

    @GetMapping("{requestId}/videoInfo")
    public VideoDetailsDTO getVideoDetailsByRequestId(@PathVariable("requestId") String requestId) {
        return videoService.getVideoByRequestId(requestId);
    }

    @DeleteMapping("{videoId}")
    public void deleteVideo(@PathVariable("videoId") String videoId) {
        videoService.deleteVideoById(videoId);
    }

    @PostMapping(
            value = "{creatorId}/saveVideo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void saveCreatedVideo(
            @PathVariable("creatorId") String creatorId,
            @RequestPart("video") MultipartFile file) {
        videoService.saveCreatedVideo(creatorId, file);
    }

    @GetMapping(
            value = "{videoId}/video",
            produces = "video/mp4"
    )
    public byte[] getVideoByVideoId(@PathVariable("videoId") String videoId){
        return videoService.getRequestVideoById(videoId);
    }
}

