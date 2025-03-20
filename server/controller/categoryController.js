const pool = require('../db');

const transformEncoding = require('../transformEncoding');

const getCategory = async (req, res) => {
    try {
        const category = await pool.query('SELECT * FROM categories;');

        const transformedRows = transformEncoding(category.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения каталога' });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await pool.query('SELECT name FROM categories WHERE id = $1;', [req.params.id]);

        const transformedRows = transformEncoding(category.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения каталога по id' });
    }
};

const getCategoryByFilter = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                ct.name AS characteristic_name,
                pc.value AS characteristic_value,
                COUNT(p.id) AS product_count
            FROM 
                products AS p
            JOIN 
                product_characteristics AS pc ON p.id = pc.product_id
            JOIN 
                characteristics_templates AS ct ON pc.template_id = ct.id
            WHERE 
                p.categories_id = $1
            GROUP BY 
                ct.name, pc.value;
        `;

        const result = await pool.query(query, [id]);

        const transformedRows = transformEncoding(result.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения каталога по id' });
    }
};


module.exports = { getCategory, getCategoryById, getCategoryByFilter };