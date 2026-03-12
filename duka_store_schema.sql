-- Duka Store - Complete MySQL Database Schema

-- 1. Create database
CREATE DATABASE IF NOT EXISTS duka_store;
USE duka_store;

-- 2. Drop existing tables to ensure a clean slate if re-running
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS shops;
DROP TABLE IF EXISTS users;

-- 3. Users Table
CREATE TABLE users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  phone      VARCHAR(20),
  role       ENUM('customer', 'vendor', 'admin', 'superadmin') DEFAULT 'customer',
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Shops Table (one vendor can have multiple shops)
CREATE TABLE shops (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  vendor_id   INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(150) NOT NULL,
  slug        VARCHAR(160) UNIQUE NOT NULL,
  description TEXT,
  category    VARCHAR(80),
  logo_url    VARCHAR(255),
  banner_url  VARCHAR(255),
  phone       VARCHAR(20),
  location    VARCHAR(200),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Products Table
CREATE TABLE products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  shop_id     INT NOT NULL REFERENCES shops(id) ON DELETE CASCADE,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  discount    DECIMAL(5,2) DEFAULT 0,
  sku         VARCHAR(50),
  stock       INT DEFAULT 0,
  category    VARCHAR(80),
  images      JSON,           -- Array of image URLs
  status      ENUM('active','draft','out_of_stock') DEFAULT 'active',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 6. Orders Table
CREATE TABLE orders (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  buyer_id        INT NOT NULL REFERENCES users(id),
  shop_id         INT NOT NULL REFERENCES shops(id),
  items           JSON NOT NULL,   -- [{product_id, qty, price}]
  total_amount    DECIMAL(10,2) NOT NULL,
  status          ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  payment_status  ENUM('unpaid','paid','refunded') DEFAULT 'unpaid',
  mpesa_ref       VARCHAR(50),
  delivery_address TEXT,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 7. Payments Log Table
CREATE TABLE payments (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  order_id        INT REFERENCES orders(id),
  user_id         INT REFERENCES users(id),
  amount          DECIMAL(10,2) NOT NULL,
  method          ENUM('mpesa','card') DEFAULT 'mpesa',
  status          ENUM('pending','completed','failed') DEFAULT 'pending',
  mpesa_checkout_id VARCHAR(50),
  mpesa_receipt   VARCHAR(50),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Initial Admin Seed Data
INSERT INTO users (name, email, password, phone, role) 
VALUES ('Super Admin', 'superadmin@dukastore.com', '$2a$10$wE4pD3v8/T0Q6gM6qE2iRe2kOQn3R.hQ7F1oM1LgLhJg6s2y0qQ9O', '254700000000', 'superadmin');
-- Password is 'Password123' hashed with bcrypt
