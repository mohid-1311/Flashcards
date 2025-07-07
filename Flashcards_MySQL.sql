--
-- Table structure for table `users`
--
CREATE TABLE IF NOT EXISTS `users` (
  `name` varchar(16) NOT NULL,
  `password` varchar(64) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Table structure for table `decks`
--
CREATE TABLE IF NOT EXISTS `decks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `user_name` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_name` (`user_name`),
  CONSTRAINT `decks_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--
-- Table structure for table `cards`
--
CREATE TABLE IF NOT EXISTS `cards` (
  `id` int NOT NULL AUTO_INCREMENT,
  `term` text NOT NULL,
  `definition` text NOT NULL,
  `weight` int NOT NULL,
  `deck_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `deck_id` (`deck_id`),
  CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`deck_id`) REFERENCES `decks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
