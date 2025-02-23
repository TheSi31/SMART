const pool = require('./../db');

const transformEncoding = require('../transformEncoding');

const getOrders = async (req, res) => {
    try {
        const orders = await pool.query('SELECT * FROM orders;');
        res.status(200).json(orders.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting orders' });
    }
};

const postOrders = async (req, res) => {
    const {
      cart,
      delivery: { city, address, method, date, time, comment },
      payment: { method: paymentMethod, total },
      recipient: { name, phone },
    } = req.body;
  
    try {
      // Правильная сериализация данных cart в JSON-строку
      const serializedCart = JSON.stringify(cart);
  
      const newOrder = await pool.query(
        `INSERT INTO orders (
          cart, delivery_city, delivery_address, delivery_method, delivery_date, delivery_time, delivery_comment,
          payment_method, payment_total, recipient_name, recipient_phone
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [serializedCart, city, address, method, date, time, comment, paymentMethod, total, name, phone]
      );
  
      res.status(201).json(newOrder.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка при создании заказа' });
    }
};
  

  

module.exports = { getOrders, postOrders };