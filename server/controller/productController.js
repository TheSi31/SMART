const pool = require('./../db');

const transformEncoding = require('../transformEncoding');
const extractUserIdFromToken = require('../extractUserIdFromToken');

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

        let productsQuery = `
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
        `;

        const queryParams = [];

        if (categoriesId === "-1") {
            productsQuery += "ORDER BY p.is_new DESC;";
        } else if (categoriesId === "-2") {
            productsQuery += "ORDER BY p.is_best_seller DESC;";
        } else {
            productsQuery += "WHERE c.id = $1;";
            queryParams.push(categoriesId);
        }

        const productsResult = await pool.query(productsQuery, queryParams);
        const transformedProducts = transformEncoding(productsResult.rows);

        // Получение характеристик для всех продуктов
        const productIds = transformedProducts.map((product) => product.id);
        if (productIds.length > 0) {
            const characteristicsQuery = `
                SELECT 
                    pc.product_id, 
                    ct.name AS characteristic_name, 
                    pc.value AS characteristic_value
                FROM Product_characteristics pc
                JOIN Characteristics_templates ct ON pc.template_id = ct.id
                WHERE pc.product_id = ANY($1::int[]);
            `;
            const characteristicsResult = await pool.query(characteristicsQuery, [productIds]);
            const characteristics = transformEncoding(characteristicsResult.rows);

            // Добавление характеристик к каждому продукту
            transformedProducts.forEach((product) => {
                product.characteristics = characteristics
                    .filter((ch) => ch.product_id === product.id)
                    .map((ch) => ({
                        name: ch.characteristic_name,
                        value: ch.characteristic_value,
                    }));
            });
        }

        res.status(200).json(transformedProducts);
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

const getMaxPriceByCategories = async (req, res) => {
    try {
        const products = await pool.query(`
            SELECT 
                MAX(p.price) AS max_price
            FROM 
                products p
            JOIN 
                categories c 
            ON 
                p.categories_id = c.id
            WHERE 
                c.id = $1;

        `,[req.params.categoriesId]);

        const transformedRows = transformEncoding(products.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting max price' });
    }
};

const getFavorites = async (req, res) => {
    const token = req.params.token;

    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Токен отсутствует' });
    }

    const userId = extractUserIdFromToken(token);

    try {
        const favorites = await pool.query(`
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
            FROM favorites f
            JOIN products p ON f.product_id = p.id
            JOIN categories c ON p.categories_id = c.id
            WHERE f.user_id = $1;
        `, [userId]);

        
        const transformedRows = transformEncoding(favorites.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting favorites' });
    }
};


const postFavorites = async (req, res) => {
    try {
      const { token, product_id } = req.body;
  
      if (!token) {
        return res.status(401).json({ message: 'Токен отсутствует' });
      }
  
      console.log('Полученный токен:', token);
  
      const userId = extractUserIdFromToken(token);
  
      console.log('Полученный userId:', userId);
  
      await pool.query(`
        INSERT INTO favorites (user_id, product_id)
        VALUES ($1, $2);
      `, [userId, product_id]);
  
      res.status(201).json({ message: 'Product added to favorites' });
  
    } catch (error) {
      console.error('Ошибка обработки токена или запроса:', error.message);
      res.status(500).json({ message: error.message });
    }
};
  

const deleteFavorites = async (req, res) => {
    try {
        const { token, product_id } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }
    
        console.log('Полученный токен:', token);
    
        const userId = extractUserIdFromToken(token);
    
        console.log('Полученный userId:', userId);

        await pool.query(`
            DELETE FROM favorites
            WHERE user_id = $1 AND product_id = $2;
        `, [userId, product_id]);

        res.status(200).json({ message: 'Product removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing product from favorites' });
    }
};

const checkFavorite = async (req, res) => {
    try {
      const token = req.query.token;
      const product_id = req.query.product_id;
      
      const userId = extractUserIdFromToken(token);
      const result = await pool.query(`
        SELECT *
        FROM favorites
        WHERE user_id = $1 AND product_id = $2;
      `, [userId, product_id]);
      
      res.json({ liked: result.rowCount > 0 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error checking favorite' });
    }
};

const getCommentByUserId = async (req, res) => {
    try {
        const comments = await pool.query(`
            SELECT 
                c.id,
                c.user_id,
                c.product_id,
                c.comment,
                c.rating,
                c.created_at,
                u.username
            FROM comments_ratings c
            JOIN users u ON c.user_id = u.id
            WHERE c.user_id = $1;
        `, [req.params.userId]);

        res.status(200).json(comments.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting comments' });
    }
};

const getCommentByProductId = async (req, res) => {
    try {
        const comments = await pool.query(`
            SELECT 
                c.id,
                c.user_id,
                c.product_id,
                c.comment,
                c.rating,
                c.created_at,
                u.username
            FROM comments_ratings c
            JOIN users u ON c.user_id = u.id
            WHERE c.product_id = $1;
        `, [req.params.productId]);

        res.status(200).json(comments.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting comments' });
    }
};


const postComment = async (req, res) => {
    try {
        const { user_id, product_id, comment, rating } = req.body;
        await pool.query(`
            INSERT INTO comments_ratings (user_id, product_id, comment, rating)
            VALUES ($1, $2, $3, $4);
        `, [user_id, product_id, comment, rating]);

        res.status(201).json({ message: 'Comment created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating comment' });
    }
};
  

module.exports = { getProducts, getProductById, getProductsByCategoriesId, getProductsByIdMore, 
    getMaxPriceByCategories, getFavorites, postFavorites, deleteFavorites, checkFavorite,
    getCommentByProductId, getCommentByUserId, postComment };