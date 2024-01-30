package com.exzbt.widget.request;

import com.exzbt.business.request.RequestService;
import com.exzbt.business.request.mappers.RequestCreationDTORequest;
import com.exzbt.business.request.mappers.RequestDetailsDTO;
import com.exzbt.business.request.mappers.RequestDetailsRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/v1/requests")
public class RequestCRUD {
    @Autowired
    private RequestService requestService;

    @GetMapping
    public List<RequestDetailsDTO> getRequests() {
        return requestService.getAllRequests();
    }

    @GetMapping("{requestId}")
    public RequestDetailsDTO getRequest(@PathVariable("requestId") String requestId) {
        return requestService.getRequestByRequestId(requestId);
    }

    @GetMapping("assigned/{userId}")
    public List<RequestDetailsDTO> getAssignedRequestByUserId(@PathVariable("userId") String userId) {
        return requestService.getAssignedRequestsByUserId(userId);
    }

    @GetMapping("created/{userId}")
    public List<RequestDetailsDTO> getCreatedRequestByUserId(@PathVariable("userId") String userId) {
        return requestService.getCreatedRequestsByUserId(userId);
    }

    @PostMapping("create")
    public RequestDetailsDTO createRequest(@RequestBody RequestCreationDTORequest request) {
        return requestService.createRequest(request);
    }

    @PostMapping("edit/{id}")
    public RequestDetailsDTO saveRequest(@PathVariable("id") String id,
                                         @RequestBody RequestDetailsRequest updateRequest) {
        return requestService.saveChanges(id, updateRequest);
    }

    @DeleteMapping("{id}")
    public void deleteRequest(@PathVariable("id") String requestId) {
        requestService.deleteRequestByRequestId(requestId);
    }

    @PostMapping(
            value = "{requestId}/submit",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public void uploadRequestVideoOnSubmit(
            @PathVariable("requestId") String requestId,
            @RequestPart("video") MultipartFile file,
            @RequestParam("created") Date created,
            @RequestParam("userId") String userId) {
        requestService.uploadVideoOnSubmit(requestId, file, userId, created);
    }
}

