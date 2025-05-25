import { AppError } from './AppError';

/**
 * Класс ошибки для случаев неверного запроса (400)
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Неверный запрос') {
    super(message, 400);
  }
} 