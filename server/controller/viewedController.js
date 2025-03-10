const pool = require('../db');

const transformEncoding = require('../transformEncoding');
const extractUserIdFromToken = require('../extractUserIdFromToken');

const getViewed = async (req, res) => {
    const token = req.params.token;

    if (!token) {
        return res.status(401).json({ message: 'Токен отсутствует' });
    }

    try {
        const userId = extractUserIdFromToken(token);

        const viewed = await pool.query(`
            SELECT product_id
            FROM viewed
            WHERE user_id = $1
        `, [userId]);

        if (viewed.rowCount === 0) {
            return res.status(404).json({ message: 'Нет просмотренных товаров для данного пользователя' });
        }

        res.status(200).json(viewed.rows.map(row => row.product_id)); // Возвращаем только массив product_id
    } catch (error) {
        console.error('Ошибка при получении просмотренных товаров:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};


const postViewed = async (req, res) => {
    const { token, productIds } = req.body; // Ожидаем массив productIds

    if (!token) {
        return res.status(401).json({ message: 'Токен отсутствует' });
    }

    // Проверка корректности productIds
    if (!Array.isArray(productIds) || productIds.length === 0 || productIds.some(isNaN)) {
        return res.status(400).json({ message: 'Некорректные productIds' });
    }

    try {
        const userId = extractUserIdFromToken(token);

        // Разбиваем массив productIds на строки для вставки
        const values = productIds.map((id) => `(${userId}, ${id})`).join(',');

        if (values) {
            await pool.query(`
                INSERT INTO viewed (user_id, product_id)
                VALUES ${values}
                ON CONFLICT (user_id, product_id) DO NOTHING;
            `);
        }

        res.status(201).json({ message: 'Товары добавлены в просмотренные' });
    } catch (error) {
        console.error('Ошибка при добавлении товаров в просмотренные:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};



module.exports = { getViewed, postViewed };