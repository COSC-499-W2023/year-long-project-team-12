package com.exzbt.transaction.notifications.impl;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.Date;

@Entity
@Table(name = "Notification")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class Notification {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private String notificationId;

    @Column(nullable = false)
    private String assigneeId;

    @Column(nullable = false)
    private String creatorId;

    @Column
    private String content;

    @Column(nullable = false)
    private Date created;

    @Getter(AccessLevel.NONE)
    @Column(nullable = false)
    private Boolean viewed;

    public Boolean isViewed() {
        return this.viewed;
    }
}