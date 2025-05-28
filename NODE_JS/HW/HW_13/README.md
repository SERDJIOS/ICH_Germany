# MongoDB Relationships Demo

This project demonstrates different types of relationships in MongoDB using Mongoose with Node.js and Express.

## Project Structure

- `src/`
  - `config/` - Database connection configuration
  - `models/` - Mongoose models
  - `index.js` - Main application file

## Models and Relationships

### One-to-Many Relationship
- **Publisher**: Contains information about a publisher
- **Magazine**: Contains information about a magazine, has a reference to a publisher

### Many-to-Many Relationship
- **Tag**: Contains information about a tag, has an array of references to articles
- **Article**: Contains information about an article, has an array of references to tags

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/hw13_db
   ```
4. Run the server with `npm run dev`
5. Access the API at `http://localhost:3000`

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose 