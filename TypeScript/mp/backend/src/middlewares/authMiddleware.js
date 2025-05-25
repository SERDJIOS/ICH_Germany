import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user.js';
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ 
        message: 'Отсутствует заголовок авторизации',
        code: 'AUTH_HEADER_MISSING'
      });
    }

    // Check if Authorization header has correct format
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Некорректный формат токена (требуется Bearer)',
        code: 'INVALID_TOKEN_FORMAT'
      });
    }

    const token = authHeader.split(' ')[1];
    
    // Check if token is provided
    if (!token) {
      return res.status(401).json({
        message: 'Токен отсутствует',
        code: 'TOKEN_MISSING'
      });
    }

    try {
      // Verify the token
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check token expiration explicitly
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < currentTimestamp) {
        return res.status(401).json({
          message: 'Срок действия токена истек',
          code: 'TOKEN_EXPIRED'
        });
      }

      // Find user in database
      const user = await User.findById(payload.id).select('-password');
      if (!user) {
        return res.status(401).json({ 
          message: 'Пользователь не найден',
          code: 'USER_NOT_FOUND'
        });
      }
      
      // Authentication successful
      req.user = user;
      next();
    } catch (err) {
      // Handle specific JWT errors
      if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
          message: 'Недействительный токен',
          code: 'INVALID_TOKEN'
        });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
          message: 'Срок действия токена истек',
          code: 'TOKEN_EXPIRED'
        });
      } else {
        return res.status(401).json({
          message: 'Ошибка проверки токена',
          code: 'TOKEN_VERIFICATION_ERROR'
        });
      }
    }
  } catch (error) {
    // General server error
    console.error('Ошибка аутентификации:', error);
    return res.status(500).json({
      message: 'Внутренняя ошибка сервера при аутентификации',
      code: 'AUTH_SERVER_ERROR'
    });
  }
};