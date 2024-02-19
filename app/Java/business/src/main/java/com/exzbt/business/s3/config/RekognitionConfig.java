package com.exzbt.business.s3.config;

import com.exzbt.business.s3.devInstance.RekognitionDev;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.InstanceProfileCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.rekognition.RekognitionClient;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.Objects;

@Configuration
public class RekognitionConfig {
    @Value("${cloud.aws.region}")
    private String awsRegion;

    @Value("${application.environment}")
    private String env;

    @Bean
    public RekognitionClient rekognitionClient() {
        if(Objects.equals(env, "dev")){
            return new RekognitionDev();
        }

        return RekognitionClient.builder()
                .region(Region.of(awsRegion))
                .build();
    }

}
