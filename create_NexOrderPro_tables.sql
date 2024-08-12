-- Create the Products table
CREATE TABLE Products (
    ProductId INT PRIMARY KEY,
    ProductName VARCHAR(255),
    Description TEXT,
    ProductPrice DECIMAL(10, 2),
    Category VARCHAR(255)
);

-- Insert data into the Products table
INSERT INTO Products (ProductId, ProductName, Description, ProductPrice, Category)
VALUES
(1, 'Ultimate Car Wash Soap', 'High-foaming car wash soap for a streak-free shine', 14.99, 'Exterior Cleaning'),
(2, 'Microfiber Wash Mitt', 'Ultra-soft microfiber mitt for gentle car washing', 9.99, 'Cleaning Tools'),
(3, 'Wheel Cleaner Spray', 'Powerful spray to remove brake dust and grime from wheels', 12.99, 'Wheel Care'),
(4, 'Interior Detailing Spray', 'All-in-one interior cleaner and protectant', 11.99, 'Interior Cleaning'),
(5, 'Car Wax', 'Long-lasting carnauba wax for ultimate paint protection', 24.99, 'Paint Protection'),
(6, 'Glass Cleaner', 'Streak-free formula for crystal clear windows', 8.99, 'Glass Care'),
(7, 'Tire Shine Gel', 'Long-lasting tire shine for a wet look', 15.99, 'Tire Care'),
(8, 'Leather Cleaner and Conditioner', '2-in-1 solution to clean and moisturize leather', 19.99, 'Interior Care'),
(9, 'Clay Bar Kit', 'Remove contaminants and restore smooth paint', 29.99, 'Paint Correction'),
(10, 'Microfiber Towels (Pack of 12)', 'Ultra-soft, lint-free towels for various cleaning tasks', 18.99, 'Cleaning Tools');

-- Create the Orders table
CREATE TABLE Orders (
    OrderId INT PRIMARY KEY,
    ProductId INT,
    CustomerName VARCHAR(255),
    Quantity INT,
    OrderDate DATETIME,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

-- Insert data into the Orders table
INSERT INTO Orders (OrderId, ProductId, CustomerName, Quantity, OrderDate)
VALUES
(1, 1, 'Jorge Mendoza', 1, '0001-01-01 00:00:00'),
(2, 5, 'Jorge Mendoza', 3, '0001-01-01 12:42:05'),
(3, 8, 'John Doe', 5, '0001-01-01 22:42:02'),
(4, 6, 'Lebron James', 13, '0001-01-01 04:45:02'),
(5, 4, 'Sara Tee', 2, '0001-01-01 06:38:09'),
(6, 7, 'Harry Potter', 4, '0001-01-01 10:56:09');
