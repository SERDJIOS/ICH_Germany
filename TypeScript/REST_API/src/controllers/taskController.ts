import { Request, Response } from 'express';
import { TaskModel, ITask } from '../models/taskModel';

interface CreateTaskDTO {
  title: string;
  description?: string;
}

interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Получение всех задач
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении задач',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

// Получение задачи по ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const task = await TaskModel.findById(id);
    
    if (!task) {
      res.status(404).json({ message: 'Задача не найдена' });
      return;
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении задачи',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

// Создание новой задачи
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description }: CreateTaskDTO = req.body;
    
    if (!title) {
      res.status(400).json({ message: 'Название задачи обязательно' });
      return;
    }
    
    const newTask = await TaskModel.create({
      title,
      description: description || '',
      completed: false
    });
    
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при создании задачи',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

// Обновление задачи
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const updateData: UpdateTaskDTO = req.body;
    
    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      res.status(404).json({ message: 'Задача не найдена' });
      return;
    }
    
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении задачи',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

// Удаление задачи
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    
    if (!deletedTask) {
      res.status(404).json({ message: 'Задача не найдена' });
      return;
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Задача успешно удалена',
      data: deletedTask
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при удалении задачи',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
}; 