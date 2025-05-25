import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors';

/**
 * Middleware для проверки наличия заголовка авторизации
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return next(new UnauthorizedError('Отсутствует заголовок авторизации'));
  }
  
  // В реальном приложении здесь должна быть проверка токена
  // Например: verify JWT token, check against database, etc.
  
  // Для демонстрации просто логируем заголовок
  console.log('Заголовок авторизации:', authHeader);
  
  // Если авторизация успешна, продолжаем выполнение запроса
  next();
}; 