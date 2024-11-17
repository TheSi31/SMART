const pool = require('./../db');
const iconv = require('iconv-lite');

const getCatalog = async (req, res) => {
    try {
        const catalog = await pool.query('SELECT * FROM catalogs;');

        const transformedRows = catalog.rows.map(row => {
            const transformedRow = {};

            for (const [key, value] of Object.entries(row)) {
                if (typeof value === 'string') {
                    // Преобразование из UTF-8 в windows-1251
                    const windows1251Text = iconv.encode(value, 'windows-1251');
                    // Преобразование из windows-1251 в CP866
                    transformedRow[key] = iconv.decode(windows1251Text, 'cp866');
                } else {
                    transformedRow[key] = value;
                }
            }

            return transformedRow;
        });

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting catalog' });
    }
};

const getCatalogById = async (req, res) => {
    try {
        const catalog = await pool.query('SELECT name FROM catalogs WHERE id = $1;', [req.params.id]);

        const transformedRows = catalog.rows.map(row => {
            const transformedRow = {};

            for (const [key, value] of Object.entries(row)) {
                if (typeof value === 'string') {
                    // Преобразование из UTF-8 в windows-1251
                    const windows1251Text = iconv.encode(value, 'windows-1251');
                    // Преобразование из windows-1251 в CP866
                    transformedRow[key] = iconv.decode(windows1251Text, 'cp866');
                } else {
                    transformedRow[key] = value;
                }
            }

            return transformedRow;
        });

        res.status(200).json(transformedRows);

        res.json(catalog.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting catalog by id' });
    }
};

module.exports = { getCatalog, getCatalogById };