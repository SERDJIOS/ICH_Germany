import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/users - Получить список всех пользователей (требует авторизации)
router.get('/', authMiddleware, getAllUsers);

// GET /api/users/:id - Получить пользователя по ID (требует авторизации)
router.get('/:id', authMiddleware, getUserById);

// POST /api/users - Создать нового пользователя (публичный доступ для регистрации)
router.post('/', createUser);

// PUT /api/users/:id - Обновить пользователя (требует авторизации)
router.put('/:id', authMiddleware, updateUser);

// DELETE /api/users/:id - Удалить пользователя (требует авторизации)
router.delete('/:id', authMiddleware, deleteUser);

export default router; 