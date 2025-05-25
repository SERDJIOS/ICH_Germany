import { AppError } from './AppError';

/**
 * Класс ошибки для случаев, когда пользователь не авторизован (401)
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Необходима авторизация') {
    super(message, 401);
  }
} 