import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';

/**
 * Middleware для обработки 404 ошибок, когда маршрут не найден
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
  const error = new AppError(`Маршрут ${req.originalUrl} не найден на этом сервере`, 404);
  next(error);
};

/**
 * Обработка ошибок MongoDB для дубликатов (код 11000)
 */
const handleDuplicateFieldsDB = (err: any): AppError => {
  // Безопасное извлечение значения из сообщения об ошибке
  let value = 'дублирующееся значение';
  try {
    const match = err.message.match(/{([^}]*)}/);
    if (match && match[1]) {
      value = match[1];
    }
  } catch (error) {
    // Используем значение по умолчанию, если не удалось извлечь
  }
  
  const message = `Дублирующееся значение поля: ${value}. Пожалуйста, используйте другое значение.`;
  return new AppError(message, 400);
};

/**
 * Обработка ошибок валидации MongoDB
 */
const handleValidationErrorDB = (err: any): AppError => {
  let errors: string[] = ['Ошибка валидации'];
  
  try {
    if (err.errors && typeof err.errors === 'object') {
      errors = Object.values(err.errors).map((el: any) => el.message || 'Ошибка валидации');
    }
  } catch (error) {
    // Используем значение по умолчанию, если не удалось извлечь
  }
  
  const message = `Ошибки валидации: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

/**
 * Форматирование ошибки для разработки (с деталями)
 */
const sendErrorDev = (err: AppError, res: Response): void => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

/**
 * Форматирование ошибки для продакшн (без раскрытия деталей)
 */
const sendErrorProd = (err: AppError, res: Response): void => {
  // Операционные, доверенные ошибки: отправить клиенту
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // Программные или неизвестные ошибки: не раскрывать детали
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Что-то пошло не так'
    });
  }
};

/**
 * Главный middleware для обработки всех ошибок
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Разное поведение в зависимости от окружения
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    // Обработка специфичных ошибок MongoDB
    if (err.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, res);
  }
}; 