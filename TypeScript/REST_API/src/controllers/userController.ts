import { Request, Response } from 'express';
import { UserModel } from '../models/userModel';
import { CreateUserDTO, UpdateUserDTO } from '../models/user';

/**
 * Получение списка всех пользователей
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении пользователей',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

/**
 * Получение пользователя по ID
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    
    if (!user) {
      res.status(404).json({ message: 'Пользователь не найден' });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении пользователя',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

/**
 * Создание нового пользователя
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData: CreateUserDTO = req.body;
    
    // Проверка обязательных полей
    if (!userData.name || !userData.email || !userData.password) {
      res.status(400).json({ 
        success: false,
        message: 'Имя, email и пароль обязательны' 
      });
      return;
    }
    
    // Проверка, существует ли пользователь с таким email
    const existingUser = await UserModel.findOne({ email: userData.email });
    if (existingUser) {
      res.status(400).json({ 
        success: false,
        message: 'Пользователь с таким email уже существует' 
      });
      return;
    }
    
    // Создаем нового пользователя
    const newUser = await UserModel.create({
      name: userData.name,
      email: userData.email,
      password: userData.password, // В реальном приложении нужно хэшировать пароль
      role: userData.role || 'user'
    });
    
    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при создании пользователя',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

/**
 * Обновление пользователя
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const updateData: UpdateUserDTO = req.body;
    
    // Проверяем, существует ли пользователь
    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      res.status(404).json({ 
        success: false,
        message: 'Пользователь не найден' 
      });
      return;
    }
    
    // Проверка email на уникальность при обновлении
    if (updateData.email && updateData.email !== existingUser.email) {
      const emailExists = await UserModel.findOne({ email: updateData.email });
      if (emailExists) {
        res.status(400).json({ 
          success: false,
          message: 'Пользователь с таким email уже существует' 
        });
        return;
      }
    }
    
    // Обновляем пользователя
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении пользователя',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
};

/**
 * Удаление пользователя
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    
    // Проверяем, существует ли пользователь
    const user = await UserModel.findById(id);
    if (!user) {
      res.status(404).json({ 
        success: false,
        message: 'Пользователь не найден' 
      });
      return;
    }
    
    // Удаляем пользователя
    await UserModel.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Пользователь успешно удален'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при удалении пользователя',
      error: error instanceof Error ? error.message : 'Неизвестная ошибка'
    });
  }
}; 