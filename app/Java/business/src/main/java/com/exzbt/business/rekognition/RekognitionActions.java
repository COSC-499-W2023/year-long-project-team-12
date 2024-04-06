package com.exzbt.business.rekognition;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.*;

import java.util.*;

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
            if(Objects.isNull(startLabelDetectionResult)) {
                return "dev";
            }
            startJobId = startLabelDetectionResult.jobId();

        } catch(RekognitionException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        }
        return startJobId;
    }

    public Map<String, List<String>> getFaceResults(String startJobId) {

        Map<String, List<String>> timeStampToBoxMap = new HashMap<>();

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

                    if (timeStampToBoxMap.containsKey(timestamp)) {
                        timeStampToBoxMap.get(timestamp).add(box);
                    } else {
                        List<String> boxesList = new ArrayList<>();
                        boxesList.add(box);
                        timeStampToBoxMap.put(timestamp, boxesList);
                    }
                }
            } while (faceDetectionResponse != null && faceDetectionResponse.nextToken() != null);

        } catch(RekognitionException | InterruptedException e) {
            System.out.println(e.getMessage());
            System.exit(1);
        }

        return timeStampToBoxMap;
    }
}
