const pool = require('./../db');
const iconv = require('iconv-lite');

const getProducts = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id, 
                c.name AS catalog, 
                p.name, 
                p.price, 
                p.old_price, 
                p.is_new, 
                p.is_best_seller, 
                p.image_url, 
                p.description
            FROM products p
            JOIN catalogs c ON p.catalog_id = c.id;
        `;

        const products = await pool.query(query);

        const transformedRows = products.rows.map(row => {
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
        res.status(500).json({ message: 'Error getting products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id, 
                c.name AS catalog, 
                p.name, 
                p.price, 
                p.old_price, 
                p.is_new, 
                p.is_best_seller, 
                p.image_url, 
                p.description
            FROM products p
            JOIN catalogs c ON p.catalog_id = c.id
            WHERE p.id = $1;
        `;

        const product = await pool.query(query, [req.params.id]);

        const transformedRows = product.rows.map(row => {
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
        res.status(500).json({ message: 'Error getting product by id' });
    }
};

const getProductsByCatalogId = async (req, res) => {
    try {
        const catalogId = req.params.catalogId;
        const products = await pool.query('SELECT * FROM products WHERE catalog_id = $1;', [catalogId]);

        const transformedRows = products.rows.map(row => {
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
        res.status(500).json({ message: 'Error getting products by catalog id' });
    }
};

module.exports = { getProducts, getProductById, getProductsByCatalogId };