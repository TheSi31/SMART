const pool = require('../db');

const transformEncoding = require('../transformEncoding');

const getCategory = async (req, res) => {
    try {
        const category = await pool.query('SELECT * FROM categories;');

        const transformedRows = transformEncoding(category.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting catalog' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await pool.query('SELECT name FROM categories WHERE id = $1;', [req.params.id]);

        const transformedRows = transformEncoding(category.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting catalog by id' });
    }
};

module.exports = { getCategory, getCategoryById };