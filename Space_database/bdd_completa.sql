CREATE DATABASE  IF NOT EXISTS `space_app` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `space_app`;
-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: space_app
-- ------------------------------------------------------
-- Server version	5.7.28

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
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `payment_method` varchar(45) DEFAULT NULL,
  `message` varchar(200) DEFAULT NULL,
  `rid_booker_user` int(11) NOT NULL,
  `rid_space` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_bookings_users1_idx` (`rid_booker_user`),
  KEY `fk_bookings_spaces1_idx` (`rid_space`),
  CONSTRAINT `fk_bookings_spaces1` FOREIGN KEY (`rid_space`) REFERENCES `spaces` (`id`),
  CONSTRAINT `fk_bookings_users1` FOREIGN KEY (`rid_booker_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (1,'2023-10-10','2023-10-11',0,'cash','lorem lorem',1,2),(2,'2023-11-10','2023-11-12',1,'cash','loremmm',2,3),(3,'2023-08-10','2023-08-12',2,'usd','hola soy mengano, quiero alquilar',2,3);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dates`
--

DROP TABLE IF EXISTS `dates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dates` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `available` tinyint(4) DEFAULT NULL,
  `spaces_id_space` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_dates_spaces1_idx` (`spaces_id_space`),
  CONSTRAINT `fk_dates_spaces1` FOREIGN KEY (`spaces_id_space`) REFERENCES `spaces` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dates`
--

LOCK TABLES `dates` WRITE;
/*!40000 ALTER TABLE `dates` DISABLE KEYS */;
/*!40000 ALTER TABLE `dates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preferences`
--

DROP TABLE IF EXISTS `preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `preference_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preferences`
--

LOCK TABLES `preferences` WRITE;
/*!40000 ALTER TABLE `preferences` DISABLE KEYS */;
INSERT INTO `preferences` VALUES (1,'Música'),(2,'Deporte'),(3,'Comida y bebida'),(4,'Moda'),(5,'Viajes'),(6,'Tecnología'),(7,'Cultura'),(8,'Negocios y emprendimiento'),(9,'Bienestar'),(10,'Aventura');
/*!40000 ALTER TABLE `preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Aire acondicionado'),(2,'Sillas'),(3,'Microondas'),(4,'Mesas'),(5,'Wi-Fi '),(6,'Pizarra'),(7,'Nevera'),(8,'Horno'),(9,'Altavoces'),(10,'Congelador'),(11,'Impresora'),(12,'Lavabo'),(13,'Televisión'),(14,'Café'),(15,'Mesa de Mezclas');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `space_services`
--

DROP TABLE IF EXISTS `space_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `space_services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid_space` int(11) NOT NULL,
  `rid_service` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_space_services_spaces1_idx` (`rid_space`),
  KEY `fk_space_services_services1_idx` (`rid_service`),
  CONSTRAINT `fk_space_services_services1` FOREIGN KEY (`rid_service`) REFERENCES `services` (`id`),
  CONSTRAINT `fk_space_services_spaces1` FOREIGN KEY (`rid_space`) REFERENCES `spaces` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `space_services`
--

LOCK TABLES `space_services` WRITE;
/*!40000 ALTER TABLE `space_services` DISABLE KEYS */;
INSERT INTO `space_services` VALUES (93,63,1),(94,63,4),(95,63,12),(96,63,9),(97,63,2),(98,63,3),(99,63,10),(100,63,7),(101,64,8),(102,64,9),(103,64,5),(104,64,4),(105,64,12),(106,64,14),(107,64,7),(108,64,10),(109,64,13),(110,64,3),(111,64,2),(112,65,1),(113,65,4),(114,65,9),(115,65,2),(116,65,12),(117,65,3),(118,65,7),(119,65,10);
/*!40000 ALTER TABLE `space_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spaces`
--

DROP TABLE IF EXISTS `spaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spaces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `capacity` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(300) NOT NULL,
  `rules` varchar(300) DEFAULT NULL,
  `space_picture` varchar(280) DEFAULT NULL,
  `rid_host_user` int(11) NOT NULL,
  `lat` varchar(45) DEFAULT NULL,
  `long` varchar(45) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_spaces_users1_idx` (`rid_host_user`),
  CONSTRAINT `fk_spaces_users1` FOREIGN KEY (`rid_host_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spaces`
--

LOCK TABLES `spaces` WRITE;
/*!40000 ALTER TABLE `spaces` DISABLE KEYS */;
INSERT INTO `spaces` VALUES (1,'Bar Carlos ','Carlos 2020','20',100,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lala',1,'','',''),(2,'Resto Monick','Moni 3020','100',200,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lalala',3,'','',''),(3,'Chiringo','san juan 2345','50',130,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lololo',1,'','',''),(4,'El Torreon','la costa 3030','20',90,'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lulu',2,'','',''),(5,'Sala Atmo ','Atmo 5050','500',500,'lalala','>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus','lala',1,'','',''),(63,'Casal de Joves Can Ricart','C/ de los gatitos, 14','80',90,'Tiene sala de conciertos, barra y patio interior.','Se debe recoger antes de las 10 del día siguiente. Fianza de 300€.','1683303271130-can-ricart.jpeg',9,'41.408408249999994','2.199194902372489','public'),(64,'Casal de Jovenes deTamarit','C/ de los perritos, 14','120',148,'Esta a pie de playa, tiene barra y neveras.','Se ha de recoger todo lo que se manche. Fianza de 500 €.',NULL,9,'41.13280459615311','1.3496370617987319','public'),(65,'Casal de Joves de Torredembarra','C/ de los perros, 14','120',150,'Esta al lado de la playa, tiene barra y instalación de frío.','Se puede fumar.\nHorario hasta las 3h00.\nHay que dejar todo como se encontró.\nFianza de 300€.','1683380107730-m-01campamentos-en-la-playa-en-casas-de-colonias-catalunya720.jpeg',9,'41.14577930249906','1.400771684435778','public');
/*!40000 ALTER TABLE `spaces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_preferences`
--

DROP TABLE IF EXISTS `user_preferences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_preferences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rid_user` int(11) NOT NULL,
  `rid_preference` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_preferences_users1_idx` (`rid_user`),
  KEY `fk_user_preferences_preferences1_idx` (`rid_preference`),
  CONSTRAINT `fk_user_preferences_preferences1` FOREIGN KEY (`rid_preference`) REFERENCES `preferences` (`id`),
  CONSTRAINT `fk_user_preferences_users1` FOREIGN KEY (`rid_user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_preferences`
--

LOCK TABLES `user_preferences` WRITE;
/*!40000 ALTER TABLE `user_preferences` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_preferences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_names` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `profile_picture` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) NOT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Mariano','Calabria','ca@gmai.com','lalala','223456878','ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus perspiciatis. Nihil, sunt voluptatibus, vitae accusantium omnis illum sint ut aut debitis natus ipsam minima ad reiciendis commodi? Maiores!','1234'),(2,'Jorgelina','Merlo','merlo@gmail.com','lala','6876457','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus perspiciatis. Nihil, sunt voluptatibus, vitae accusantium omnis illum sint ut aut debitis natus ipsam minima ad reiciendis commodi? Maiores!','4567'),(3,'','','','','656656656','Me gusta organizar eventos de Kpop y otakos.','2345'),(4,'Carlos','Mura','mura@gmail.com','lala','4567687','lorem lorem lorem','5678'),(5,'Marta','Checo','checo@gmail.com','lala','5865487654','Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus perspiciatis. Nihil, sunt voluptatibus, vitae accusantium omnis illum sint ut aut debitis natus ipsam minima ','5666'),(6,'Julio','Morgan','juan@gmai.com','lolo','29299292','ipsum dolor sit amet consectetur, adipisicing elit. Accusamus odio delectus perspiciatis. Nihil, sunt voluptatibus, vitae accusantium omnis illum sint ut aut debitis natus ipsam minima ad reiciendis commodi? Maiores!','2222'),(7,'Cintia Murashima','Cintia Murashima','lara@gmail.com',NULL,'687687',NULL,'1234'),(8,'cintia','murashima','lara@gmail.com',NULL,'lara@gmail.com',NULL,'1234'),(9,'Alejandro','Velardo Lucero','email@mail.com','_PVE5796.jpg','606411123','Me gustan los eventos musicales y cocinar! ','$2b$10$CnoaVFSzXIrRLbuD36RjrOEmLBFET1CGTWlDK1BwfybOL2Sa.4yU6'),(10,'ales','ales','ales@ales.com',NULL,'1234123123',NULL,'1234'),(11,'Test','Test','test@test.com',NULL,'123412341',NULL,'1234'),(12,'test2','test','email@mail.com',NULL,'1234123123',NULL,'1234'),(13,'test3','test','email@mail.com',NULL,'1234123123',NULL,'1234'),(14,'ryrtyr','rtyrtyrty','email@mail.com',NULL,'rtyrtyr',NULL,'1234');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-20 13:50:17
