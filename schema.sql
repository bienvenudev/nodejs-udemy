-- Database Schema for node-complete application
-- MySQL Database Setup

CREATE DATABASE IF NOT EXISTS `node-complete`;
USE `node-complete`;

-- Products Table
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `imageUrl` VARCHAR(512),
  `description` TEXT,
  `price` DECIMAL(10, 2) NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Future: Cart Tables (for Phase 2)
-- Uncomment when ready to migrate cart to database
/*
CREATE TABLE IF NOT EXISTS `carts` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cartId` INT NOT NULL,
  `productId` INT NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`productId`) REFERENCES `products`(`id`) ON DELETE CASCADE,
  UNIQUE KEY `unique_cart_product` (`cartId`, `productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
*/

-- Indexes for better query performance
CREATE INDEX idx_products_title ON products(title);
CREATE INDEX idx_products_price ON products(price);
