package com.exzbt.business.notification.mappers;

import com.exzbt.transaction.notifications.impl.Notification;
import com.exzbt.transaction.video.impl.Video;
import lombok.*;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@EqualsAndHashCode
@Setter
public class NotificationRequest {
    private String content;
    private String creatorId;
    private String assigneeId;
    private Date created;
    private Boolean viewed;

    public Notification convertFromDTO() {
        Notification notification = new Notification();
        notification.setContent(this.getContent());
        notification.setCreated(new Date());
        notification.setCreatorId(this.getContent());
        notification.setAssigneeId(this.getAssigneeId());
        notification.setViewed(Boolean.FALSE);
        return notification;
    }
}
