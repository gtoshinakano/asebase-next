# Host: sql690.main-hosting.eu  (Version 5.5.5-10.5.13-MariaDB-cll-lve)
# Date: 2022-05-02 05:34:39
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "accounts"
#

DROP TABLE IF EXISTS `accounts`;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL DEFAULT 0,
  `userId` int(11) DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `refresh_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `session_state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "accounts"
#

INSERT INTO `accounts` VALUES (1,3,'google',NULL,'ya29.a0ARrdaM8IUslKyacux6cs6uA7GFJlGFPrX3Suq1cekUYVOqtKP0EaeMVsxcU3NefXY3JyzndaT_Psz20hmWvUBVQ20bIOdo1tzA9LCkUn1IgD2KW9mQX3mMZXGuJnyI36izCcrUuUMywNxquTPipOP7Gfvyz0',2147483647,NULL,NULL,NULL,NULL,'',''),(2,4,'google',NULL,'ya29.a0ARrdaM9PypocBsh9kOOCNfEyw1hD9wOfWrBOQn2nvoJmiRP8HOg6pJI_2S-9AJWV2WEKxDmrOXeJ1jWLrsp1qQeOOJtEy5x8mu8-ar6oocNkuEApP0h-qVdEb6fOQC7YeZUwfTaWd7rloYB3d4lXLHXm23VP',2147483647,NULL,NULL,NULL,NULL,'',''),(5,7,'google',NULL,'ya29.a0ARrdaM8Z11O6aEdQMkX1ih46EK5a-Oy2YI3i3I7_jCxrzcLzgtrzRA11drcZezcaBCIJ8-nKek97tvBwgmOaHF7py3vouuvb1BIMDDEXLlYfLwd5KKTsLYjk7Gi5Rv01Cbev0vecQ2d5qJwHvwwddgHwMmNW',2147483647,NULL,NULL,NULL,NULL,'','');

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
# Data for table "japan_provinces"
#

INSERT INTO `japan_provinces` VALUES ('JP','Japão','','None',NULL,NULL),('JP-01','Hokkaido','北海道','Hokkaido',X'000000000101000000DA71C3EFA6B34540DA71C3EFA6B34540',X'000000000101000000D704DF02F7824540D704DF02F7824540'),('JP-02','Aomori','青森','Tohoku',X'000000000101000000B18A37328F5A4440B18A37328F5A4440',X'000000000101000000BB3C6A316D2D4440BB3C6A316D2D4440'),('JP-03','Iwate','岩手','Tohoku',X'000000000101000000153AAFB14BBA4340153AAFB14BBA4340',X'0000000001010000004BDDADD7908643404BDDADD790864340'),('JP-04','Miyagi','宮城','Tohoku',X'000000000101000000890B40A374254340890B40A374254340',X'00000000010100000087488CDA26E5424087488CDA26E54240'),('JP-05','Akita','秋田','Tohoku',X'000000000101000000BB48A12C7CFD4340BB48A12C7CFD4340',X'000000000101000000C0003BE2C0A74340C0003BE2C0A74340'),('JP-06','Yamagata','山形','Tohoku',X'000000000101000000091A33897A254340091A33897A254340',X'000000000101000000E0EE276775024340E0EE276775024340'),('JP-07','Fukushima','福島','Tohoku',X'000000000101000000A514747B49AF4240A514747B49AF4240',X'00000000010100000048D5EBD76456424048D5EBD764564240'),('JP-08','Ibaraki','茨城','Kanto',X'0000000001010000002DCF83BBB32842402DCF83BBB3284240',X'000000000101000000EAFFCE77B2E64140EAFFCE77B2E64140'),('JP-09','Tochigi','栃木','Kanto',X'000000000101000000226DE34F54504240226DE34F54504240',X'000000000101000000A772C17696084240A772C17696084240'),('JP-10','Gunma','群馬','Kanto',X'000000000101000000E23D079623584240E23D079623584240',X'000000000101000000AE0C5EB671F84140AE0C5EB671F84140'),('JP-11','Saitama','埼玉','Kanto',X'000000000101000000459DB98784F34140459DB98784F34140',X'000000000101000000B02431322AB14140B02431322AB14140'),('JP-12','Chiba','千葉','Kanto',X'000000000101000000130B7C45B7B24140130B7C45B7B24140',X'000000000101000000CCA07AF2C1634140CCA07AF2C1634140'),('JP-13','Tokyo','東京','Kanto',X'0000000001010000007BF5F1D077DD41407BF5F1D077DD4140',X'00000000010100000020DE14EED58E414020DE14EED58E4140'),('JP-14','Kanagawa','神奈川','Kanto',X'0000000001010000001BF1643733B241401BF1643733B24140',X'00000000010100000082CFE509E7CF404082CFE509E7CF4040'),('JP-15','Niigata','新潟','Chubu',X'000000000101000000FE63213A04A24240FE63213A04A24240',X'000000000101000000103CA0D09DB94240103CA0D09DB94240'),('JP-16','Toyama','富山','Chubu',X'0000000001010000004A95287B4B7742404A95287B4B774240',X'0000000001010000007E0E2850A5A642407E0E2850A5A64240'),('JP-17','Ishikawa','石川','Chubu',X'000000000101000000A3CA30EE063B4240A3CA30EE063B4240',X'000000000101000000B59A08BBFE404240B59A08BBFE404240'),('JP-18','Fukui','福井','Chubu',X'00000000010100000076E3DD91B1FA414076E3DD91B1FA4140',X'000000000101000000AEE55EF4B3064240AEE55EF4B3064240'),('JP-19','Yamanashi','山梨','Chubu',X'000000000101000000FBCA83F414C54140FBCA83F414C54140',X'000000000101000000E98F42976D824140E98F42976D824140'),('JP-20','Nagano','長野','Chubu',X'0000000001010000007C0DC171191742407C0DC17119174240',X'000000000101000000056EDD19C8B64140056EDD19C8B64140'),('JP-21','Gifu','岐阜','Chubu',X'0000000001010000006FD40AD3F7F641406FD40AD3F7F64140',X'0000000001010000006FD40AD3F7F641406FD40AD3F7F64140'),('JP-22','Shizuoka','静岡','Chubu',X'000000000101000000EF02250516484140EF02250516484140',X'0000000001010000000A573142C6A140400A573142C6A14040'),('JP-23','Aichi','愛知','Chubu',X'0000000001010000008DD0CFD4EB8641408DD0CFD4EB864140',X'0000000001010000002454AA1FB3A340402454AA1FB3A34040'),('JP-24','Mie','三重','Kansai',X'0000000001010000001F84807C090941401F84807C09094140',X'000000000101000000ED1CD3396AF04040ED1CD3396AF04040'),('JP-25','Shiga','滋賀','Kansai',X'000000000101000000F60CE19865EB4140F60CE19865EB4140',X'0000000001010000003F0A0A89F55941403F0A0A89F5594140'),('JP-26','Kyoto','京都','Kansai',X'0000000001010000006F0D6C9560A341406F0D6C9560A34140',X'000000000101000000CFC3217E4D544140CFC3217E4D544140'),('JP-27','Osaka','大阪','Kansai',X'0000000001010000002AFD84B35B5741402AFD84B35B574140',X'0000000001010000005C0328BD8F0141405C0328BD8F014140'),('JP-28','Hyogo','兵庫','Kansai',X'0000000001010000007D08AA46AFF441407D08AA46AFF44140',X'000000000101000000EABD3C7DB3004240EABD3C7DB3004240'),('JP-29','Nara','奈良','Kansai',X'00000000010100000088670932022C414088670932022C4140',X'000000000101000000D995EE850ADC4040D995EE850ADC4040'),('JP-30','Wakayama','和歌山','Kansai',X'000000000101000000D5B2B5BE48EE4040D5B2B5BE48EE4040',X'000000000101000000E091729E71144040E091729E71144040'),('JP-31','Tottori','鳥取','Chugoku',X'0000000001010000007EE02A4F20E441407EE02A4F20E44140',X'000000000101000000826CD58C29F04140826CD58C29F04140'),('JP-32','Shimane','島根','Chugoku',X'00000000010100000072FE261422C6414072FE261422C64140',X'0000000001010000001F6B8156D5A141401F6B8156D5A14140'),('JP-33','Okayama','岡山','Chugoku',X'0000000001010000009AD18F86535E41409AD18F86535E4140',X'0000000001010000004EF08922272141404EF0892227214140'),('JP-34','Hiroshima','広島','Chugoku',X'000000000101000000840F255AF2484140840F255AF2484140',X'00000000010100000046F2B89731F9404046F2B89731F94040'),('JP-35','Yamaguchi','山口','Chugoku',X'000000000101000000D49B51F355184140D49B51F355184140',X'0000000001010000007D907A46C3DA40407D907A46C3DA4040'),('JP-36','Tokushima','徳島','Shikoku',X'0000000001010000009240834D9DEB40409240834D9DEB4040',X'00000000010100000060E0325AF694404060E0325AF6944040'),('JP-37','Kagawa','香川','Shikoku',X'000000000101000000C554FA09671F4140C554FA09671F4140',X'000000000101000000297BD28B57CF4040297BD28B57CF4040'),('JP-38','Ehime','愛媛','Shikoku',X'000000000101000000815A0C1EA6D74040815A0C1EA6D74040',X'000000000101000000DB79004E62744040DB79004E62744040'),('JP-39','Kochi','高知','Shikoku',X'0000000001010000000D18247D5A9140400D18247D5A914040',X'000000000101000000AC4D2AF984464040AC4D2AF984464040'),('JP-40','Fukuoka','福岡','Kyushu',X'000000000101000000419AB1683AD94040419AB1683AD94040',X'000000000101000000817E11FD0FF84040817E11FD0FF84040'),('JP-41','Saga','佐賀','Kyushu',X'00000000010100000094FAB2B453D5404094FAB2B453D54040',X'000000000101000000F0094C1F15594040F0094C1F15594040'),('JP-42','Nagasaki','長崎','Kyushu',X'00000000010100000090BE49D3A066404090BE49D3A0664040',X'000000000101000000FC44E57A562E4040FC44E57A562E4040'),('JP-43','Kumamoto','熊本','Kyushu',X'000000000101000000C85F5AD4275F4040C85F5AD4275F4040',X'000000000101000000DA8399CC1F014040DA8399CC1F014040'),('JP-44','Oita','大分','Kyushu',X'0000000001010000006F1118EB1B9240406F1118EB1B924040',X'000000000101000000849C2BD9884D4040849C2BD9884D4040'),('JP-45','Miyazaki','宮崎','Kyushu',X'0000000001010000007769C36169D83F407769C36169D83F40',X'00000000010100000078674E7D4F733F4078674E7D4F733F40'),('JP-46','Kagoshima','鹿児島','Kyushu',X'000000000101000000AE64C74620323F40AE64C74620323F40',X'00000000010100000009EE0B37E6723E4009EE0B37E6723E40'),('JP-47','Okinawa','沖縄','Kyushu',X'000000000101000000F3AE7AC03C643B40F3AE7AC03C643B40',X'0000000001010000000AC8AF3315D639400AC8AF3315D63940');

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
# Data for table "organization"
#

INSERT INTO `organization` VALUES (1,'HIECC - Hokkaido International and Cooperation Center - Associação Hokkaido',X'0000000001010000003C2EF9C94988454007D1BE5510AB6140','https://www.hiecc.or.jp/','Japão, 〒060-0003 Hokkaido, 札幌市中央区Chuo Ward, 北３条西７丁目 北海道庁別館 12 階'),(2,'JICA - Japan International Cooperation Agency',NULL,'https://www.jica.go.jp/brazil/portuguese/office/index.html',NULL),(12,'wfwef',X'','',''),(13,'HIECC',X'','','');

#
# Structure for table "sessions"
#

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `sessionToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "sessions"
#


#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "users"
#

INSERT INTO `users` VALUES ('Toshinori','gtoshinakano@gmail.com','2022-04-20 05:45:35',NULL),(NULL,'mjz_tox@hotmail.com','2021-11-03 20:39:15',NULL),('Thaís Watanabe','watanabethata@gmail.com','2021-11-03 23:46:29','https://lh3.googleusercontent.com/a-/AOh14Gh4Nj_AOb7MsLX8JOT9VLoTE8pCts7MCREJf1blyw=s96-c'),('wedoit japan','wedoit.nft@gmail.com','2021-11-04 06:20:00','https://lh3.googleusercontent.com/a/AATXAJyAae50ugVfNSJUsxomKmuEQEUQoRFDlpL18_P4=s96-c'),('Wesley Yudi Shimazaki','wesley.yudi@gmail.com','2021-11-11 23:58:55','https://lh3.googleusercontent.com/a-/AOh14GiJ7_Bx8pQbWJk7nfnSGEvOj9ZfM26Wbb-M5E_Kyw=s96-c'),('Bombowl Business','bombowlb@gmail.com','2022-05-01 11:29:41','https://lh3.googleusercontent.com/a/AATXAJx-mPbshVYPfzqEWXlpsZrapOnwd-bqYMbU2wGn=s96-c');

#
# Structure for table "users_info"
#

DROP TABLE IF EXISTS `users_info`;
CREATE TABLE `users_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_id` int(11) NOT NULL,
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
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `users_id_UNIQUE` (`auth_id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`),
  KEY `fk_user_info_users_idx` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "users_info"
#

INSERT INTO `users_info` VALUES (1,1,'Gabriel','m','1988-04-09 00:00:00','BRA','São Paulo','São Paulo',0,0,NULL,0,NULL,'2022-04-20 02:00:41.000000',NULL,0),(2,2,NULL,NULL,'1988-03-12 00:00:00','BRA','São Paulo','São Paulo',0,0,NULL,0,NULL,'2021-11-03 21:06:46.000000',NULL,0),(4,4,NULL,'f',NULL,'BRA',NULL,NULL,0,0,NULL,0,NULL,'2022-04-23 03:52:20.000000',NULL,0),(7,7,NULL,NULL,NULL,'BRA',NULL,NULL,0,0,NULL,0,NULL,NULL,NULL,0),(8,8,'Gabriel Toshinori Nakano','m','1988-02-01 00:00:00',NULL,'São Paulo','São Paulo',1,0,NULL,0,NULL,'2022-04-20 07:51:51.000000',NULL,0);

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
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_professional_data_users_info1_idx` (`user_id`),
  CONSTRAINT `fk_professional_data_users_info1` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "professional_data"
#

INSERT INTO `professional_data` VALUES (58,1920,2021,'qwerweqwe','qweqweqwe',1,2),(61,2022,2022,'Full Stack Developer','Your Company',1,8);

#
# Structure for table "exchange"
#

DROP TABLE IF EXISTS `exchange`;
CREATE TABLE `exchange` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
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
  KEY `fk_users_info_has_japan_provinces_users_info1_idx` (`user_id`),
  KEY `fk_exchange_organization1_idx` (`organization_id`),
  CONSTRAINT `fk_exchange_organization1` FOREIGN KEY (`organization_id`) REFERENCES `organization` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_info_has_japan_provinces_japan_provinces1` FOREIGN KEY (`province_code`) REFERENCES `japan_provinces` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_info_has_japan_provinces_users_info1` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "exchange"
#

INSERT INTO `exchange` VALUES (70,2,'JP-38',1924,2,1,1924,1,1924,'wefwefwe',12,1,'23423dsfsdf','',NULL,'234234','wefwe'),(79,8,'JP-01',2018,3,1,2018,2,2018,'Hokkaido',13,2,'Hokkaido Culture','',NULL,'',''),(80,8,'JP-01',2020,1,6,2020,4,2021,'Hokkai Gakuen Daigaku',13,1,'ROS for drones control','',NULL,'','');

#
# Structure for table "japanese_origins"
#

DROP TABLE IF EXISTS `japanese_origins`;
CREATE TABLE `japanese_origins` (
  `user_id` int(11) NOT NULL,
  `province_code` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `degree` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`province_code`),
  KEY `fk_user_info_has_japan_provinces_japan_provinces1_idx` (`province_code`),
  KEY `fk_user_info_has_japan_provinces_user_info1_idx` (`user_id`),
  CONSTRAINT `fk_user_info_has_japan_provinces_japan_provinces1` FOREIGN KEY (`province_code`) REFERENCES `japan_provinces` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_info_has_japan_provinces_user_info1` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "japanese_origins"
#

INSERT INTO `japanese_origins` VALUES (8,'JP-01','0'),(8,'JP-11','1-1'),(8,'JP-40','1-0');

#
# Structure for table "academic_info"
#

DROP TABLE IF EXISTS `academic_info`;
CREATE TABLE `academic_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `institution_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `subject` varchar(155) COLLATE utf8mb4_unicode_ci NOT NULL,
  `year` int(4) NOT NULL,
  `study_area` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `fk_academic_info_users_info1_idx` (`user_id`),
  CONSTRAINT `fk_academic_info_users_info1` FOREIGN KEY (`user_id`) REFERENCES `users_info` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "academic_info"
#

INSERT INTO `academic_info` VALUES (42,'cwecwcwecwe',2,'wcecwe',1922,1),(52,'UNINOVE',8,'System Development',2010,1),(53,'FATEC',8,'Business Management',2013,2);

#
# Structure for table "verification_tokens"
#

DROP TABLE IF EXISTS `verification_tokens`;
CREATE TABLE `verification_tokens` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `identifier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

#
# Data for table "verification_tokens"
#

INSERT INTO `verification_tokens` VALUES (NULL,'gtoshinakano@gmail.com','04b89df45e5d9492bcae6a584aa4164097d280b1644a1e5459147f32f23cd56a','2021-11-01 00:37:07.712000'),(NULL,'gtoshinakano@gmail.com','086195e0816f6061732e09288d20bef36add41f2a80704a3e84ebd88ccbd4364','2021-11-01 00:25:50.078000'),(NULL,'gtoshinakano@gmail.com','0f17119d5a3848b7dd42e7c971b716023aeafdefa07ad941c79bb7c0e8774022','2022-04-21 03:33:58.453000'),(NULL,'gtoshinakano@gmail.com','1393814d5d0b982b8740ead204f6a003983746e0fdb091e144a090fca942e9d4','2021-11-01 00:26:48.706000'),(NULL,'gtoshinakano@gmail.com','1a488f657e373944b267d11b4267bef99b4b57cca03a656c030380706cbd967a','2021-11-01 00:17:09.911000'),(NULL,'gtoshinakano@gmail.com','1c4b082fd2e5ac2c388aba8c2808ebe30a4b873cecda619fe77c1b786fc1436a','2021-10-31 22:38:34.351000'),(NULL,'gtoshinakano@gmail.com','24ee8f8147b14a6050e33223e98cc4e2977098aaa0a9f47841bc643d4f80ed28','2021-11-01 01:44:15.249000'),(NULL,'gtoshinakano@gmail.com','31d078c12a4fff629be2fd0caf720dbe37bc53e8fedd4a6b8af307dca356a815','2021-10-31 20:37:11.827000'),(NULL,'gtoshinakano@gmail.com','3d2943718fde29f88ab1da1b4df0c0f1c1e017e94edee7d9bc35b56d9fe6a333','2021-10-12 16:56:03.024000'),(NULL,'bombowlb@gmail.com','562abd8bc968df7b67a24869894c85010c02e80e6a0d808bfcdf26584cd1c61e','2022-04-21 07:37:19.334000'),(NULL,'gtoshinakano@gmail.com','5c249e7c00724b623b579187974aa6aacbc2f089962a0b22282332387e1bfe42','2021-10-02 21:02:51.005000'),(NULL,'gtoshinakano@gmail.com','5f50a010ac9f9f921115266ab4f6590ff9a4f7e3e79cd42eb3f47e8e6297b402','2021-11-01 00:22:59.893000'),(NULL,'gtoshinakano@gmail.com','5f77741d557d7a00bae86914738c07deb43f03d03c80be5dc6123c84ba2489f7','2021-10-31 23:55:13.723000'),(NULL,'bombowlb@gmail.com','603ec93adb9502a69fec51b8a251dacdcb4a8380759517a669273b33c1b3d44f','2022-04-21 04:07:01.276000'),(NULL,'gtoshinakano@gmail.com','689fa3486fc6fbd15de7e891af9059de7defb791e5cff934a3906bab941fa9df','2021-11-04 20:37:44.537000'),(NULL,'gtoshinakano@gmail.com','6ddda25369034817a48b611b12482cb186f0f85e1747c87de082a546cc6ef575','2022-04-24 03:50:13.291000'),(NULL,'gtoshinakano@gmail.com','6ece33674f64ce628eb108f71468f044e7986757d89aec10b7c6654c7581b7ab','2021-10-31 20:41:09.436000'),(NULL,'gtoshinakano@gmail.com','79f97d32945de024b056bb8a511472a590a65cb4ab99f7d3c8aa3ad66328e3ee','2021-11-01 02:06:09.676000'),(NULL,'bombowl@gmail.com','7d7351de93aadb8b4b8cf3154d82217e1e5ab39c9978a7777e6039b7327ed31a','2022-04-21 04:39:26.485000'),(NULL,'gtoshinakano@gmail.com','87d4e6e646ebc3a8e32bd266b028105942b6923b0eb18698ad90438599beb0f2','2022-04-21 06:20:35.547000'),(NULL,'gtoshinakano@gmail.com','9e9d93c29928903663b7d4d5984261e8b17099171506feb39f8b299dc3ecfdad','2021-09-24 18:10:12.619000'),(NULL,'gtoshinakano@gmail.com','a523a59d7031ab9e9bb63d542ceb559baa84e7eb7e07d7ac69197a73ea40d06b','2021-09-25 14:56:27.713000'),(NULL,'gtoshinakano@gmail.com','ac38561d04b0c3fa322b0b7da515d6ba2de71ae9515e05721f1dde5933361e17','2021-10-31 21:22:36.394000'),(NULL,'gtoshinakano@gmail.com','b618f67ecaa48d3502ec9763cc528b61424fa6cea366098647b015090185158c','2021-11-01 00:17:54.410000'),(NULL,'gtoshinakano@gmail.com','b871ecbb7d9a614c48a1f9369804cb30e6d972ad556bc349a37b6066a4c69190','2021-11-01 00:31:37.461000'),(NULL,'gtoshinakano@gmail.com','ba846f0bb36d60ff7fbff1f73062b64b4401b86af8be7f9beabbc59615bfea55','2022-04-21 04:20:17.819000'),(NULL,'gtoshinakano@gmail.com','c04262cd9c6e2f55210464c0f023dd3d536331fd81721dee19e2dd5d268301fb','2021-11-01 01:15:43.875000'),(NULL,'gtoshinakano@gmail.com','c1480d3f3c1dceac3ac0a53f8e201b80eab2d25bf9697f0b88941f29fa02b83f','2021-10-31 23:38:45.589000'),(NULL,'gtoshinakano@gmail.com','c659ab5dccf1c6d2da0c14582edc9ad1eaa4694c981c900ac4adb262c5d6bba9','2021-11-01 00:09:32.223000'),(NULL,'gtoshinakano@gmail.com','c9d2b04d200666ea1c97e4edeb235aee2baa12ea9043e6dea25d36a842dd0d59','2022-04-21 03:19:35.990000'),(NULL,'gtoshinakano@gmail.com','ca3762d996955312a6939efd844679c76fc23b7445fd50ee78d053ca22ea3d7c','2022-04-21 04:21:32.743000'),(NULL,'gtoshinakano@gmail.com','cb2a40e2ef678a2864674c43d3c52e578ed51921dc5c03723c425dce145b973e','2021-11-01 01:04:39.666000'),(NULL,'gtoshinakano@gmail.com','cfbf33d55f19e00d72d4b79b8e50c611ff30c93b4cf7381ad096fa63b1570ca6','2021-11-01 01:14:10.546000'),(NULL,'gtoshinakano@gmail.com','db4fd54b5a6132f2d406003b36f2423df6ea582db647f3457fd10dead46f541a','2021-11-01 01:14:47.417000'),(NULL,'gtoshinakano@gmail.com','e468f217872368b4093ebef56cd7adf970dce36a42fc0a01054c17fdeed597c4','2021-10-31 20:02:51.834000'),(NULL,'gtoshinakano@gmail.com','f47d525266d89b20b2206c773092a416bc3e26b239774cdbf02828bf7e0a3e82','2021-11-01 00:26:25.057000'),(NULL,'gtoshinakano@gmail.com','fc70990d2f2e3d41e13819980c84206c485c767dea1163b4e3b8e7ff31083f6e','2021-10-31 21:18:03.093000');
