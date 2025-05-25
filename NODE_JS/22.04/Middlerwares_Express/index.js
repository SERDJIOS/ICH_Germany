// Убедитесь, что у вас уже есть настроенное Express-приложение.

// Если вы ещё не сделали этого, создайте приложение, используя `npm init` и установите Express через `npm install express`.
// Создайте новый файл или используйте существующий, например, `index.js`, где будет описано ваше приложение.

// Создание middleware-функции

// Создайте новую функцию, которая будет являться вашим middleware. Эта функция должна принимать три параметра: `req` (запрос), `res` (ответ) и `next` (функция для передачи управления следующему middleware или маршруту).
// Внутри функции реализуйте основную логику. Создайте middleware, который будет выводить в консоль информацию о каждом запросе — метод запроса и путь.
// После выполнения этой задачи обязательно вызовите `next()`, чтобы запрос мог продолжить своё движение через цепочку middlewares и дойти до нужного маршрута.

import express from 'express'

const app = express();
app.use(express.json());

const PORT = 3000 
function logRequest (req,res,next){
    console.log(`Method: ${req.method}, url: ${req.url}`);
    next()
}

app.use(logRequest)
app.get('/', (req,res) => {
    res.send(`Hello, world!`)
})

app.get('/result', (req,res) => {
    res.json({message: 'opacha'})
})
app.listen(PORT, () => {
    console.log(`Listening on port http://127.0.0.1:${PORT}`);
  });
  
