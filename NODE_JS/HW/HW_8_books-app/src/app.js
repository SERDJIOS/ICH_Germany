import express from 'express';
import sequelize from './config/db.js';
import Book from './models/book.js';

const app = express();
app.use(express.json());

app.get('/books', async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

app.post('/books', async (req, res) => {
  const { title, author, year } = req.body;
  const book = await Book.create({ title, author, year });
  res.status(201).json(book);
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;
  await Book.update({ title, author, year }, { where: { id } });
  res.json({ message: 'Книга обновлена' });
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  await Book.destroy({ where: { id } });
  res.json({ message: 'Книга удалена' });
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
  });
});
