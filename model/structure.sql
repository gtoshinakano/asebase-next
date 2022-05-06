# Host: sql690.main-hosting.eu  (Version 5.5.5-10.5.13-MariaDB-cll-lve)
# Date: 2022-05-03 02:03:41
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "accounts"
#

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3aa23c0a6d107393e8b40e3e2a6` (`userId`),
  CONSTRAINT `FK_3aa23c0a6d107393e8b40e3e2a6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "japan_provinces"
#

DROP TABLE IF EXISTS `japan_provinces`;
CREATE TABLE `japan_provinces` (
  `code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `japanese_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `region` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label_latlng` point DEFAULT NULL,
  `flag_latlng` point DEFAULT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `id_UNIQUE` (`code`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "organization"
#

DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_latlng` point DEFAULT NULL,
  `org_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailVerified` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "sessions"
#

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `userId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_8b5e2ec52e335c0fe16d7ec358` (`sessionToken`),
  KEY `FK_57de40bc620f456c7311aa3a1e6` (`userId`),
  CONSTRAINT `FK_57de40bc620f456c7311aa3a1e6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "users_info"
#

DROP TABLE IF EXISTS `users_info`;
CREATE TABLE `users_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `full_name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` char(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `birth_country` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT 'BRA',
  `birth_state` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_city` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_nikkei` tinyint(4) DEFAULT 0,
  `jp_generation` tinyint(1) DEFAULT 0,
  `map_latlng` point DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT 0,
  `created_at` timestamp(6) NULL DEFAULT NULL,
  `updated_at` timestamp(6) NULL DEFAULT NULL,
  `cpf` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blocked` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `fk_users` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "professional_data"
#

DROP TABLE IF EXISTS `professional_data`;
CREATE TABLE `professional_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_year` int(4) NOT NULL,
  `end_year` int(4) NOT NULL,
  `position` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_job` tinyint(1) NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_professional_data_users_info1_idx` (`user_id`),
  CONSTRAINT `fk_user_info_professional` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "exchange"
#

DROP TABLE IF EXISTS `exchange`;
CREATE TABLE `exchange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `province_code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `started_in` tinyint(2) DEFAULT NULL,
  `started_year` int(4) DEFAULT NULL,
  `ended_in` tinyint(2) DEFAULT NULL,
  `ended_year` int(4) DEFAULT NULL,
  `exchange_place` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organization_id` int(11) NOT NULL,
  `study_area` int(11) NOT NULL,
  `study_title` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `study_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exchange_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_exch_ref` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_exch_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_users_info_has_japan_provinces_japan_provinces1_idx` (`province_code`),
  KEY `fk_exchange_organization1_idx` (`organization_id`),
  KEY `fk_users_info_exch` (`user_id`),
  CONSTRAINT `fk_exchange_organization1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_info_exch` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`),
  CONSTRAINT `fk_users_info_has_japan_provinces_japan_provinces1` FOREIGN KEY (`province_code`) REFERENCES `japan_provinces` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "japanese_origins"
#

DROP TABLE IF EXISTS `japanese_origins`;
CREATE TABLE `japanese_origins` (
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `province_code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`province_code`),
  KEY `fk_user_info_has_japan_provinces_japan_provinces1_idx` (`province_code`),
  KEY `fk_user_info_has_japan_provinces_user_info1_idx` (`user_id`),
  CONSTRAINT `fk_user_info` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`),
  CONSTRAINT `fk_user_info_has_japan_provinces_japan_provinces1` FOREIGN KEY (`province_code`) REFERENCES `japan_provinces` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "academic_info"
#

DROP TABLE IF EXISTS `academic_info`;
CREATE TABLE `academic_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `institution_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `subject` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(4) NOT NULL,
  `study_area` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_academic_info_users_info1_idx` (`user_id`),
  CONSTRAINT `fk_academic_info_users_info` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "verification_tokens"
#

DROP TABLE IF EXISTS `verification_tokens`;
CREATE TABLE `verification_tokens` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identifier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
