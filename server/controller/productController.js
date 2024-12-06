const pool = require('./../db');

const transformEncoding = require('../transformEncoding');

const getProducts = async (req, res) => {
    try {
        const query = `
            SELECT 
                p.id,
                p.categories_id, 
                c.name AS categories, 
                p.name, 
                p.price, 
                p.old_price, 
                p.is_new, 
                p.is_best_seller, 
                p.image_url, 
                p.description
            FROM products p
            JOIN categories c ON p.categories_id = c.id;
        `;

        const products = await pool.query(query);

        const transformedRows = transformEncoding(products.rows);

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
                p.categories_id, 
                c.name AS categories, 
                p.name, 
                p.price, 
                p.old_price, 
                p.is_new, 
                p.is_best_seller, 
                p.image_url, 
                p.description
            FROM products p
            JOIN categories c ON p.categories_id = c.id
            WHERE p.id = $1;
        `;

        const product = await pool.query(query, [req.params.id]);

        const transformedRows = transformEncoding(product.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting product by id' });
    }
};

const getProductsByCategoriesId = async (req, res) => {
    try {
        const categoriesId = req.params.categoriesId;

        if (categoriesId == "-1"){
            const products = await pool.query(`
                SELECT 
                    p.id, 
                    c.name AS categories, 
                    p.name, 
                    p.price, 
                    p.old_price, 
                    p.is_new, 
                    p.is_best_seller, 
                    p.image_url, 
                    p.description
                FROM products p
                JOIN categories c ON p.categories_id = c.id
                ORDER BY p.is_new DESC;
            `);

            const transformedRows = transformEncoding(products.rows);

            res.status(200).json(transformedRows);
        } else if(categoriesId == "-2"){
            const products = await pool.query(`
                SELECT 
                    p.id, 
                    c.name AS categories, 
                    p.name, 
                    p.price, 
                    p.old_price, 
                    p.is_new, 
                    p.is_best_seller, 
                    p.image_url, 
                    p.description
                FROM products p
                JOIN categories c ON p.categories_id = c.id
                ORDER BY p.is_best_seller DESC;
            `);

            const transformedRows = transformEncoding(products.rows);

            res.status(200).json(transformedRows);
        } else {
            const products = await pool.query(`
                SELECT 
                    p.id,
                    p.categories_id, 
                    c.name AS categories, 
                    p.name, 
                    p.price, 
                    p.old_price, 
                    p.is_new, 
                    p.is_best_seller, 
                    p.image_url, 
                    p.description
                FROM products p
                JOIN categories c ON p.categories_id = c.id
                WHERE c.id = $1;
            `, [categoriesId]);

            const transformedRows = transformEncoding(products.rows);

            res.status(200).json(transformedRows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products by categories id' });
    }
};

const getProductsByIdMore = async (req, res) => {
    try {
        const products = await pool.query(`
            SELECT 
                ct.name,
                pc.value
            FROM 
                product_characteristics pc
            JOIN 
                characteristics_templates ct 
            ON 
                pc.template_id = ct.id
            WHERE 
                pc.product_id = $1;
        `, [req.params.id]);

        const transformedRows = transformEncoding(products.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting products by id more' });
    }
};

module.exports = { getProducts, getProductById, getProductsByCategoriesId, getProductsByIdMore };