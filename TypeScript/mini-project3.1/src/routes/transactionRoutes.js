import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/balance/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/transaction/:userId', async (req, res) => {
  const { description, amount } = req.body;
  
  if (!description || amount === undefined) {
    return res.status(400).json({ message: 'Description and amount are required' });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    const transaction = new Transaction({
      description,
      amount,
      user: user._id,
    });

    await transaction.save();


    user.balance += amount;
    await user.save();

    res.status(201).json({ message: 'Transaction added', transaction, balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;