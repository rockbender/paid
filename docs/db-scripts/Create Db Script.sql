-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: 192.168.0.171    Database: paidDb
-- ------------------------------------------------------
-- Server version	5.5.5-10.3.25-MariaDB-0ubuntu1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Create Database
--
CREATE DATABASE `paidDb` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

--
-- Table structure for table `Invoice`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Invoice` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `CreatedDate` datetime NOT NULL,
  `InvoiceDate` datetime NOT NULL,
  `DueDate` datetime NOT NULL,
  `IsPaid` bit(1) NOT NULL DEFAULT b'0',
  `TimeSheetId` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Invoice_FK` (`TimeSheetId`),
  CONSTRAINT `Invoice_FK` FOREIGN KEY (`TimeSheetId`) REFERENCES `Timesheet` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Invoice`
--

LOCK TABLES `Invoice` WRITE;
/*!40000 ALTER TABLE `Invoice` DISABLE KEYS */;
INSERT INTO `Invoice` VALUES (2,'2021-04-18 00:00:00','2021-01-15 00:00:00','2021-01-31 00:00:00','\0',4);
INSERT INTO `Invoice` VALUES (3,'2021-04-18 00:00:00','2021-01-31 00:00:00','2021-02-15 00:00:00','\0',5);
/*!40000 ALTER TABLE `Invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Project`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Project` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `CreatedDate` datetime NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `IsActive` bit(1) NOT NULL DEFAULT b'1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Project`
--

LOCK TABLES `Project` WRITE;
/*!40000 ALTER TABLE `Project` DISABLE KEYS */;
INSERT INTO `Project` VALUES (1,'2021-04-18 00:00:00','WSBC',NULL,'');
INSERT INTO `Project` VALUES (2,'2021-04-18 00:00:00','EFRY',NULL,'');
/*!40000 ALTER TABLE `Project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TimeEntry`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TimeEntry` (
  `StartDate` datetime NOT NULL,
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `EndDate` datetime NOT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `TimeSheetId` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TimeEntry`
--

LOCK TABLES `TimeEntry` WRITE;
/*!40000 ALTER TABLE `TimeEntry` DISABLE KEYS */;
INSERT INTO `TimeEntry` VALUES ('2021-01-01 15:00:00',1,'2021-01-01 23:00:00','Regular pay period','2021-04-18 00:00:00',4);
INSERT INTO `TimeEntry` VALUES ('2021-01-02 15:00:00',2,'2021-01-03 00:00:00','Regular pay period','2021-04-18 00:00:00',4);
INSERT INTO `TimeEntry` VALUES ('2021-02-01 15:00:00',3,'2021-02-03 07:00:00','Regular pay period','2021-04-18 00:00:00',5);
INSERT INTO `TimeEntry` VALUES ('2021-02-16 15:00:00',4,'2021-02-18 09:00:00','Regular pay period','2021-04-18 00:00:00',6);
/*!40000 ALTER TABLE `TimeEntry` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Timesheet`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Timesheet` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createdDate` datetime NOT NULL,
  `projectId` bigint(20) NOT NULL,
  `PeriodStartDate` datetime NOT NULL,
  `PeriodEndDate` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Timesheet_FK` (`projectId`),
  CONSTRAINT `Timesheet_FK` FOREIGN KEY (`projectId`) REFERENCES `Project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Timesheet`
--

LOCK TABLES `Timesheet` WRITE;
/*!40000 ALTER TABLE `Timesheet` DISABLE KEYS */;
INSERT INTO `Timesheet` VALUES (4,'2021-04-18 00:00:00',1,'2021-01-01 12:00:00','2021-01-15 12:00:00');
INSERT INTO `Timesheet` VALUES (5,'2021-04-18 00:00:00',1,'2021-02-01 12:00:00','2021-02-15 12:00:00');
INSERT INTO `Timesheet` VALUES (6,'2021-04-18 00:00:00',1,'2021-02-16 12:00:00','2021-02-28 12:00:00');
/*!40000 ALTER TABLE `Timesheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'paidDb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-18  9:50:14
