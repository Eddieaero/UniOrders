
CREATE TABLE orders (
    orderId VARCHAR(255) PRIMARY KEY,  
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    availablePhone VARCHAR(20),
    universityName VARCHAR(255),
    universityCourse VARCHAR(255),
    sashColor VARCHAR(100),
    paymentNumber VARCHAR(20),
    OrderDate DATE,
    OrderStatus ENUM('Paid', 'Unpaid'),
    quote VARCHAR(500) NULL, 
    logo_url VARCHAR(255)
);
