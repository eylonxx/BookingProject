-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2022 at 03:53 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
(153, 61),
(153, 62),
(153, 63),
(153, 64),
(153, 65),
(153, 66),
(153, 67),
(154, 61),
(154, 62),
(154, 63),
(154, 64),
(154, 65),
(154, 66),
(155, 61),
(155, 64),
(156, 61),
(156, 62),
(156, 65),
(156, 67),
(157, 62),
(157, 66),
(157, 67),
(158, 62),
(158, 64),
(158, 66),
(159, 62),
(159, 66),
(159, 67),
(160, 61),
(160, 63),
(160, 66),
(160, 67);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(60, 'Eylon', 'Perets', 'Eylon', 'c4a812f3428990a7bc98a40e790dc39db5c9e35c41584c65eb4e489fbb1b55aa8fb174c536a79f1c0fdb0a4b98f0707ce07360f4b24643a30dc494935983b96f', 'Admin'),
(61, 'Moti', 'Luhim', 'motke', 'bc7a93cdfb228bc81fc8b1aa8c055feb02be762cc1ca75e42ac59d825afd619abe8bf55bc00c53ad1733a65043a524413c44cc17f4724f3fa55836ff0fbd3a70', 'User'),
(62, 'Beri', 'Tsakala', 'berchuk', '3f9ddb36058ae6164455095b03b1fe46fb6b02cdf4b4d200fc1e822f0327519e9bfcdd6fcdcf3d53fb47640c1d3280bcb654a86a171eb2b89a6d8a433c498253', 'User'),
(63, 'Ishi', 'Moto', 'ishimoto', 'c4a812f3428990a7bc98a40e790dc39db5c9e35c41584c65eb4e489fbb1b55aa8fb174c536a79f1c0fdb0a4b98f0707ce07360f4b24643a30dc494935983b96f', 'User'),
(64, 'Poli', 'Din', 'polidin', 'c4a812f3428990a7bc98a40e790dc39db5c9e35c41584c65eb4e489fbb1b55aa8fb174c536a79f1c0fdb0a4b98f0707ce07360f4b24643a30dc494935983b96f', 'User'),
(65, 'Tiki', 'Pur', 'tikipur', 'c4a812f3428990a7bc98a40e790dc39db5c9e35c41584c65eb4e489fbb1b55aa8fb174c536a79f1c0fdb0a4b98f0707ce07360f4b24643a30dc494935983b96f', 'User'),
(66, 'Itsik', 'Pensive', 'itske', 'c4a812f3428990a7bc98a40e790dc39db5c9e35c41584c65eb4e489fbb1b55aa8fb174c536a79f1c0fdb0a4b98f0707ce07360f4b24643a30dc494935983b96f', 'User'),
(67, 'Orna', 'Muh', 'orna', 'c4a812f3428990a7bc98a40e790dc39db5c9e35c41584c65eb4e489fbb1b55aa8fb174c536a79f1c0fdb0a4b98f0707ce07360f4b24643a30dc494935983b96f', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `imageName` varchar(255) NOT NULL,
  `startingDate` datetime NOT NULL,
  `endingDate` datetime NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `description`, `destination`, `imageName`, `startingDate`, `endingDate`, `price`, `followers`) VALUES
(153, ' Tokyo offers a seemingly unlimited choice of shopping, entertainment, culture and dining to its visitors. The city\'s history can be appreciated in districts such as Asakusa and in many excellent museums, historic temples and gardens.', 'Tokyo, Japan', 'c3654b4a-c8e8-44c2-a481-952f8c47de61.jpg', '2023-07-14 03:00:00', '2023-07-31 03:00:00', 10200, 7),
(154, 'It is overwhelmed with culture, history, iconic architecture, delicious food and exciting fashion. Paris is known for its many monuments, especially the Eiffel Tower, Notre-Dame Cathedral, Arc de Triomphe, Opéra Garnier, Les Invalides, etc.', 'Paris, France', '63930a6b-993a-4c99-a4d6-4837b74c3e54.jpg', '2022-10-13 03:00:00', '2022-10-20 03:00:00', 2000, 6),
(155, 'Budapest is famous for its rich culture, underground caves, the mighty Danube River, and for being the Spa Capital of the World.', 'Budapest, Hungary', 'f5140c6b-980e-4429-9536-1565827aac7f.jpg', '2022-08-12 03:00:00', '2022-08-17 03:00:00', 1000, 2),
(156, 'London is London , and no other city in the world is like it. Its attractions and places of interest are countless and cater for all tastes and all ages; its shops - small and large - are often unforgettable.', 'London, England', 'c4d1a284-363c-470e-9b2e-124e8252f014.jpg', '2022-12-22 03:00:00', '2022-12-27 03:00:00', 1650, 4),
(157, 'Magnificent mountain ranges, lake and river sceneries, the coasts and islands of the North Sea and the East Sea, numerous cultural monuments and a large number of towns full of tradition, as well as well-developed infrastructure.', 'Berlin, Germany', '8efd07c7-b98f-4659-bd4a-25d8187ea8a0.jpg', '2023-02-09 03:00:00', '2023-02-21 03:00:00', 1700, 3),
(158, 'Well known for its history, its film industry, its music industry and its dozens of unique and historic monuments, the United States is one of the greatest cultural, political and economic powers in the world.', 'New York, USA', '31d807cd-4b22-4216-98ca-b5e3bf10cb5c.jpg', '2024-05-20 03:00:00', '2024-06-07 03:00:00', 8000, 3),
(159, 'The expanse of Canada\'s natural beauty, from mountains and glaciers to secluded lakes and forests, is almost unparalleled worldwide. Canada has cosmopolitan cities that are clean, safe, friendly, and multicultural.', 'Ontario, Canada', '03064416-34fe-4b93-86be-ac2e481b0614.jpg', '2023-03-10 03:00:00', '2023-04-10 03:00:00', 9700, 3),
(160, 'Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, Built in the 15th century and later abandoned, intriguing buildings that play on astronomical alignments and panoramic views.', 'Machu Picchu, Peru', '675146e7-0ff5-493b-a3a6-0f9a50c9b80c.jpg', '2022-09-13 03:00:00', '2022-09-30 03:00:00', 2000, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`vacationId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
