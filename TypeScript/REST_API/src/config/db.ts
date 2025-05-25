import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://localhost:27017/rest-api';

// Функция для подключения к базе данных
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB успешно подключена');
  } catch (error) {
    console.error('Ошибка подключения к MongoDB:', error);
    process.exit(1);
  }
};

// Функция для отключения от базы данных
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Отключено от MongoDB');
  } catch (error) {
    console.error('Ошибка отключения от MongoDB:', error);
  }
};

// Обработка событий соединения с базой данных
mongoose.connection.on('connected', () => {
  console.log('Mongoose подключен к MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Ошибка соединения Mongoose:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose отключен от MongoDB');
});

// Обработка сигналов завершения приложения
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
