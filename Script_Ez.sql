-- =====================================
-- CREAR BASE DE DATOS
-- =====================================

CREATE DATABASE IF NOT EXISTS ez_db;
USE ez_db;

-- =====================================
-- TABLA USUARIOS
-- =====================================

CREATE TABLE users (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    first_name VARCHAR(100),
    last_name VARCHAR(100),

    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255),

    provider VARCHAR(50),

    role VARCHAR(50),

    enabled BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =====================================
-- TABLA SERVICIOS (MARKETPLACE)
-- =====================================

CREATE TABLE services (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200),
    description TEXT,

    price DECIMAL(10,2),

    engineer_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (engineer_id) REFERENCES users(id)

);

CREATE INDEX idx_services_engineer ON services(engineer_id);

-- =====================================
-- TABLA CONTRATOS
-- =====================================

CREATE TABLE contracts (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    client_id BIGINT,
    engineer_id BIGINT,

    service_id BIGINT,

    agreed_price DECIMAL(10,2),

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (engineer_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)

);

CREATE INDEX idx_contract_client ON contracts(client_id);
CREATE INDEX idx_contract_engineer ON contracts(engineer_id);

-- =====================================
-- TABLA PEDIDOS
-- =====================================

CREATE TABLE orders (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    contract_id BIGINT,

    client_id BIGINT,

    amount DECIMAL(10,2),

    status VARCHAR(50),

    payment_reference VARCHAR(200),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (contract_id) REFERENCES contracts(id),
    FOREIGN KEY (client_id) REFERENCES users(id)

);

-- =====================================
-- TABLA ENTREGAS
-- =====================================

CREATE TABLE entregas (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT,

    description TEXT,

    file_url VARCHAR(500),

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(id)

);

-- =====================================
-- TABLA PAGOS
-- =====================================

CREATE TABLE payments (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    order_id BIGINT,

    mercadopago_id VARCHAR(200),

    amount DECIMAL(10,2),

    platform_fee DECIMAL(10,2),

    engineer_amount DECIMAL(10,2),

    status VARCHAR(50),

    payment_type VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(id)

);

CREATE INDEX idx_payment_order ON payments(order_id);

-- =====================================
-- TABLA CHAT
-- =====================================

CREATE TABLE chats (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    client_id BIGINT,

    engineer_id BIGINT,

    contract_id BIGINT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (engineer_id) REFERENCES users(id),
    FOREIGN KEY (contract_id) REFERENCES contracts(id)

);

-- =====================================
-- MENSAJES CHAT
-- =====================================

CREATE TABLE chat_messages (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    chat_id BIGINT,

    sender_id BIGINT,

    message TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)

);

-- =====================================
-- TABLA REPORTES
-- =====================================

CREATE TABLE reports (

    id BIGINT AUTO_INCREMENT PRIMARY KEY,

    reporter_id BIGINT,

    reported_user_id BIGINT,

    reason TEXT,

    status VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (reporter_id) REFERENCES users(id),
    FOREIGN KEY (reported_user_id) REFERENCES users(id)

);

-- =====================================
-- USUARIOS POR DEFECTO
-- =====================================

INSERT INTO users (first_name,last_name,email,password,provider,role)
VALUES
('Admin','Sistema','admin@ez.com',
'$2a$10$X0kQ8gC4pZ5JZpQ9pR5A7u7G9j5Q6cX9L8q6z8Q3oY1L5g0e0vM2G',
'LOCAL','ADMIN'),

('Carlos','Ingeniero','ingeniero@ez.com',
'$2a$10$X0kQ8gC4pZ5JZpQ9pR5A7u7G9j5Q6cX9L8q6z8Q3oY1L5g0e0vM2G',
'LOCAL','ENGINEER'),

('Juan','Cliente','cliente@ez.com',
'$2a$10$X0kQ8gC4pZ5JZpQ9pR5A7u7G9j5Q6cX9L8q6z8Q3oY1L5g0e0vM2G',
'LOCAL','CLIENT');