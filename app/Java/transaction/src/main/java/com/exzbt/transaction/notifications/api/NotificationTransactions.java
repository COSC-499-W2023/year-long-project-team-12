package com.exzbt.transaction.notifications.api;

import com.exzbt.transaction.notifications.impl.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@Transactional
public interface NotificationTransactions extends JpaRepository<Notification, String> {
    List<Notification> findByAssigneeId(String assigneeId);

    void deleteByAssigneeId(String assigneeId);

    @Modifying
    @Query("UPDATE Notification n SET n.viewed = ?2 WHERE n.assigneeId = ?1")
    void updateAllNotificationsByAssigneeId(String assigneeId, Boolean viewed);
}
