package com.exzbt.transaction.video.impl;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@Table(name = "VideoSubmission")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VideoSubmission {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String submissionId;
    
    @Column
    private String videoId;

    @Column
    private String requestId;

    @Column
    private String creatorId;

    @Column
    private Date submitted;
}