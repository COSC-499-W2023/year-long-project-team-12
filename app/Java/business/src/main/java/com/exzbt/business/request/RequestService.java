package com.exzbt.business.request;

import com.exzbt.business.notification.NotificationService;
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
import java.util.*;

@Service
@AllArgsConstructor
public class RequestService {
    @Autowired
    private RequestActions requestActions;

    @Autowired
    private UserService userService;

    @Autowired
    private S3Actions s3Actions;

    @Autowired
    private NotificationService notificationService;

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
        notificationService.sendNotification("New Request Assigned",
                request.getAssigneeId(), request.getCreatorId(), new Date());
        return new RequestDetailsDTO().convertDTO(request);
    }

    public RequestDetailsDTO saveChanges(String requestId, RequestDetailsRequest updateRequest) {
        Request request = requestActions.findById(requestId)
                .orElseThrow(RuntimeException::new);

        //TODO: exception throw

        if(Objects.isNull(updateRequest)) {
            //TODO: exception throw
            return null;
        }

        UserDetailsDTO assignedUser = userService.findUserByEmail(updateRequest.getAssigneeEmail());
        updateRequest.setAssigneeId(assignedUser.getUserId());

        request.setTitle(updateRequest.getTitle());
        request.setDescription(updateRequest.getDescription());
        request.setAssigneeId(updateRequest.getAssigneeId());
        request.setExpiration(updateRequest.getExpiration());

        notificationService.sendNotification("Request Updated",
                request.getAssigneeId(), request.getCreatorId(), new Date());
        return new RequestDetailsDTO().convertDTO(requestActions.save(request));
    }

    public void deleteRequestByRequestId(String requestId) {
        if (!requestActions.existsById(requestId)) {
            //TODO: exception throw
            return;
        }
        Request request = requestActions.findById(requestId)
                .orElseThrow(RuntimeException::new);

        notificationService.sendNotification("Request Deleted",
                request.getAssigneeId(), request.getCreatorId(), new Date());

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
        videoRequest.setVideoName(created.toString().concat("- RequestSubmission"));
        videoRequest.setCreatorId(userId);
        videoRequest.setCreated(created);
        videoRequest.setSaved(Boolean.FALSE);
        videoService.createVideo(videoRequest);

        videoService.submitVideo(videoId, requestId, userId, created);

        Request request = requestActions.findById(requestId)
                .orElseThrow(RuntimeException::new);
        request.setSubmitted(Boolean.TRUE);

        notificationService.sendNotification("Video Submitted to Request",
                request.getAssigneeId(), request.getCreatorId(), new Date());
        requestActions.save(request);
    }
}
