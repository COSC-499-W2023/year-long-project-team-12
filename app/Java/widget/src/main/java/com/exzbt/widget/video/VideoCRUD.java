package com.exzbt.widget.video;

import com.exzbt.business.video.VideoService;
import com.exzbt.business.video.mappers.VideoDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
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
            @RequestPart("video") MultipartFile file,
            @RequestParam("created") Date created) {
        videoService.saveCreatedVideo(creatorId, file, created);
    }

    @PostMapping(
            value = "{creatorId}/blurVideo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = "video/mp4"
    )
    public byte[] blurCreatedVideo(
            @PathVariable("creatorId") String creatorId,
            @RequestPart("video") MultipartFile file) {
        return videoService.blurCreatedVideo(creatorId, file);
    }

    @GetMapping(
            value = "{videoId}/video",
            produces = "video/mp4"
    )
    public byte[] getVideoByVideoId(@PathVariable("videoId") String videoId){
        return videoService.getRequestVideoById(videoId);
    }
}

