// app.js
import express from 'express';
import connection from './db.js'; // Подключение к MySQL
import client from './redisClient.js'; // Подключение к Redis

const app = express();
const PORT = 3000;

// Простая маршрутизация
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Получаем всех пользователей из базы данных MySQL
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Ошибка при получении данных');
    } else {
      res.json(results);
    }
  });
});
// app.js
app.get('/cache-users', (req, res) => {
    // Проверяем, есть ли данные в Redis
    client.get('users', (err, data) => {
      if (err) {
        return res.status(500).send('Ошибка при работе с Redis');
      }
  
      if (data) {
        // Если данные найдены в Redis, возвращаем их
        console.log('Данные из Redis');
        return res.json(JSON.parse(data));
      } else {
        // Если данных нет в Redis, получаем их из MySQL
        connection.query('SELECT * FROM users', (err, results) => {
          if (err) {
            res.status(500).send('Ошибка при получении данных');
          } else {
            // Сохраняем данные в Redis
            client.setex('users', 3600, JSON.stringify(results)); // Кэшируем на 1 час
            console.log('Данные из MySQL');
            res.json(results);
          }
        });
      }
    });
  });
  
// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
