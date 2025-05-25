import mongoose, { Document, Schema } from 'mongoose';
import { User } from './user';

// Интерфейс для документа MongoDB
export interface UserDocument extends User, Document {}

// Создаем схему пользователя
const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: [true, 'Имя пользователя обязательно'],
    trim: true,
    maxlength: [50, 'Имя не может быть длиннее 50 символов']
  },
  email: {
    type: String,
    required: [true, 'Email обязателен'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Пожалуйста, введите корректный email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Пароль обязателен'],
    minlength: [6, 'Пароль должен содержать минимум 6 символов'],
    select: false // Не возвращать пароль при запросах
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Метод для удаления поля password из ответа
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

// Создаем и экспортируем модель
export const UserModel = mongoose.model<UserDocument>('User', userSchema); 