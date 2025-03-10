const pool = require('./../db');

const transformEncoding = require('../transformEncoding');
const extractUserIdFromToken = require('../extractUserIdFromToken');

const getOrders = async (req, res) => {
    try {
        const orders = await pool.query('SELECT * FROM orders;');
        res.status(200).json(orders.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
};

const getOrdersByUserId = async (req, res) => {
    try { 
        const token = req.params.token;
    
        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }
    
        const userId = extractUserIdFromToken(token);
    
        const orders = await pool.query('SELECT * FROM orders WHERE user_id = $1;', [userId]);
    
        res.status(200).json(orders.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders by user id' });
    }
};

const postOrders = async (req, res) => {
    const {
      token,
      cart,
      delivery: { city, address, method, date, time, comment },
      payment: { method: paymentMethod, total },
      recipient: { name, phone },
      status
    } = req.body;
  
    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    console.log('Полученный токен:', token);

    const userId = extractUserIdFromToken(token);

    console.log('Полученный userId:', userId);

    try {
      // Правильная сериализация данных cart в JSON-строку
      const serializedCart = JSON.stringify(cart);
  
      const newOrder = await pool.query(
        `INSERT INTO orders (
          user_id, cart, delivery_city, delivery_address, delivery_method, delivery_date, delivery_time, delivery_comment,
          payment_method, payment_total, recipient_name, recipient_phone, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [userId, serializedCart, city, address, method, date, time, comment, paymentMethod, total, name, phone, status]
      );
  
      res.status(201).json(newOrder.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при создании заказа' });
    }
};
  

  

module.exports = { getOrders, getOrdersByUserId, postOrders };