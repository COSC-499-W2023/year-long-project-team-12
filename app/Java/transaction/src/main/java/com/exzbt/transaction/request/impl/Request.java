package com.exzbt.transaction.request.impl;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Request")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Request {

    @Id
    private String requestId;
    private String creatorId;
    private String location;
    private String assigneeId;
    private Date created;
    private Date expired;

}