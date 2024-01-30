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
public class RequestCreationDTORequest {
    private String creatorId;
    private String title;
    private String description;
    private String assigneeEmail;
    private String assigneeId;
    private Date created;
    private Date expiration;

    public Request convertFromDTO() {
        Request request = new Request();
        request.setCreatorId(this.getCreatorId());
        request.setTitle(this.getTitle());
        request.setDescription(this.getDescription());
        request.setAssigneeId(this.getAssigneeId());
        request.setCreated(this.getCreated());
        request.setExpiration(this.getExpiration());
        request.setSubmitted(Boolean.FALSE);

        return request;
    }
}
