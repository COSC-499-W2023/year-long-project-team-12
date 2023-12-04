package com.exzbt.s3.config;

import com.exzbt.s3.devInstance.S3dev;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.Objects;

@Configuration
public class S3Config {
    @Value("${cloud.aws.region}")
    private String awsRegion;

    @Value("${application.environment}")
    private String env;

    @Bean
    public S3Client s3Client() {
        if(Objects.equals(env, "dev")){
            return new S3dev();
        }

        return S3Client.builder()
                .region(Region.of(awsRegion))
                .build();
    }

}
