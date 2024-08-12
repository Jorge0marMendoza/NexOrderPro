# NexOrderPro - Simple Ordering Application

NexOrderPro is a web application built with ASP.NET Core 8 and React, designed to manage product orders for car cleaning services.

## Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Setup and Installation](#setup-and-installation)
4. [Running the Application](#running-the-application)
5. [Design Decisions and Approaches](#design-decisions-and-approaches)
6. [API Endpoints](#api-endpoints)

## Features

- View a list of car cleaning products
- Create new orders
- View existing orders

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
   
6. Update the database with the latest migrations:
   dotnet ef database update

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




