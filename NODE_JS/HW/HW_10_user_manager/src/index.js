import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());

const JWT_SECRET = 'my_secret_key';
let users = [
  { id: 1, username: 'admin', email: 'admin@example.com', password: bcrypt.hashSync('admin123', 10), role: 'admin' },
  { id: 2, username: 'user', email: 'user@example.com', password: bcrypt.hashSync('user123', 10), role: 'user' }
];

// Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).json({ message: 'Доступ запрещен' });
  next();
};

// Register
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Заполните все поля' });
  }
  if (users.find(u => u.username === username || u.email === email)) {
    return res.status(400).json({ message: 'Пользователь с таким именем или email уже существует' });
  }
  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: bcrypt.hashSync(password, 10),
    role: 'user'
  };
  users.push(newUser);
  res.status(201).json({ message: 'Пользователь зарегистрирован', newUser });
});

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Неверные данные' });
  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Update email
app.put('/update-email', authenticateJWT, (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  user.email = email;
  res.json({ message: 'Email обновлен', user });
});

// Delete account
app.delete('/delete-account', authenticateJWT, (req, res) => {
  const initialLength = users.length;
  users = users.filter(u => u.id !== req.user.id);
  if (users.length === initialLength) {
    return res.status(404).json({ message: 'Пользователь не найден' });
  }
  res.json({ message: 'Аккаунт удален' });
});

// Update role (admin only)
app.put('/update-role', authenticateJWT, authorizeRole('admin'), (req, res) => {
  const { userId, role } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  user.role = role;
  res.json({ message: 'Роль обновлена', user });
});

// Refresh token
app.post('/refresh-token', authenticateJWT, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
  const newToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token: newToken });
});

app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000'));