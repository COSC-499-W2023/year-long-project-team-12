package com.exzbt.business.rekognition.devInstance;

import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.rekognition.model.*;

public class RekognitionDev implements RekognitionClient {

    @Override
    public String serviceName() {
        return "RekognitionDevInstance";
    }

    @Override
    public GetFaceDetectionResponse getFaceDetection(GetFaceDetectionRequest getFaceDetectionRequest) throws AccessDeniedException, InternalServerErrorException, InvalidParameterException, InvalidPaginationTokenException, ProvisionedThroughputExceededException, ResourceNotFoundException, ThrottlingException, AwsServiceException, SdkClientException, RekognitionException {
        return null;
    }

    @Override
    public StartFaceDetectionResponse startFaceDetection(StartFaceDetectionRequest startFaceDetectionRequest) throws AccessDeniedException, IdempotentParameterMismatchException, InvalidParameterException, InvalidS3ObjectException, InternalServerErrorException, VideoTooLargeException, ProvisionedThroughputExceededException, LimitExceededException, ThrottlingException, AwsServiceException, SdkClientException, RekognitionException {
        return null;
    }

    @Override
    public void close() {

    }
}

