import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';  // Подключаем новый файл маршрутов
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3003',  // укажи порт, где работает Vite
  credentials: true, // если используешь cookies или авторизацию
}));

connectDB();

// Подключаем маршруты
app.use('/api', userRoutes);  // Подключаем маршруты пользователей и транзакций

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});