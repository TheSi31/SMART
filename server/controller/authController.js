const pool = require('./../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractUserIdFromToken = require('../extractUserIdFromToken');

const registerUser = async (req, res) => {
  const { username, email, phone_number, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      `INSERT INTO users (username, email, phone_number, password_hash) VALUES ($1, $2, $3, $4) RETURNING *`,
      [username, email, phone_number, passwordHash]
    );

    const token = jwt.sign({ userId: newUser.rows[0].id }, "dashailoveyou");

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка регистрации пользователя' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошиька получения пользователей' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const userId = extractUserIdFromToken(token);

    const user = await pool.query(`
      SELECT 
        u.id,
        u.username,
        u.email,
        u.phone_number,
        ui.city,
        ui.address,
        ui.payment_method,
        ui.delivery_method,
        u.created_at,
        COUNT(o.user_id) AS orders_count
      FROM users u
      LEFT JOIN user_info ui ON u.id = ui.user_id
      LEFT JOIN orders o ON u.id = o.user_id
      WHERE u.id = $1
      GROUP BY 
        u.id, u.username, u.email, u.phone_number, 
        ui.city, ui.address, ui.payment_method, ui.delivery_method, 
        u.created_at
    `, [userId]);

    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error('Ошибка при получении профиля пользователя:', error);
    res.status(500).json({ message: 'Ошибка при получении профиля пользователя' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const {password, passwordNew, token} = req.body;

    if (!token) {
      return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const userId = extractUserIdFromToken(token);

    await pool.query(`
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
    `, [await bcrypt.hash(passwordNew, 10), userId]);

    res.status(200).json({ message: 'Пароль успешно изменен' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка изменения пароля' });
  }
};

const postUserInfo = async (req, res) => {
  try {
    const { token, username, email, phone_number, address, payment_method, delivery_method, city } = req.body;

    const userId = extractUserIdFromToken(token);

    await pool.query(`
      UPDATE users
      SET username = $1,
          email = $2,
          phone_number = $3
      WHERE id = $4
    `, [username, email, phone_number, userId]);

    await pool.query(`
      INSERT INTO user_info (user_id, city, address, payment_method, delivery_method)
      VALUES ($1, $2, $3, $4, $5)
    `, [userId, city, address, payment_method, delivery_method]);

    res.status(201).json({ message: "Пользовательские данные успешно созданы" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка создание пользовательских данных" });
  }
};


const putUserInfo = async (req, res) => {
  try {
    const { token, username, email, phone_number, address, payment_method, delivery_method, city } = req.body;

    const userId = extractUserIdFromToken(token);

    await pool.query(`
      UPDATE users
      SET username = $1,
          email = $2,
          phone_number = $3
      WHERE id = $4
    `, [username, email, phone_number, userId]);

    await pool.query(`
      UPDATE user_info
      SET city = $1,
          address = $2,
          payment_method = $3,
          delivery_method = $4
      WHERE user_id = $5
    `, [city, address, payment_method, delivery_method, userId]);

    res.status(200).json({ message: "Пользовательские данные успешно обновлены" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка обновления пользовательских данных" });
  }
};

const checkUserInfoExists = async (req, res) => {
  try {
    const { token } = req.params;
    const userId = extractUserIdFromToken(token);

    const result = await pool.query(`
      SELECT 1 FROM user_info WHERE user_id = $1
    `, [userId]);

    res.status(200).json({ exists: result.rowCount > 0 });
  } catch (error) {
    console.error('Ошибка проверки user_info:', error);
    res.status(500).json({ message: 'Ошибка проверки user_info' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверные данные' });
    }

    const token = jwt.sign({ userId: user.rows[0].id }, "dashailoveyou");

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка входа' });
  }
};

module.exports = { registerUser, getUsers, getUserProfile, postUserInfo, putUserInfo, resetPassword, checkUserInfoExists, loginUser };
