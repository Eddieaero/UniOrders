CREATE DATABASE  uniorders;

USE uniorders;

CREATE TABLE  orders (
    orderId INT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    availablePhone VARCHAR(20),
    universityName VARCHAR(255) NOT NULL,
    universityCourse VARCHAR(255) NOT NULL,
    sashColor VARCHAR(50),
    paymentNumber VARCHAR(50),
    OrderDate DATE,
    OrderStatus VARCHAR(50)
);