package com.babulens.weighbridge.configuration;

import com.babulens.weighbridge.service.AdminSettingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
@EnableScheduling
public class DBAutoBackupController {

    private final AdminSettingService adminSettingService;
    private final EntityManager entityManager;

    @Autowired
    public DBAutoBackupController(AdminSettingService adminSettingService, EntityManager entityManager) {
        this.adminSettingService = adminSettingService;
        this.entityManager = entityManager;
    }

    @Scheduled(initialDelay = 300000, fixedDelay = 21600000)
    @Transactional
    public void schedule() {
        if ("true".equalsIgnoreCase(adminSettingService.getAdminSetting("BACKUP"))) {
            entityManager.createNativeQuery("BACKUP TO 'backup/backup_" + DateTimeFormatter.ofPattern("yyyy_MM_dd_HH_mm").format(LocalDateTime.now()) + ".zip'").executeUpdate();
        }
    }
}