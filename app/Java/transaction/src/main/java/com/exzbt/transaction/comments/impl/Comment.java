package com.exzbt.transaction.comments.impl;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@Table(name = "Comment")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Comment {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String commentId;

    @Column(nullable = false)
    private String sender;

    @Column(nullable = false)
    private String requestId;

    @Column
    private String content;

    @Column(nullable = false)
    private Date created;
}