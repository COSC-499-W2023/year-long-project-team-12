package com.exzbt.transaction.request.impl;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@Table(name = "Request")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Request {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String requestId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String creatorId;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String assigneeId;

    @Column(nullable = false)
    private Date created;

    @Column(nullable = false)
    private Date expiration;

    @Getter(AccessLevel.NONE)
    @Column(nullable = false)
    private Boolean submitted;

    public Boolean isSubmitted() {
        return this.submitted;
    }

}