package com.exzbt.jobposting.impl;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document("JobPosting")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class JobPosting {
    @Id
    private String jobPostingId;
    private String hiringCompany;
    private String position;
    private String location;
    private String hiringUserId;
    private Date created;
    private Date expired;

}