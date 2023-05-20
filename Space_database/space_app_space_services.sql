-- MySQL dump 10.13  Distrib 8.0.31, for macos12 (x86_64)
--
-- Host: localhost    Database: space_app
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `space_services`
--

DROP TABLE IF EXISTS `space_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rid_space` int NOT NULL,
  `rid_service` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_space_services_spaces1_idx` (`rid_space`),
  KEY `fk_space_services_services1_idx` (`rid_service`),
  CONSTRAINT `fk_space_services_services1` FOREIGN KEY (`rid_service`) REFERENCES `services` (`id`),
  CONSTRAINT `fk_space_services_spaces1` FOREIGN KEY (`rid_space`) REFERENCES `spaces` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_services`
--

LOCK TABLES `space_services` WRITE;
/*!40000 ALTER TABLE `space_services` DISABLE KEYS */;
INSERT INTO `space_services` VALUES (93,63,1),(94,63,4),(95,63,12),(96,63,9),(97,63,2),(98,63,3),(99,63,10),(100,63,7),(101,64,8),(102,64,9),(103,64,5),(104,64,4),(105,64,12),(106,64,14),(107,64,7),(108,64,10),(109,64,13),(110,64,3),(111,64,2),(112,65,1),(113,65,4),(114,65,9),(115,65,2),(116,65,12),(117,65,3),(118,65,7),(119,65,10);
/*!40000 ALTER TABLE `space_services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 15:21:24
