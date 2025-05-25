import express from 'express';
import 'dotenv/config';
import sequelize from '../config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // добавлены скобки!

app.get('/', (req, res) => {
  res.send('Hello sequelize');
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to the DB');
    console.log(`Server is listening on port ${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the DB:', error);
  }
});