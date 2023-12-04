package com.exzbt.s3;

import com.exzbt.s3.transactions.S3Actions;
import org.junit.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class S3ActionsTest {
    @Mock
    private S3Client s3Client;
    @InjectMocks
    private S3Actions underTest;
    @Captor
    private ArgumentCaptor<PutObjectRequest> putObjectRequestCaptor;
    @Captor
    private ArgumentCaptor<RequestBody> requestBodyCaptor;
    @Mock
    private ResponseInputStream<GetObjectResponse> response;

    @BeforeEach
    void setUp() {
        underTest = new S3Actions(s3Client);
    }

    @Test
    public void putObject_whenValidObject_thenSaveNewObject() throws IOException {
        String bucket = "test";
        String key = "key1";
        byte[] data = "TestData".getBytes();

        underTest.putObject(bucket, key, data);

        verify(s3Client).putObject(putObjectRequestCaptor.capture(),requestBodyCaptor.capture());

        PutObjectRequest putObjectRequestValue = putObjectRequestCaptor.getValue();
        RequestBody requestBodyArgumentValue = requestBodyCaptor.getValue();

        assertThat(putObjectRequestValue.bucket()).isEqualTo(bucket);
        assertThat(putObjectRequestValue.key()).isEqualTo(key);
        assertThat(requestBodyArgumentValue.contentStreamProvider().newStream().readAllBytes()).isEqualTo(
                RequestBody.fromBytes(data).contentStreamProvider().newStream().readAllBytes());
    }

    @Test
    public void getObject_whenValidRequest_thenReturnObject() throws IOException {
        String bucket = "test";
        String key = "key1";
        byte[] data = "TestData".getBytes();

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucket)
                .key(key)
                .build();

        when(s3Client.getObject(eq(getObjectRequest))).thenReturn(response);
        when(response.readAllBytes()).thenReturn(data);

        byte[] bytes = underTest.getObject(bucket, key);

        assertThat(bytes).isEqualTo(data);
    }
}
