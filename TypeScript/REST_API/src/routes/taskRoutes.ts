import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/taskController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// GET /api/tasks - Получить все задачи (без авторизации)
router.get('/', getAllTasks);

// GET /api/tasks/:id - Получить задачу по ID (без авторизации)
router.get('/:id', getTaskById);

// Все операции изменения данных требуют авторизации
// POST /api/tasks - Создать новую задачу
router.post('/', authMiddleware, createTask);

// PUT /api/tasks/:id - Обновить задачу
router.put('/:id', authMiddleware, updateTask);

// DELETE /api/tasks/:id - Удалить задачу
router.delete('/:id', authMiddleware, deleteTask);

export default router; 