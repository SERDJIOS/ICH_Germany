import { AppError } from './AppError';

/**
 * Класс ошибки для случаев, когда ресурс не найден (404)
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Ресурс не найден') {
    super(message, 404);
  }
}
