// src/app.js
import express from "express";
import 'dotenv/config';
import sequelize from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());  // Для парсинга JSON в теле запроса

// Подключение маршрутов
app.use(userRoutes);
app.use(productRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Sequelize!");
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to the database.");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the DB:", error);
  }
});