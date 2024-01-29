package com.exzbt.business.request.mappers;

import com.exzbt.transaction.request.impl.Request;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class RequestDetailsDTO {
    private String requestId;
    private String title;
    private String creatorId;
    private String description;
    private String assigneeId;
    private Date created;
    private Date expiration;
    private Boolean submitted;

    public RequestDetailsDTO convertDTO(Request request) {
        this.setRequestId(request.getRequestId());
        this.setTitle(request.getTitle());
        this.setCreatorId(request.getCreatorId());
        this.setDescription(request.getDescription());
        this.setAssigneeId(request.getAssigneeId());
        this.setCreated(request.getCreated());
        this.setExpiration(request.getExpiration());
        this.setSubmitted(request.isSubmitted());
        return this;
    }
}
