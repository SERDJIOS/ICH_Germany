import express, { Application, Request, Response, NextFunction } from 'express';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import { connectDB } from './config/db';
import { errorHandler } from './middleware/errorMiddleware';
import { AppError } from './errors';

// Определяем окружение
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Подключение к базе данных
connectDB();

// Middleware для парсинга JSON
app.use(express.json());

// Базовый маршрут
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Подключение маршрутов для задач
app.use('/api/tasks', taskRoutes);

// Подключение маршрутов для пользователей
app.use('/api/users', userRoutes);

// Обработка 404 для несуществующих маршрутов
// Важно: размещать после всех маршрутов!
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Маршрут ${req.originalUrl} не найден на этом сервере`, 404));
});

// Глобальный обработчик ошибок
// Важно: размещать последним в списке middleware!
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
});
