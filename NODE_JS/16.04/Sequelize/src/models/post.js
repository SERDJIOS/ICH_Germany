import { DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Предполагаем, что вы настроили соединение с базой данных

const Post = sequelize.define(
  'Post', // Название модели
  {
    // Определяем столбцы таблицы Users
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING, // Тип данных - строка
      allowNull: false, // Обязательное поле
    },
    content:{
      type: DataTypes.STRING, // Тип данных - строка
      allowNull: true, // Обязательное поле
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
    }
  },
  {
    // Дополнительные параметры модели
    tableName: 'Posts', // Явно указываем имя таблицы
    timestamps: false, // Отключаем автоматическое добавление временных меток (createdAt, updatedAt)
  }
);
// Экспортируем модель
export default Post;