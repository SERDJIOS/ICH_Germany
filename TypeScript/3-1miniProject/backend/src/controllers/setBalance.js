import { User } from '../models/User.js'

const setBalance = async (req, res) => {
  try {
    const { initialBalance } = req.body
    if (
      !initialBalance ||
      typeof initialBalance !== 'number' ||
      initialBalance < 0
    ) {
      return res.status(400).json({ error: 'Incorrect initial balance' })
    }
    const newUser = await User.create({
      initialBalance,
      currentBalance: initialBalance,
      transactions: [],
    })
    res.status(201).json({
      message: 'User was created',
      user: newUser,
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export { setBalance }
