const pool = require('../db');

const extractUserIdFromToken = require('../extractUserIdFromToken');

const getCart = async (req, res) => {
    try {
        const token = req.params.token;

        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }

        const userId = extractUserIdFromToken(token);

        const cart = await pool.query(`
            SELECT 
                *
            FROM cart
            WHERE user_id = $1;
        `, [userId]);

        res.status(200).json(cart.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения корзины' });
    }
};

const postCart = async (req, res) => {
    try {
        const { token, items } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }

        const userId = extractUserIdFromToken(token);

        await pool.query(`
            INSERT INTO cart (user_id, items)
            VALUES ($1, $2::jsonb)
            ON CONFLICT (user_id)
            DO UPDATE SET items = EXCLUDED.items;
        `, [userId, JSON.stringify(items)]);

        res.status(201).json({ message: 'Корзина создана или обновлена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка создания или обновления корзины' });
    }
};

const deleteCart = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }

        const userId = extractUserIdFromToken(token);

        await pool.query(`
            DELETE FROM cart
            WHERE user_id = $1;
        `, [userId]);

        res.status(200).json({ message: 'Корзина удалена' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка удаления корзины' });
    }
};


module.exports = { getCart, postCart, deleteCart };