package com.exzbt.s3.devInstance;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import software.amazon.awssdk.awscore.exception.AwsServiceException;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.exception.SdkClientException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public class S3dev implements S3Client {
    private static final String PATH = System.getProperty("user.home") + "/exzbt/s3";
    @Override
    public String serviceName() {
        return "S3DevInstance";
    }

    @Override
    public PutObjectResponse putObject(PutObjectRequest putObjectRequest, RequestBody requestBody) throws AwsServiceException, SdkClientException {
        InputStream requestInput = requestBody.contentStreamProvider().newStream();

        try {
            byte[] bytes = IOUtils.toByteArray(requestInput);
            FileUtils.writeByteArrayToFile(new File(
                    resolvePath(
                            putObjectRequest.bucket(), putObjectRequest.key())), bytes);
            return PutObjectResponse.builder().build();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseInputStream<GetObjectResponse> getObject(GetObjectRequest getObjectRequest) throws  AwsServiceException, SdkClientException {
        try {
            FileInputStream fileInputStream = new FileInputStream(
                    resolvePath(
                            getObjectRequest.bucket(), getObjectRequest.key()));

            return new ResponseInputStream<>(
                    GetObjectResponse.builder().build(),
                    fileInputStream
            );
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    private String resolvePath(String bucketName, String key) {
        return PATH + "/" + bucketName + "/" + key;
    }
    @Override
    public void close() {

    }
}

