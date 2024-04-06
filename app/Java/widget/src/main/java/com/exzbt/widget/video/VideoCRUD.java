package com.exzbt.widget.video;

import com.exzbt.business.video.VideoService;
import com.exzbt.business.video.mappers.VideoDetailsDTO;
import com.exzbt.business.video.mappers.VideoSubmissionDTO;
import com.exzbt.transaction.video.impl.VideoSubmission;
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

    @GetMapping("{videoId}/videoDetails")
    public VideoDetailsDTO getVideoDetailsByVideoId(@PathVariable("videoId") String videoId) {
        return videoService.getVideoByVideoId(videoId);
    }

    @GetMapping("{videoName}/videoInfo")
    public VideoDetailsDTO getVideoDetailsByVideoName(@PathVariable("videoName") String videoName) {
        return videoService.getVideoByVideoName(videoName);
    }

    @GetMapping("{requestId}/videoSubmissions")
    public List<VideoSubmissionDTO> getVideoSubmissionsByRequestId(@PathVariable("requestId") String requestId) {
        return videoService.getVideoSubmissionsByRequestId(requestId);
    }

    @DeleteMapping("{videoId}")
    public void deleteVideo(@PathVariable("videoId") String videoId) {
        videoService.deleteVideoById(videoId);
    }

    @PostMapping(
            value = "{creatorId}/saveVideo",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public String saveCreatedVideo(
            @PathVariable("creatorId") String creatorId,
            @RequestPart("video") MultipartFile file,
            @RequestParam("videoName") String videoName,
            @RequestParam("created") Date created) {
        return videoService.saveCreatedVideo(creatorId, videoName, file, created);
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
            value = "{videoId}/requestVideo",
            produces = "video/mp4"
    )
    public byte[] getRequestVideoByVideoId(
            @PathVariable("videoId") String videoId,
            @RequestParam("requestId") String requestId){
        return videoService.getRequestVideoById(requestId, videoId);
    }

    @GetMapping(
            value = "{videoId}/savedVideo",
            produces = "video/mp4"
    )
    public byte[] getSavedVideoByVideoId(@PathVariable("videoId") String videoId){
        return videoService.getSavedVideoById(videoId);
    }
}

