const express = require('express');
const cors = require('cors');
const app = express();

const { registerUser, getUsers, getUserProfile, postUserInfo, putUserInfo, resetPassword, checkUserInfoExists, loginUser } = require('./controller/authController');

const { getProducts, getProductById, getProductsByCategoriesId, getProductsByIdMore, getProductByIds,
  getMaxPriceByCategories, getProductToCompare, getFavorites, postFavorites, deleteFavorites, checkFavorite,
  getCommentCount, getCommentByProductId, getCommentByUserId, postComment } = require('./controller/productController');

const { getCategory, getCategoryById, getCategoryByFilter } = require('./controller/categoryController');

const { getNews, getNewsById } = require('./controller/newsContoller');

const { getPromos, getPromoById } = require('./controller/promosController');

const { getOrders, getOrdersByUserId, postOrders } = require('./controller/ordersController');

const { getVacancies, postVacancy } = require('./controller/vacanciesController');

const { getCart, postCart, deleteCart } = require('./controller/cartContoller');

const { getViewed, postViewed } = require('./controller/viewedController');

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
app.get('/profile/:token', getUserProfile);

// Маршрут для добавления информации о пользователе
app.post('/profile', postUserInfo);

// Маршрут для обновления информации о пользователе
app.put('/profile', putUserInfo);

// Маршрут для авторизации
app.post('/login', loginUser);

// Маршрут для сброса пароля
app.post('/reset-password', resetPassword);

// Маршрут для проверки существования пользователя
app.get('/check-user-info/:token', checkUserInfoExists);




// Маршрут для получения списка продуктов
app.get('/products', getProducts);

// Маршрут для получения продукта по ID
app.get('/products/:id', getProductById);

// Маршрут для получения продуктов по ID категории
app.get('/products/categories/:categoriesId', getProductsByCategoriesId);

// Маршрут для получения продуктов по IDs
app.get('/products/ids/:ids', getProductByIds);

// Маршрут для получения подробностей о продукте по ID продукта
app.get('/products/:id/more', getProductsByIdMore);

// Маршрут для получения продуктов для сравнения
app.get('/products/compare/:id', getProductToCompare);

// Маршрут для получения максимальной цены
app.get('/max-price/categories/:categoriesId', getMaxPriceByCategories);




// Маршрут для получения списка корзины
app.get('/cart/:token', getCart);

// Маршрут для добавления продукта в корзину
app.post('/cart', postCart);

// Маршрут для удаления продукта из корзины
app.delete('/cart', deleteCart);





// Маршрут для получения списка заказов
app.get('/orders', getOrders);

// Маршрут для получения списка заказов пользователя
app.get('/orders/:token', getOrdersByUserId);

// Маршрут для создания заказа
app.post('/orders', postOrders);




// Маршрут для получения списка избранных продуктов
app.get('/favorites/user/:token', getFavorites);

// Маршрут для добавления в избранное
app.post('/favorites', postFavorites);

// Маршрут для удаления из избранного
app.delete('/favorites', deleteFavorites);

// Маршрут для проверки наличия продукта в избранном
app.get('/favorites/check', checkFavorite);




// Маршрут для получения списка просмотренных продуктов
app.get('/viewed/:token', getViewed);

// Маршрут для добавления продукта в просмотренные
app.post('/viewed', postViewed);






// Маршрут для получения количества комментариев
app.get('/comments/count/:productId', getCommentCount);

// Маршрут для получения комментариев к продукту
app.get('/comments/product/:productId', getCommentByProductId);

// Маршрут для получения комментариев пользователя
app.get('/comments/user/:userId', getCommentByUserId);

// Маршрут для создания комментария
app.post('/comments', postComment);





// Маршрут для получения списка категорий
app.get('/categories', getCategory);

// Маршрут для получения категории по ID
app.get('/categories/:id', getCategoryById);

// Маршрут для получения фильтров по категории
app.get('/categories/:id/more', getCategoryByFilter);





// Маршрут для получения списка новостей
app.get('/news', getNews);

// Маршрут для получения новости по ID
app.get('/news/:id', getNewsById);




// Маршрут для получения списка акций
app.get('/promos', getPromos);

// Маршрут для получения акции по ID
app.get('/promos/:id', getPromoById);





// Маршрут для получения списка вакансий
app.get('/vacancies', getVacancies);

// Маршрут для создания вакансии
app.post('/vacancies', postVacancy);


// Маршрут для загрузки изображений
app.use('/uploads/products', express.static('img/products'));


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});