# Homework 14 - Express and MongoDB

A Node.js application with Express and MongoDB demonstrating a one-to-many relationship between Categories and Products.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/hw14_db
PORT=3000
```

3. Start the server:
```
npm start
```

Or for development with automatic restart:
```
npm run dev
```

## API Endpoints

### Categories
- `POST /categories` - Create a new category
  ```json
  {
    "name": "Electronics"
  }
  ```

### Products
- `POST /products` - Create a new product
  ```json
  {
    "name": "Smartphone",
    "price": 799.99,
    "category": "categoryId"
  }
  ```
- `GET /products` - Get all products with populated category information 