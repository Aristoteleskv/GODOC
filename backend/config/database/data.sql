-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 18-Jul-2022 às 18:35
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `data`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `categories`
--

INSERT INTO `categories` (`id`, `title`) VALUES
(1, 'Roupas'),
(2, 'Sapatos'),
(3, 'Malas');

-- --------------------------------------------------------

--
-- Estrutura da tabela `modelo`
--

CREATE TABLE `modelo` (
  `id` int(11) NOT NULL,
  `title` set('Homem','Senhora','Criança','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `modelo`
--

INSERT INTO `modelo` (`id`, `title`) VALUES
(1, 'Homem'),
(2, 'Senhora'),
(3, 'Criança');

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `images` text DEFAULT NULL,
  `description` longtext NOT NULL,
  `price` decimal(9,4) NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `cat_id` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `title`, `image`, `images`, `description`, `price`, `short_desc`, `cat_id`) VALUES
(1, 'calsas', 'https://cdn1.hendyla.com/archivos/imagenes/2020/06/19/37a6259cc0c1dae299a7866489dff0bdcxZzAJnkdwXtFB_IMG_1591072050433-480_A.jpg', NULL, 'asdsa', '11.9900', 'Fardo', 1),
(2, 'WEFwe', 'https://image.made-in-china.com/43f34j00RVyzkgbCZwqE/Second-Hand-Men-s-Clothing-Used-Clothes-in-Bales-Used-Clothing-Secondhand-Clothes-in-Grade-AAA.jpg', NULL, 'wefWEFwe', '123.0000', 'WEFef', 2),
(3, 'WEFwe', 'https://imageten.s3.amazonaws.com/uploads/landing_page_product_variant/image/147892/BLSJ0163.JPG', NULL, 'wefWEFwe', '123.0000', 'WEFef', 3),
(4, 'sedWED', 'https://image.made-in-china.com/43f34j00RVyzkgbCZwqE/Second-Hand-Men-s-Clothing-Used-Clothes-in-Bales-Used-Clothing-Secondhand-Clothes-in-Grade-AAA.jpg', NULL, 'werewtrtwerwtr', '12.0000', 'rt', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT 'not set',
  `telefone` int(10) DEFAULT 18,
  `codigo` varchar(100) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`user_id`, `password`, `email`, `full_name`, `telefone`, `codigo`, `type`) VALUES
(2, '25f9e794323b453885f5181f1b624d0b', 'adn@gmail.com', 'Kivova', 948568514, '', 'local'),
(28, '25f9e794323b453885f5181f1b624d0b', 'manel@gmail.com', 'Matutadidi', 2147483647, 'aa8c68ab76bdd83ff597d1453e2b1af8', 'local'),
(29, '25f9e794323b453885f5181f1b624d0b', 'manwl@gmail.com', 'Matutadidi', 2147483647, 'aa8c68ab76bdd83ff597d1453e2b1af8', 'local'),
(48, '25f9e794323b453885f5181f1b624d0b', 'manuelkivova@gmail.com', 'Matutadidi Aristóteles Kivova ', 2147483647, '5386', 'local');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`id`) REFERENCES `modelo` (`id`);

--
-- Limitadores para a tabela `modelo`
--
ALTER TABLE `modelo`
  ADD CONSTRAINT `modelo_ibfk_1` FOREIGN KEY (`id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
