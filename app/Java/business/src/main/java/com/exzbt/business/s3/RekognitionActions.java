package com.exzbt.business.s3;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.*;

import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class RekognitionActions {

    @Autowired
    private final RekognitionClient rekognition;

    public String startFaceDetection(String bucket, String video) {

        String startJobId = "";
        NotificationChannel channel = NotificationChannel.builder()
                .build();

        try {
            S3Object s3Obj = S3Object.builder()
                    .bucket(bucket)
                    .name(video)
                    .build();

            Video vidOb = Video.builder()
                    .s3Object(s3Obj)
                    .build();

            StartFaceDetectionRequest faceDetectionRequest = StartFaceDetectionRequest.builder()
                    .jobTag("Faces")
                    .faceAttributes(FaceAttributes.ALL)
                    .notificationChannel(channel)
                    .video(vidOb)
                    .build();

            StartFaceDetectionResponse startLabelDetectionResult = rekognition.startFaceDetection(faceDetectionRequest);
            startJobId = startLabelDetectionResult.jobId();

        } catch(RekognitionException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        }
        return startJobId;
    }

    public List<String> getFaceResults(String startJobId) {
        List<String> facesBoxes = new ArrayList<>();
        try {
            String paginationToken = null;
            GetFaceDetectionResponse faceDetectionResponse = null;
            boolean finished = false;
            String status;
            int yy=0 ;

            do{
                if (faceDetectionResponse != null)
                    paginationToken = faceDetectionResponse.nextToken();

                GetFaceDetectionRequest recognitionRequest = GetFaceDetectionRequest.builder()
                        .jobId(startJobId)
                        .nextToken(paginationToken)
                        .maxResults(10)
                        .build();

                while (!finished) {
                    faceDetectionResponse = rekognition.getFaceDetection(recognitionRequest);
                    status = faceDetectionResponse.jobStatusAsString();

                    if (status.compareTo("SUCCEEDED") == 0)
                        finished = true;
                    else {
                        Thread.sleep(1000);
                    }
                    yy++;
                }

                finished = false;

                VideoMetadata videoMetaData = faceDetectionResponse.videoMetadata();
                System.out.println("Format: " + videoMetaData.format());
                System.out.println("Codec: " + videoMetaData.codec());
                System.out.println("Duration: " + videoMetaData.durationMillis());
                System.out.println("FrameRate: " + videoMetaData.frameRate());
                System.out.println("Job");

                List<FaceDetection> faces = faceDetectionResponse.faces();

                for (FaceDetection face: faces) {
                    String box = face.face().boundingBox().toString();
                    String timestamp = face.timestamp().toString();
                    facesBoxes.add(box);
                }
            } while (faceDetectionResponse != null && faceDetectionResponse.nextToken() != null);

        } catch(RekognitionException | InterruptedException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        }

        return facesBoxes;
    }
}
