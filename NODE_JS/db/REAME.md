С нуля делаем проект. Инициализируем, устанавливаем библиотеки, мигрируем, создаем модели, миграции
Модель user c с полями name, username, email, модель Product имя, цена, описание (необязательное)


1. npm init -y
2. type module
3. npm i express dotenv sequelize sequelize-cli mysql2
4. npx sequelize-cli init
5. настройка config.js, ставим пароль от подключения, создаем базу данных в самом mySQL
6. создаем express сервер
7. Создаем подключение к бд - db.js
import { Sequelize } from 'sequelize'
import configData from './config.json' assert {type: 'json'} 
//явно указать что работает с json
const env = process.env.NODE_ENV || 'development'
const config = configData[env]
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
)
export default sequelize
8. Подключаем к серверу созданную БД
9. Создаем модель, например, пользователя
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    //Если хотите добавить какое то поле в таблицу, необходимо описать желаемое поле в данном объекте
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //Например, хотим добавить поле username, надо описать его тип, может ли он быть null и тд
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Users',
    timestamps: false
})

export default User
10. Создаем миграцию 
npx sequelize-cli migration:generate --name create-user-table
11. Переименовываем расширение файла миграции с .js на .cjs в случае если вы используете type: module
12. Настраиваем миграционный файл, где функция queryInterface позволяет нам получить доступ к интерфейсу, с помощью которого мы создаем таблицу и мигрируем таблицу со всеми описанными полями в БД, к которой реализовано подключение
ПРИМЕР:
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  }
};
13. npx sequelize-cli db:migrate - реализуем миграцию бд