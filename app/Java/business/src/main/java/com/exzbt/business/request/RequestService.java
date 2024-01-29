package com.exzbt.business.request;

import com.exzbt.business.request.mappers.RequestCreationDTORequest;
import com.exzbt.business.request.mappers.RequestDetailsDTO;
import com.exzbt.business.request.mappers.RequestDetailsRequest;
import com.exzbt.business.user.UserService;
import com.exzbt.business.user.shared.UserDetailsDTO;
import com.exzbt.business.video.VideoService;
import com.exzbt.business.video.mappers.VideoDetailsRequest;
import com.exzbt.s3.S3Buckets;
import com.exzbt.s3.transactions.S3Actions;
import com.exzbt.transaction.request.api.RequestActions;
import com.exzbt.transaction.request.impl.Request;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RequestService {
    @Autowired
    private RequestActions requestActions;

    @Autowired
    private UserService userService;

    @Autowired
    private S3Actions s3Actions;

    private S3Buckets s3Buckets;

    @Autowired
    private VideoService videoService;

    public List<RequestDetailsDTO> getAllRequests() {
        List<Request> requests = requestActions.findAll();
        return requests.stream()
                .map(request -> new RequestDetailsDTO().convertDTO(request)).toList();
    }

    public RequestDetailsDTO getRequestByRequestId(String requestId) {
        return requestActions.findById(requestId)
                .map(request -> new RequestDetailsDTO().convertDTO(request))
                .orElseThrow(RuntimeException::new);

        //TODO: Throw exception
    }

    public List<RequestDetailsDTO> getCreatedRequestsByUserId(String userId) {
        List<Request> requests = requestActions.findByCreatorId(userId);
        return requests.stream()
                .map(request -> new RequestDetailsDTO().convertDTO(request)).toList();
    }

    public List<RequestDetailsDTO> getAssignedRequestsByUserId(String userId) {
        List<Request> requests = requestActions.findByAssigneeId(userId);
        return requests.stream()
                .map(request -> new RequestDetailsDTO().convertDTO(request)).toList();
    }

    public RequestDetailsDTO createRequest(RequestCreationDTORequest creationDTORequest) {
        UserDetailsDTO assignedUser = userService.findUserByEmail(creationDTORequest.getAssigneeEmail());
        creationDTORequest.setAssigneeId(assignedUser.getUserId());
        Request request = requestActions.save(creationDTORequest.convertFromDTO());
        return new RequestDetailsDTO().convertDTO(request);
    }

    public RequestDetailsDTO saveChanges(String requestId, RequestDetailsRequest updateRequest) {
        Request request = requestActions.findById(requestId)
                .orElseThrow(RuntimeException::new);

        //TODO: exception throw

        if(Objects.isNull(updateRequest) || Objects.equals(request, updateRequest.convertFromDTO())) {
            //TODO: exception throw
            return null;
        }

        Request updatedRequest = updateRequest.convertFromDTO();
        return new RequestDetailsDTO().convertDTO(requestActions.save(updatedRequest));
    }

    public void deleteRequestByRequestId(String requestId) {
        if (!requestActions.existsById(requestId)) {
            //TODO: exception throw
            return;
        }
        requestActions.deleteById(requestId);
    }

    public void uploadVideoOnSubmit(String requestId, MultipartFile file, String userId, Date created) {
        if (!requestActions.existsById(requestId)) {
            //TODO: exception throw
            return;
        }

        String videoId = UUID.randomUUID().toString();

        try {
            s3Actions.putObject(
                    s3Buckets.getAppUser(),
                    "requestVideos/%s/%s".formatted(requestId, videoId),
                    file.getBytes()
            );
        } catch (IOException e) {
            throw new RuntimeException("failed to upload video", e);
        }

        VideoDetailsRequest videoRequest = new VideoDetailsRequest();
        videoRequest.setVideoId(videoId);
        videoRequest.setRequestId(requestId);
        videoRequest.setCreatorId(userId);
        videoRequest.setCreated(created);

        videoService.createVideo(videoRequest);

        Request request = requestActions.findById(requestId)
                .orElseThrow(RuntimeException::new);
        request.setSubmitted(Boolean.TRUE);
        requestActions.save(request);
    }
}
