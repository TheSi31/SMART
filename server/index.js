const express = require('express');
const cors = require('cors');
const app = express();

const { registerUser, getUsers, getUserProfile, loginUser } = require('./controller/authController');

// Разрешаем CORS для всех запросов
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true, 
  }));
  
app.use(express.json()); 


// Маршрут для регистрации
app.post('/register', registerUser);

// Маршрут для получения списка пользователей
app.get('/users', getUsers);

// Маршрут для получения профиля пользователя
app.get('/profile', getUserProfile);

// Маршрут для авторизации
app.post('/login', loginUser);



// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});