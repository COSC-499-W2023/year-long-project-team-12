package com.exzbt.transaction.video.impl;

import jakarta.persistence.*;
import lombok.*;

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
    private String videoName;

    @Column(nullable = false)
    private String creatorId;

    @Column(nullable = false)
    private Date created;

    @Getter(AccessLevel.NONE)
    @Column(nullable = false)
    private Boolean saved;

    public Boolean isSaved() {
        return this.saved;
    }
}