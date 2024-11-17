const express = require('express');
const cors = require('cors');
const app = express();

const { registerUser, getUsers, getUserProfile, loginUser } = require('./controller/authController');

const { getProducts, getProductById, getProductsByCatalogId } = require('./controller/productController');

const { getCatalog, getCatalogById } = require('./controller/catalogController');

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




// Маршрут для получения списка продуктов
app.get('/products', getProducts);

// Маршрут для получения продукта по ID
app.get('/products/:id', getProductById);

// Маршрут для получения продуктов по ID каталога
app.get('/products/catalog/:catalogId', getProductsByCatalogId);




// Маршрут для получения списка каталогов
app.get('/catalog', getCatalog);

// Маршрут для получения каталога по ID
app.get('/catalog/:id', getCatalogById);

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});