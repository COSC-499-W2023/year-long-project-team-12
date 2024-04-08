package com.exzbt.business.video;

import com.exzbt.business.rekognition.RekognitionActions;
import com.exzbt.business.video.mappers.VideoDetailsDTO;
import com.exzbt.business.video.mappers.VideoDetailsRequest;
import com.exzbt.business.video.mappers.VideoSubmissionDTO;
import com.exzbt.business.video.mappers.VideoSubmissionRequest;
import com.exzbt.s3.S3Buckets;
import com.exzbt.s3.transactions.S3Actions;
import com.exzbt.transaction.video.api.SubmissionActions;
import com.exzbt.transaction.video.api.VideoActions;
import com.exzbt.transaction.video.impl.Video;
import com.exzbt.transaction.video.impl.VideoSubmission;
import lombok.AllArgsConstructor;
import org.opencv.core.Mat;
import org.opencv.core.Size;
import org.opencv.imgproc.Imgproc;
import org.opencv.videoio.VideoCapture;
import org.opencv.videoio.VideoWriter;
import org.opencv.videoio.Videoio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

import static org.opencv.videoio.VideoWriter.fourcc;


@Service
@AllArgsConstructor
public class VideoService {
    @Autowired
    private VideoActions videoActions;
    @Autowired
    private S3Actions s3Actions;
    @Autowired
    private SubmissionActions submissionActions;
    @Autowired
    private RekognitionActions rekognitionActions;

    private S3Buckets s3Buckets;

    public List<VideoDetailsDTO> getVideosByCreatorId(String creatorId) {
        List<Video> userVideos = videoActions.findByCreatorId(creatorId);
        return userVideos.stream()
                .map(userVideo -> new VideoDetailsDTO().convertDTO(userVideo)).toList();
    }

    public VideoDetailsDTO getVideoByVideoId(String videoId) {
        Video video = videoActions.findByVideoId(videoId)
                .orElseThrow(RuntimeException::new);
        return new VideoDetailsDTO().convertDTO(video);
    }

    public void createVideo(VideoDetailsRequest videoDetailsRequest) {
        videoActions.save(videoDetailsRequest.convertFromDTO());
    }

    public void deleteVideoById(String videoId) {
    }

    public String saveCreatedVideo(String creatorId, String videoName, MultipartFile file, Date created) {
        String videoId = UUID.randomUUID().toString();

        try {
            s3Actions.putObject(
                    s3Buckets.getAppUser(),
                    "createdVideos/%s/%s".formatted(creatorId, videoId),
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to save video", e);
        }

        VideoDetailsRequest videoRequest = new VideoDetailsRequest();
        videoRequest.setVideoId(videoId);
        videoRequest.setVideoName(videoName);
        videoRequest.setCreatorId(creatorId);
        videoRequest.setCreated(created);
        videoRequest.setSaved(Boolean.TRUE);
        createVideo(videoRequest);
        return videoId;
    }

    public void submitVideo(String videoId, String requestId, String creatorId, Date submitted) {
        VideoSubmissionRequest videoSubmissionRequest = new VideoSubmissionRequest();
        videoSubmissionRequest.setVideoId(videoId);
        videoSubmissionRequest.setRequestId(requestId);
        videoSubmissionRequest.setCreatorId(creatorId);
        videoSubmissionRequest.setSubmitted(submitted);

        submissionActions.save(videoSubmissionRequest.convertFromDTO());
    }

    public byte[] getRequestVideoById(String requestId, String videoId) {
        Video video = videoActions.findById(videoId)
                .orElseThrow(RuntimeException::new);

        if (Objects.isNull(video)) {
            //TODO: exception throw
            return null;
        }

        return s3Actions.getObject(
                s3Buckets.getAppUser(),
                "requestVideos/%s/%s".formatted(requestId, videoId)
        );
    }

    public byte[] getSavedVideoById(String videoId) {
        Video video = videoActions.findById(videoId)
                .orElseThrow(RuntimeException::new);

        if (Objects.isNull(video.getCreatorId())) {
            //TODO: exception throw
            return null;
        }

        return s3Actions.getObject(
                s3Buckets.getAppUser(),
                "createdVideos/%s/%s".formatted(video.getCreatorId(), videoId)
        );
    }

    public byte[] blurCreatedVideo(String creatorId, MultipartFile file) {

        byte[] blurredVideo;
        String videoKey = "blurVideos/%s".formatted(creatorId);

        try {
            s3Actions.putObject(
                    s3Buckets.getBlurS3(),
                    videoKey,
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to upload video to S3", e);
        }

        String startJobId = rekognitionActions.startFaceDetection(s3Buckets.getBlurS3(), videoKey);
        if(startJobId.equals("dev")) {
            Map<String, List<String>> faceResults = new HashMap<>();
        }else {
            Map<String, List<String>> faceResults = rekognitionActions.getFaceResults(startJobId);
        }

        File tempFile;
        try {
            tempFile = File.createTempFile("temp_video", ".mp4");
            Files.write(tempFile.toPath(), file.getBytes());

            VideoCapture capture = new VideoCapture(tempFile.getAbsolutePath());
            if (!capture.isOpened()) {
                return null;
            }
            int fourcc = fourcc('H', '2', '6', '4');
            double frameWidth = capture.get(Videoio.CAP_PROP_FRAME_WIDTH);
            double frameHeight = capture.get(Videoio.CAP_PROP_FRAME_HEIGHT);

            VideoWriter videoWriter = new org.opencv.videoio.VideoWriter
                    (tempFile.getAbsolutePath(), fourcc, capture.get(Videoio.CAP_PROP_FPS), new Size(frameWidth, frameHeight));

            Mat readFrame = new Mat();
            while (capture.read(readFrame)) {
                if(startJobId.equals("dev")) {
                    Imgproc.blur(readFrame, readFrame, new Size(30,30));
                } else {

                }
                videoWriter.write(readFrame);
            }

            capture.release();
            videoWriter.release();

            blurredVideo = Files.readAllBytes(Path.of(tempFile.getAbsolutePath()));

        } catch (IOException e) {
            throw new RuntimeException("failed to upload video to S3", e);
        }

        return blurredVideo;
    }

    public VideoDetailsDTO getVideoByVideoName(String videoName) {
        Video video = videoActions.findByVideoName(videoName)
                .orElseThrow(RuntimeException::new);
        return new VideoDetailsDTO().convertDTO(video);
    }

    public List<VideoSubmissionDTO> getVideoSubmissionsByRequestId(String requestId) {
        List<VideoSubmission> submissions = submissionActions.findByRequestId(requestId);
        return submissions.stream()
                .map(submission -> new VideoSubmissionDTO().convertDTO(submission)).toList();
    }
}
