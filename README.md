# NexOrderPro - Simple Ordering Application

NexOrderPro is a web application built with ASP.NET Core 8 and React, designed to manage product orders for car cleaning services.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Design Decisions and Approaches](#design-decisions-and-approaches)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)

## Features
- Home Landing Page
- View a list of car cleaning products
- Create new orders
- View existing orders
- View selected order details

## Technologies Used

- Backend: ASP.NET Core 8
- Frontend: React
- Database: SQLite
- ORM: Entity Framework Core

## Setup and Installation

1. Clone the repository:
   - git clone https://github.com/Jorge0marMendoza/NexOrderPro.git
   - cd NexOrderPro

2. Install .NET Core 8 SDK if you haven't already.

3. Install Node.js and npm if you haven't already.

4. Navigate to the ClientApp directory and install React dependencies:
   - cd ClientApp
   - npm install

5. Return to the root directory and restore .NET packages:
   - cd ..
   - dotnet restore
  
### SQLite Setup
SQLite is included in the .NET Core SDK, so you don't need to install it separately. However, you'll need to set up the database for your application:

1. Ensure you have the Entity Framework Core tools installed:
   - dotnet tool install --global dotnet-ef
     
2. Create the initial migration (if not already created):
   - dotnet ef migrations add InitialCreate
  
3. Apply the migration to create the database:
  - dotnet ef database update

4. The SQLite database file (typically named NexOrderPro.db) will be created in your project root.
   
5. To view or modify the database directly, you can use a SQLite browser tool like DB Browser for SQLite.

6. If you need to reset the database, you can delete the .db file and run dotnet ef database update again.

## Running the Application

1. In the root directory, start the ASP.NET Core application:
   - dotnet run

2. The application should now be running. Open a web browser and navigate to `https://localhost:5001` (or the port specified in your launchSettings.json).

## Design Decisions and Approaches

1. **Separation of Concerns**: The application follows a layered architecture with separate controllers, services, and data access layers.

2. **RESTful API**: The backend exposes RESTful endpoints for managing products and orders.

3. **React Frontend**: The frontend is built with React, allowing for a responsive and interactive user interface.

4. **Entity Framework Core**: Used for ORM to simplify database operations and manage migrations.

5. **SQLite Database**: Chosen for its simplicity and ease of setup, making the application easy to run locally without additional database server setup.

6. **Asynchronous Operations**: All database operations are performed asynchronously to improve performance and responsiveness.

7. **Error Handling**: Implemented try-catch blocks in the service layer to handle and log exceptions.


## API Endpoints

### Get All Products
- **URL**: `/api/products`
- **Method**: `GET`
- **Success Response**: 
- Code: 200
- Content: Array of product objects
- **Error Response**:
- Code: 500
- Content: `{ "error": "An error occurred while processing your request." }`

### Create Order
- **URL**: `/api/orders`
- **Method**: `POST`
- **Data Params**: 
```json
{
 "customerName": "John Doe",
 "productId": 1,
 "quantity": 2
}
```
- **Success Response**:
  - **Code**: 201  
  - **Content**: Created order object
- **Error Response**:
- **Code**: 400  
  - **Content**: `{ "error": "Invalid order data" }`

### Get All Orders
- **URL**: `/api/orders`
- **Method**: `GET`
- **Success Response**:  
  - **Code**: 200  
  - **Content**: Array of order objects  
- **Error Response**:  
  - **Code**: 500  
  - **Content**: `{ "error": "An error occurred while processing your request." }`


## Database Schema
The application uses a SQLite database with the following schema:

### Products Table

CREATE TABLE Products (
    ProductId INT PRIMARY KEY,
    ProductName VARCHAR(255),
    Description TEXT,
    ProductPrice DECIMAL(10, 2),
    Category VARCHAR(255)
);

### Orders Table

CREATE TABLE Orders (
    OrderId INT PRIMARY KEY,
    ProductId INT,
    CustomerName VARCHAR(255),
    Quantity INT,
    OrderDate DATETIME,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

### Initial Data
The database is pre-populated with sample data for both Products and Orders tables.The script to create and populate the table is included for use.

1. After creating your database (as described in the SQLite Setup and Usage section), you can run this script to populate it with initial data.
2. If you're using Entity Framework Core migrations, you can include this script in a migration to ensure the database is always populated with this initial data when the migrations are applied.
3. Alternatively, you can run this script manually using a SQLite client or incorporate it into your application's startup process to ensure the database always has this initial data.

Remember to adjust your application's database connection string to point to the correct SQLite database file location.

