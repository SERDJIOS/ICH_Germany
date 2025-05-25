import { DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Предполагаем, что вы настроили соединение с базой данных

const User = sequelize.define(
  'User', // Название модели
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // Определяем столбцы таблицы Users
    name: {
      type: DataTypes.STRING, // Тип данных - строка
      allowNull: false, // Обязательное поле
    },
    email: {
      type: DataTypes.STRING, // Тип данных - строка
      allowNull: false, // Обязательное поле
      unique: true, // Уникальное значение
      validate: {
        isEmail: true, // Проверка на корректность email
      },
    },
    createdAt: {
      type: DataTypes.DATE, // Тип данных - дата
      allowNull: false, // Обязательное поле
      defaultValue: DataTypes.NOW, // Значение по умолчанию - текущая дата
    },
  },
  {
    // Дополнительные параметры модели
    tableName: 'Users', // Явно указываем имя таблицы
    timestamps: false, // Отключаем автоматическое добавление временных меток (createdAt, updatedAt)
  }
);
// Экспортируем модель
export default User;