import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true }, // Описание транзакции
  amount: { type: Number, required: true },      // Сумма транзакции
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ссылка на пользователя
  date: { type: Date, default: Date.now },       // Дата транзакции
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;