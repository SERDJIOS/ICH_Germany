import mongoose from 'mongoose'
import { transactionSchema } from './Transaction.js'

const userSchema = new mongoose.Schema({
  initialBalance: {
    type: Number,
    default: 100,
    required: true,
  },
  currentBalance: {
    type: Number,
    required: true,
  },
  transactions: [transactionSchema],
})

const User = mongoose.model('User', userSchema)
export { User }
