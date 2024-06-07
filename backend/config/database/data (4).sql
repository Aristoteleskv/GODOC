-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Jul-2022 às 11:20
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
  `id_modelo` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `categories`
--

INSERT INTO `categories` (`id`, `id_modelo`, `title`) VALUES
(8, 0, 'Roupas'),
(9, 0, 'Sapatos'),
(10, 0, 'Malas');

-- --------------------------------------------------------

--
-- Estrutura da tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL,
  `linha` varchar(255) DEFAULT NULL,
  `cidade` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  `telefone` varchar(10) DEFAULT NULL,
  `codigopin` int(6) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `modelo`
--

CREATE TABLE `modelo` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL
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
-- Estrutura da tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `user_id`) VALUES
(0, 66);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidos_detalhes`
--

CREATE TABLE `pedidos_detalhes` (
  `id` int(10) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `product_id` int(10) NOT NULL,
  `quantidade` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `usersid` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `quantidade` int(10) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(9,4) NOT NULL,
  `short_desc` varchar(255) NOT NULL,
  `cat_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `products`
--

INSERT INTO `products` (`id`, `title`, `usersid`, `image`, `quantidade`, `description`, `price`, `short_desc`, `cat_id`) VALUES
(2, 'wefwefwewfef', 66, 'https://image.made-in-china.com/43f34j00RVyzkgbCZwqE/Second-Hand-Men-s-Clothing-Used-Clothes-in-Bales-Used-Clothing-Secondhand-Clothes-in-Grade-AAA.jpg', 3, 'wefwfwfwefwf', '120.0000', 'ewwfefwwef', 10),
(4, 'Matutadid A. Kivova', 66, 'https://upload.wikimedia.org/wikipedia/en/a/aa/Bart_Simpson_200px.png', 3, 'asasffsf', '121.0000', 'wewef', 8),
(6, 'Matutadid A. Kivova', 66, 'https://i1.sndcdn.com/avatars-000022201824-zd09tb-t500x500.jpg', 3, 'asdasdasdsda', '12.0000', 'sdasdasd', 9);

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT 'not set',
  `telefone` varchar(100) NOT NULL,
  `codigo` varchar(100) DEFAULT NULL,
  `codigo_verify` varchar(11) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'local'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`user_id`, `password`, `email`, `full_name`, `telefone`, `codigo`, `codigo_verify`, `type`) VALUES
(66, '25f9e794323b453885f5181f1b624d0b', 'adn@gmail.com', 'Matutadidi A.Kivova', '244945976043', '6606', '', 'local');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_modelo` (`id`),
  ADD KEY `id_modelo_2` (`id_modelo`);

--
-- Índices para tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD KEY `fk_enderecos_users1` (`user_id`);

--
-- Índices para tabela `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedidos_users1_idx` (`user_id`);

--
-- Índices para tabela `pedidos_detalhes`
--
ALTER TABLE `pedidos_detalhes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_pedidos_has_products_products1_idx` (`product_id`),
  ADD KEY `fk_pedidos_has_products_pedidos1_idx` (`pedido_id`);

--
-- Índices para tabela `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usersid` (`usersid`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `modelo`
--
ALTER TABLE `modelo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `fk_enderecos_users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `pedidos_detalhes`
--
ALTER TABLE `pedidos_detalhes`
  ADD CONSTRAINT `pedidos_detalhes_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`usersid`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
