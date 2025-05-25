import express from 'express';
import sequelize from './config/db.js';
import User from './models/user.js';
import bcrypt from 'bcrypt';
import authenticateToken from './middlewares/authenticaToken.js';
import checkAdminInRole from './middlewares/checkAdmin.js';
import checkMustChangePassword from './middlewares/mustChangePassword.js';

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Неверный пароль' });
  }
  res.json({ message: 'Вход успешен', userId: user.id, role: user.role });
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email уже зарегистрирован' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });
  res.status(201).json({ message: 'Регистрация успешна' });
});

app.post('/change-password', async (req, res) => {
  const { userId, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await User.update({ password: hashedPassword, mustChangePassword: false }, { where: { id: userId } });
  res.json({ message: 'Пароль обновлен' });
});

app.post('/delete-account', async (req, res) => {
  const { userId, password } = req.body;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });
  await User.destroy({ where: { id: userId } });
  res.json({ message: 'Аккаунт удален' });
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.body.userId);
  if (user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' });
  next();
};

app.get('/users', authenticateToken, checkAdminInRole, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении пользователей' });
  }
});

app.get('/admin', authenticateToken, checkAdminInRole, (req, res) => {
  res.json({ message: 'Добро пожаловать, админ!' });
});

app.post('/change-email', async (req, res) => {
  const { userId, newEmail, password } = req.body;
  const user = await User.findByPk(userId);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' });
  const emailExists = await User.findOne({ where: { email: newEmail } });
  if (emailExists) return res.status(400).json({ message: 'Email уже используется' });
  await User.update({ email: newEmail }, { where: { id: userId } });
  res.json({ message: 'Email обновлен' });
});

// Middleware для проверки mustChangePassword
app.get('/protected', authenticateToken, checkMustChangePassword, (req, res) => {
  res.json({ message: 'Вы успешно вошли в защищенную зону' });
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
  });
});