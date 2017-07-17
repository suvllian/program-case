CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userNumber` varchar(128) DEFAULT NULL,
  `userName` varchar(128) DEFAULT NULL,
  `timeStamp` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE DATABASE baiji DEFAULT CHARACTER SET gbk COLLATE gbk_chinese_ci;