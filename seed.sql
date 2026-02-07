-- MySQL dump 10.13  Distrib 8.0.44, for Linux (x86_64)
--
-- Host: localhost    Database: contact_manager
-- ------------------------------------------------------
-- Server version	8.0.44-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (1,1,'John','Doe','john@random.com','5551234'),(2,1,'Sam','Hill','Samh@random.com','6372937'),(3,2,'Jack','Brand','Jb@random.com','363839'),(4,2,'Ari','Alison','Aa@random.com','4292367'),(5,3,'Sean','Sam','Seanss@random.com','192839'),(6,3,'Miley','Cyrus','Mileycc@apple.com','3728383'),(7,4,'Cynthia','Eric','Cynthiaee@apple.com','463829'),(8,4,'Derek','Fries','Ddfries@apple.com','8391018'),(9,5,'Silver','Jones','Silverj@random.com','3729329'),(10,5,'Smith','Taylor','Taylorss@apple.com','393947'),(11,6,'Drew','Dream','Dddreams@apple.com','7293937'),(12,6,'Jone','Jack','jjjack@random.com','83838301'),(13,7,'Ally','Smith','Allisonsmih@random.com','37203034'),(14,7,'Ruby','Rod','rrrubyyyy@apple.com','142637');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Aashish','Yadavally','AYadavally','COP4331'),(2,'Naddya','Favela','NFavela','COPUser1'),(3,'Sriya','Mahamkali','SMahamkali','COPUser2'),(4,'Alex','Song','ASong','COPUser3'),(5,'Ben','Andrew','BAndrew','COPUser4'),(6,'Sam','Trout','STrout','COPUser5'),(7,'Linh','Phan','LPhan','COPUser6');
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

-- Dump completed on 2026-01-31 21:56:51
