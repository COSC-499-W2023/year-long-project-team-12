package com.exzbt.business.notification;

import com.exzbt.business.notification.mappers.NotificationDTO;
import com.exzbt.business.notification.mappers.NotificationRequest;
import com.exzbt.transaction.notifications.api.NotificationTransactions;
import com.exzbt.transaction.notifications.impl.Notification;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class NotificationService {

    @Autowired
    private NotificationTransactions notificationTransactions;

    public List<NotificationDTO> getNotificationsByAssigneeId(String assigneeId) {
        List<Notification> notifications = notificationTransactions.findByAssigneeId(assigneeId);
        return notifications.stream()
                .map(notification -> new NotificationDTO().convertDTO(notification)).toList();
    }

    public void sendNotification(String content, String assigneeId, String creatorId, Date created) {
        NotificationRequest notificationRequest = new NotificationRequest();
        notificationRequest.setContent(content);
        notificationRequest.setAssigneeId(assigneeId);
        notificationRequest.setCreatorId(creatorId);
        notificationRequest.setCreated(created);

        notificationTransactions.save(notificationRequest.convertFromDTO());
    }

    public void deleteNotificationById(String notificationId) {
        if (!notificationTransactions.existsById(notificationId)) {
            //TODO: exception throw
            return;
        }
        notificationTransactions.deleteById(notificationId);
    }

    public void deleteNotificationsByAssigneeId(String assigneeId) {
        notificationTransactions.deleteByAssigneeId(assigneeId);
    }

    public void updateAllNotificationsByAssigneeId(String assigneeId) {
        notificationTransactions.updateAllNotificationsByAssigneeId(assigneeId, Boolean.TRUE);
    }
}
