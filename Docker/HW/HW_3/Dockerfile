# Используем официальный образ Node.js в качестве базового
FROM node:18-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --only=production

# Копируем исходный код приложения в контейнер
COPY app.js ./

# Указываем команду для запуска приложения
CMD ["npm", "start"]
