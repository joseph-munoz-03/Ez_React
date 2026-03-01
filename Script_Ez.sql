-- =====================================================
-- CREAR BASE DE DATOS
-- =====================================================
DROP DATABASE IF EXISTS ez_dtabse;
CREATE DATABASE ez_dtabse
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE ez_dtabse;

-- =====================================================
-- TABLA USUARIOS
-- =====================================================
CREATE TABLE users_ez (
    id_users INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    documento_user BIGINT UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE,
    genero VARCHAR(20) DEFAULT 'No_Especificado',
    telefono VARCHAR(20),
    estado ENUM('activo','inactivo','suspendido') DEFAULT 'activo',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================
-- TABLA ROLES
-- =====================================================
CREATE TABLE roles_ez (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    tipo_rol ENUM('ADMIN','INGENIERO','USUARIO') NOT NULL UNIQUE,
    descripcion VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =====================================================
-- RELACIÓN USUARIO - ROL
-- =====================================================
CREATE TABLE usuarios_roles (
    id_user INT NOT NULL,
    id_rol INT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_rol),
    FOREIGN KEY (id_user) REFERENCES users_ez(id_users) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES roles_ez(id_rol) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- PERFIL USUARIO (1 a 1)
-- =====================================================
CREATE TABLE perfil_usuario_ez (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL UNIQUE,
    foto_perfil VARCHAR(500),
    descripcion TEXT,
    apodo VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users_ez(id_users) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- ETIQUETAS PERFIL
-- =====================================================
CREATE TABLE etiquetas_ez (
    id_etiqueta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE perfil_etiquetas_ez (
    id_perfil INT NOT NULL,
    id_etiqueta INT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_perfil, id_etiqueta),
    FOREIGN KEY (id_perfil) REFERENCES perfil_usuario_ez(id_perfil) ON DELETE CASCADE,
    FOREIGN KEY (id_etiqueta) REFERENCES etiquetas_ez(id_etiqueta) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- FORMULARIO DE ESPECIFICACIONES
-- =====================================================
CREATE TABLE formulario_especificaciones_ez (
    id_formulario INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    cantidad_entregas INT NOT NULL CHECK (cantidad_entregas BETWEEN 1 AND 30),
    dias_entrega INT NOT NULL CHECK (dias_entrega BETWEEN 1 AND 30),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users_ez(id_users) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- FORMULARIO DE CONTRATO (NUEVO)
-- =====================================================
CREATE TABLE contrato_ez (
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,
    id_formulario INT NOT NULL,
    id_cliente INT NOT NULL,
    id_ingeniero INT NOT NULL,

    tipo_pago ENUM('POR_ENTREGA','TOTAL_INMEDIATO') NOT NULL,

    precio_total DECIMAL(12,2) NOT NULL,
    porcentaje_comision DECIMAL(5,2) DEFAULT 10.00,
    valor_comision DECIMAL(12,2) NOT NULL,
    valor_final_ingeniero DECIMAL(12,2) NOT NULL,

    estado ENUM(
        'BORRADOR',
        'ACEPTADO',
        'RECHAZADO',
        'EN_PROCESO',
        'FINALIZADO',
        'CANCELADO'
    ) DEFAULT 'BORRADOR',

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_formulario) REFERENCES formulario_especificaciones_ez(id_formulario) ON DELETE CASCADE,
    FOREIGN KEY (id_cliente) REFERENCES users_ez(id_users) ON DELETE CASCADE,
    FOREIGN KEY (id_ingeniero) REFERENCES users_ez(id_users) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- PEDIDOS
-- =====================================================
CREATE TABLE pedidos_ez (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_contrato INT NOT NULL,
    estado ENUM(
        'PENDIENTE',
        'PAGADO',
        'EN_PROCESO',
        'ENTREGADO',
        'FINALIZADO',
        'CANCELADO'
    ) DEFAULT 'PENDIENTE',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_contrato) REFERENCES contrato_ez(id_contrato) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- PAGOS (MERCADOPAGO)
-- =====================================================
CREATE TABLE pagos_ez (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,

    mercado_pago_payment_id VARCHAR(100),
    mercado_pago_preference_id VARCHAR(100),
    mercado_pago_status VARCHAR(50),

    monto_pagado DECIMAL(12,2) NOT NULL,
    moneda VARCHAR(10) DEFAULT 'COP',

    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_pedido) REFERENCES pedidos_ez(id_pedido) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- CATÁLOGOS RESTANTES (SIN MODIFICAR)
-- =====================================================
CREATE TABLE lenguajes_ez (
    id_lenguaje INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE formulario_lenguajes_ez (
    id_formulario INT NOT NULL,
    id_lenguaje INT NOT NULL,
    PRIMARY KEY (id_formulario, id_lenguaje),
    FOREIGN KEY (id_formulario) REFERENCES formulario_especificaciones_ez(id_formulario) ON DELETE CASCADE,
    FOREIGN KEY (id_lenguaje) REFERENCES lenguajes_ez(id_lenguaje) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE bases_datos_ez (
    id_bd INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE formulario_bases_datos_ez (
    id_formulario INT NOT NULL,
    id_bd INT NOT NULL,
    PRIMARY KEY (id_formulario, id_bd),
    FOREIGN KEY (id_formulario) REFERENCES formulario_especificaciones_ez(id_formulario) ON DELETE CASCADE,
    FOREIGN KEY (id_bd) REFERENCES bases_datos_ez(id_bd) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE publicaciones_ez (
    id_publicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users_ez(id_users) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE etiquetas_publicacion_ez (
    id_etiqueta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

CREATE TABLE publicacion_etiquetas_ez (
    id_publicacion INT NOT NULL,
    id_etiqueta INT NOT NULL,
    PRIMARY KEY (id_publicacion, id_etiqueta),
    FOREIGN KEY (id_publicacion) REFERENCES publicaciones_ez(id_publicacion) ON DELETE CASCADE,
    FOREIGN KEY (id_etiqueta) REFERENCES etiquetas_publicacion_ez(id_etiqueta) ON DELETE CASCADE
) ENGINE=InnoDB;

-- =====================================================
-- DATOS INICIALES
-- =====================================================
INSERT INTO roles_ez (tipo_rol, descripcion) VALUES
('ADMIN','Administrador del sistema'),
('INGENIERO','Ingeniero del sistema'),
('USUARIO','Usuario estándar');

INSERT INTO lenguajes_ez (nombre) VALUES
('Java'),('Python'),('C#'),('R'),('Ruby'),
('C++'),('Go'),('HTML'),('C'),('Kotlin'),('JavaScript');

INSERT INTO bases_datos_ez (nombre) VALUES
('MySQL'),('SQL Server'),('MariaDB'),('PostgreSQL');

SELECT * FROM users_ez;