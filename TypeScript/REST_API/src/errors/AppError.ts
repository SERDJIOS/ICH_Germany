/**
 * Базовый класс для всех пользовательских ошибок приложения
 */
export class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Корректное отображение стека ошибки
    Error.captureStackTrace(this, this.constructor);
  }
} 