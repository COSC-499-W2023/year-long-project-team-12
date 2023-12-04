package com.exzbt.s3.transactions;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Component
@AllArgsConstructor
public class S3Actions {
    private final S3Client s3;

    public void putObject(String bucketName, String key, byte[] object) {
        PutObjectRequest setObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();
        s3.putObject(setObjectRequest, RequestBody.fromBytes(object));
    }

    public byte[] getObject(String bucketName, String key) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .build();

        ResponseInputStream<GetObjectResponse> response = s3.getObject(getObjectRequest);

        try {
            return response.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
