// redisClient.js
import redis from 'redis';

// Создаем клиент для подключения к Redis
const client = redis.createClient({
  host: 'redis', // Хост - это имя контейнера, как указано в docker-compose.yml
  port: 6379, // Порт Redis
});

// Подключаемся к Redis
client.on('connect', () => {
  console.log('Успешно подключились к Redis');
});

client.on('error', (err) => {
  console.error('Ошибка подключения к Redis:', err);
});

export default client;
