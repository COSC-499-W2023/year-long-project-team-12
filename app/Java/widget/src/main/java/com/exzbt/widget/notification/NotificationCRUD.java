package com.exzbt.widget.notification;

import com.exzbt.business.notification.NotificationService;
import com.exzbt.business.notification.mappers.NotificationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/notifications")
public class NotificationCRUD {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("{userId}")
    public List<NotificationDTO> getNotifications(@PathVariable("userId") String userId) {
        return notificationService.getNotificationsByAssigneeId(userId);
    }

    @PostMapping("update/{id}")
    public void updateNotifications(@PathVariable("id") String userId) {
         notificationService.updateAllNotificationsByAssigneeId(userId);
    }

    @DeleteMapping("delete/{notificationId}")
    public void deleteNotificationById(@PathVariable("notificationId") String notificationId) {
        notificationService.deleteNotificationById(notificationId);
    }

    @DeleteMapping("deleteAll/{id}")
    public void deleteAllNotifications(@PathVariable("id") String userId) {
        notificationService.deleteNotificationsByAssigneeId(userId);
    }
}
