package com.exzbt.transaction.video.impl;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Video")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Video {

    @Id
    private String videoId;
    
    @Column
    private String requestId;

    @Column(nullable = false)
    private String creatorId;

    @Column(nullable = false)
    private Date created;
}