package com.exzbt.business.s3.devInstance;

import software.amazon.awssdk.services.rekognition.RekognitionClient;

public class RekognitionDev implements RekognitionClient {

    @Override
    public String serviceName() {
        return "RekognitionDevInstance";
    }

    @Override
    public void close() {

    }
}

