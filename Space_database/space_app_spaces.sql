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
-- Table structure for table `spaces`
--

DROP TABLE IF EXISTS `spaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `capacity` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(300) NOT NULL,
  `rules` varchar(300) DEFAULT NULL,
  `space_picture` varchar(280) DEFAULT NULL,
  `rid_host_user` int NOT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `long` varchar(45) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_spaces_users1_idx` (`rid_host_user`),
  CONSTRAINT `fk_spaces_users1` FOREIGN KEY (`rid_host_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spaces`
--

LOCK TABLES `spaces` WRITE;
/*!40000 ALTER TABLE `spaces` DISABLE KEYS */;
INSERT INTO `spaces` VALUES (1,'Bar Carlos ','Carlos 2020','20',100,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lala',1,'','',''),(2,'Resto Monick','Moni 3020','100',200,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lalala',3,'','',''),(3,'Chiringo','san juan 2345','50',130,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lololo',1,'','',''),(4,'El Torreon','la costa 3030','20',90,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lulu',2,'','',''),(5,'Sala Atmo ','Atmo 5050','500',500,'lalala','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lala',1,'','',''),(63,'Casal de Joves Can Ricart','C/ de los gatitos, 14','80',90,'Tiene sala de conciertos, barra y patio interior.','Se debe recoger antes de las 10 del día siguiente. Fianza de 300€.','1683303271130-can-ricart.jpeg',9,'41.408408249999994','2.199194902372489','public'),(64,'Casal de Jovenes deTamarit','C/ de los perritos, 14','120',148,'Esta a pie de playa, tiene barra y neveras.','Se ha de recoger todo lo que se manche. Fianza de 500 €.',NULL,9,'41.13280459615311','1.3496370617987319','public'),(65,'Casal de Joves de Torredembarra','C/ de los perros, 14','120',150,'Esta al lado de la playa, tiene barra y instalación de frío.','Se puede fumar.\nHorario hasta las 3h00.\nHay que dejar todo como se encontró.\nFianza de 300€.','1683380107730-m-01campamentos-en-la-playa-en-casas-de-colonias-catalunya720.jpeg',9,'41.14577930249906','1.400771684435778','public');
/*!40000 ALTER TABLE `spaces` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08 15:21:23
