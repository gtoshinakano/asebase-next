# Host: sql690.main-hosting.eu  (Version 5.5.5-10.5.13-MariaDB-cll-lve)
# Date: 2022-05-21 18:47:37
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "accounts"
#

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

CREATE TABLE `japan_provinces` (
  `label_latlng` point DEFAULT NULL,
  `flag_latlng` point DEFAULT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `japanese_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "organizations"
#

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `org_latlng` point DEFAULT NULL,
  `org_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_verified` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "users"
#

CREATE TABLE `users` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailVerified` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "sessions"
#

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

CREATE TABLE `users_info` (
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('m','f','') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `birth_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'BRA',
  `birth_state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `birth_city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_nikkei` tinyint(4) NOT NULL DEFAULT 0,
  `jp_generation` tinyint(4) DEFAULT NULL,
  `map_latlng` point DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `cpf` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `blocked` tinyint(4) NOT NULL DEFAULT 0,
  `auth_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_990f10c940baafed594485b77b` (`cpf`),
  UNIQUE KEY `REL_7437bd3bc436d6c56bcadfa42e` (`auth_id`),
  CONSTRAINT `FK_7437bd3bc436d6c56bcadfa42e7` FOREIGN KEY (`auth_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "professional_data"
#

CREATE TABLE `professional_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `current_job` tinyint(4) NOT NULL DEFAULT 0,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `position` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_year` int(4) NOT NULL,
  `end_year` int(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3944715b331f7fbc726601d4990` (`user_id`),
  CONSTRAINT `FK_3944715b331f7fbc726601d4990` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "japanese_origins"
#

CREATE TABLE `japanese_origins` (
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b3e3b6047eefa44c5e2fbf17183` (`user_id`),
  KEY `FK_9795e447c06b0b197b54659f322` (`province_code`),
  CONSTRAINT `FK_9795e447c06b0b197b54659f322` FOREIGN KEY (`province_code`) REFERENCES `japan_provinces` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_b3e3b6047eefa44c5e2fbf17183` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "exchanges"
#

CREATE TABLE `exchanges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(4) NOT NULL,
  `type` tinyint(4) NOT NULL,
  `started_month` int(2) NOT NULL,
  `started_year` int(4) NOT NULL,
  `ended_month` int(2) NOT NULL,
  `ended_year` int(4) NOT NULL,
  `exchange_place` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `study_area` tinyint(4) NOT NULL,
  `study_title` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `study_url` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `exchange_url` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_exch_ref` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `org_exch_title` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `organization_id` int(11) DEFAULT NULL,
  `province_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f128cb3fc6d1bbbc0549a114f01` (`organization_id`),
  KEY `FK_a3f4b9a0b39768a1368cc234690` (`province_code`),
  KEY `FK_e9163a94e04700841ca4067a209` (`user_id`),
  CONSTRAINT `FK_a3f4b9a0b39768a1368cc234690` FOREIGN KEY (`province_code`) REFERENCES `japan_provinces` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_e9163a94e04700841ca4067a209` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_f128cb3fc6d1bbbc0549a114f01` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "academic_info"
#

CREATE TABLE `academic_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `institution_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `subject` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(11) NOT NULL DEFAULT 2000,
  `study_area` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_138fce7ceb313035076c2059fdf` (`user_id`),
  CONSTRAINT `FK_138fce7ceb313035076c2059fdf` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`auth_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Structure for table "verification_tokens"
#

CREATE TABLE `verification_tokens` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `identifier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
