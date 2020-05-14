-- Drops the eStoreDB if it exists currently --
DROP DATABASE IF EXISTS eStoreDB;
-- Creates the "eStoreDB" database --
CREATE DATABASE eStoreDB;

CREATE TABLE users
(
    id int NOT NULL AUTO_INCREMENT,
	first_name varchar (255) NOT NULL,
    last_name varchar (255) NOT NULL,
    email varchar (255) NOT NULL,
    password varchar (255) NOT NULL,
    address varchar (255) NOT NULL,
	PRIMARY KEY (id)
);


CREATE TABLE products
(
    id int NOT NULL AUTO_INCREMENT,
	name varchar (255) NOT NULL,
    description varchar (255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    img blob, 
    PRIMARY KEY (id)
);

CREATE TABLE orders
(
    id int NOT NULL AUTO_INCREMENT,
	product_id int NOT NULL,
    user_id int NOT NULL,
    comment varchar (255) NOT NULL,
	PRIMARY KEY (id)
);