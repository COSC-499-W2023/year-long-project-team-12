package com.exzbt.business.notification.mappers;

import com.exzbt.transaction.notifications.impl.Notification;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class NotificationDTO {
    private String notificationId;
    private String content;
    private String creatorId;
    private String assigneeId;
    private Date created;
    private Boolean viewed;

    public NotificationDTO convertDTO(Notification notification) {
        this.setNotificationId(notification.getNotificationId());
        this.setCreatorId(notification.getCreatorId());
        this.setContent(notification.getContent());
        this.setAssigneeId(notification.getAssigneeId());
        this.setCreated(notification.getCreated());
        this.setViewed(notification.isViewed());
        return this;
    }
}
