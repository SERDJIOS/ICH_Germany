// Загрузка переменных окружения из .env файла
require('dotenv').config();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
// Добавляем модуль для HTTP-запросов
const axios = require('axios');

// Обработка необработанных исключений
process.on('uncaughtException', (err) => {
  console.error('Необработанное исключение:', err);
  console.error(err.stack);
  // Не завершаем процесс, чтобы увидеть ошибку
});

// Обработка отклоненных промисов
process.on('unhandledRejection', (reason, promise) => {
  console.error('Необработанное отклонение промиса:', reason);
  // Не завершаем процесс, чтобы увидеть ошибку
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Расширенный массив цитат Иосифа Бродского
const brodskiyQuotes = [
  "Не выходи из комнаты, не совершай ошибку.",
  "Жизнь - это движение от ошибки к ошибке.",
  "Самый надежный способ угодить публике - сказать то, что она сама хотела бы сказать.",
  "Свобода - это когда забываешь отчество у тирана.",
  "Если звезды зажигают, значит - это кому-нибудь нужно?",
  "В каждой могиле - часть языка.",
  "Скандинавия? Пейзаж, в котором мало толку: гугу - метель, бубу - прибой.",
  "Я не то что схожу с ума, но устал за лето.",
  "Воздух пахнет апрелем, и цветы в свете фар отливают серебром.",
  "Я всегда твердил, что судьба - игра.",
  "Никогда не возвращайся в прежние места.",
  "Время создано смертью.",
  "Потому что искусство поэзии требует слов.",
  "Человек - это то, что он читает.",
  "Если горе не введет тебя в ступор, скажи ему спасибо.",
  "Земля всегда глядит на человека в последний раз.",
  "Красота спасет мир, но кто спасет красоту?",
  "Страх - это всегда страх перемены.",
  "Любить иных - тяжелый крест.",
  "Мир состоит не из атомов, а из историй.",
  "На самом деле каждый писатель пишет только одну книгу.",
  "Мы пишем не перьями, а тем, что находится у нас под ногами.",
  "То, что есть у одного, может быть у другого только в виде цитаты.",
  "Часть речи исчезает в темноте, местоимения торчат, как сучки.",
  "Горбатому зеркало не по карману.",
  "Ворюга мне милей, чем кровопийца.",
  "Речь идет об одной минуте смелости перед лицом вечного молчания.",
  "Мы живем в мире, где все решает степень импровизации.",
  "Ты не вернешься в город, где ты был счастлив.",
  "В этом мире многое достойно любви: тем более тот, кто любит."
];

// Функция для получения цитаты из внешнего API
async function getQuoteFromAPI() {
  try {
    // Попробуем получить случайную цитату с API Quotable
    const response = await axios.get('https://api.quotable.io/random');
    const quote = response.data;
    return `"${quote.content}" — ${quote.author}`;
  } catch (error) {
    console.error('Ошибка при получении цитаты из API:', error.message);
    
    // Попробуем альтернативное API, если первое недоступно
    try {
      const fallbackResponse = await axios.get('https://zenquotes.io/api/random');
      const fallbackQuote = fallbackResponse.data[0];
      return `"${fallbackQuote.q}" — ${fallbackQuote.a}`;
    } catch (fallbackError) {
      console.error('Ошибка при получении цитаты из запасного API:', fallbackError.message);
      
      // В случае ошибки возвращаем локальную цитату
      return getRandomBrodskiyQuote();
    }
  }
}

// Функция для получения случайной цитаты из локального массива
function getRandomBrodskiyQuote() {
  const randomIndex = Math.floor(Math.random() * brodskiyQuotes.length);
  return brodskiyQuotes[randomIndex];
}

// Обслуживание статических файлов из папки public
app.use(express.static(path.join(__dirname, 'public')));

// Логирование всех запросов
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Обработка WebSocket-соединений
io.on('connection', (socket) => {

  
  // Приветственное сообщение новому пользователю
  socket.emit('message', {
    user: 'Система',
    text: 'Добро пожаловать в чат!',
    time: new Date().toLocaleTimeString()
  });


  // Обработка сообщений от клиента
  socket.on('chatMessage', async (msg) => {
    console.log('Получено сообщение:', msg);
    
    // Отправляем сообщение всем пользователям
    io.emit('message', {
      user: msg.user,
      text: msg.text,
      time: new Date().toLocaleTimeString()
    });
    
    try {
      // Через короткую задержку отправляем цитату
      const delay = parseInt(process.env.BRODSKY_REPLY_DELAY || 1000);
      console.log('Задержка перед ответом Бродского:', delay, 'мс');
      
      setTimeout(async () => {
        // С вероятностью 70% получаем цитату из API, иначе используем цитату Бродского
        const useAPI = Math.random() < 0.7;
        let quoteText;
        
        if (useAPI) {
          quoteText = await getQuoteFromAPI();
          console.log('Цитата получена из API');
        } else {
          quoteText = getRandomBrodskiyQuote();
          console.log('Использована локальная цитата Бродского');
        }
        
        io.emit('message', {
          user: 'Бродский',
          text: quoteText,
          time: new Date().toLocaleTimeString()
        });
        console.log('Цитата отправлена');
      }, delay);
      
    } catch (err) {
      console.error('Ошибка при отправке цитаты:', err);
      
      // В случае ошибки используем локальную цитату Бродского
      setTimeout(() => {
        io.emit('message', {
          user: 'Бродский',
          text: getRandomBrodskiyQuote(),
          time: new Date().toLocaleTimeString()
        });
        console.log('Отправлена локальная цитата из-за ошибки');
      }, 1000);
    }
  });

  // Обработка отключения пользователя
  socket.on('disconnect', () => {
    console.log('Пользователь отключился:', socket.id);
  });

}); // Закрывающая скобка для io.on('connection')


// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Чат доступен: http://localhost:${PORT}/`);
}); 