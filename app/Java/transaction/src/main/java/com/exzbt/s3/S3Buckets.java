package com.exzbt.s3;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Configuration
@Component
public class S3Buckets {
    @Value("${cloud.aws.s3.buckets.appUser}")
    private String appUser;

}
