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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_names` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `profile_picture` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) NOT NULL,
  `bio` varchar(300) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
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

-- Dump completed on 2023-05-08 15:21:23
