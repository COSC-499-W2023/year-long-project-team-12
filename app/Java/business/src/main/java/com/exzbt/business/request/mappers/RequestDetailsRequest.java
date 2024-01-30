package com.exzbt.business.request.mappers;

import com.exzbt.transaction.appuser.impl.AppUser;
import com.exzbt.transaction.request.impl.Request;
import jakarta.persistence.Column;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class RequestDetailsRequest {
    private String requestId;
    private String creatorId;
    private String title;
    private String description;
    private String assigneeId;
    private Date created;
    private Date expiration;

    @Getter(AccessLevel.NONE)
    private Boolean submitted;

    public Boolean isSubmitted() {
        return this.submitted;
    }

    public Request convertFromDTO() {
        Request request = new Request();
        request.setRequestId(this.getRequestId());
        request.setCreatorId(this.getCreatorId());
        request.setTitle(this.getTitle());
        request.setDescription(this.getDescription());
        request.setAssigneeId(this.getAssigneeId());
        request.setCreated(this.getCreated());
        request.setExpiration(this.getExpiration());
        request.setSubmitted(this.isSubmitted());
        return request;
    }
}
