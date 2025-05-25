import "dotenv/config";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

const app = express();
app.use(express.json());
// CORS: разрешаем запросы с фронта (Vite обычно 5173/5174)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5174"
    ],
    credentials: true,
  })
);

// Роуты
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3333;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Ошибка подключения к MongoDB:", err);
  });
