const pool = require('./../db');

const transformEncoding = require('../transformEncoding');

const getPromos = async (req, res) => {
    try {
        const promos = await pool.query('SELECT * FROM promos;');

        const transformedRows = transformEncoding(promos.rows);

        res.status(200).json(transformedRows);    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения акций' });
    }
};

const getPromoById = async (req, res) => {
    try {
        const promo = await pool.query('SELECT * FROM promos WHERE id=$1;', [req.params.id]);

        if (!promo.rows[0]) {
            return res.status(404).json({ message: 'No promo found' });
        }

        const transformedRows = transformEncoding(promo.rows);
        res.status(200).json(transformedRows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения акции' });
    }
};

module.exports = { getPromos, getPromoById }