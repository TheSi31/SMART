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
        res.status(500).json({ message: 'Ошибка получения продуктов' });
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
        res.status(500).json({ message: 'Ошибка получения продукта по id' });
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
        res.status(500).json({ message: 'Ошибка получения продукта по id категории' });
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
        res.status(500).json({ message: 'Ошибка получения подробности продутка по id' });
    }
};

const getProductByIds = async (req, res) => {
    try {
        // Преобразуем строку ids в массив чисел
        const ids = req.params.ids.split(',').map(Number);

        // Проверяем, переданы ли корректные данные
        if (!ids || ids.length === 0 || ids.some(isNaN)) {
            return res.status(400).json({ message: 'Некорректные ids' });
        }

        // Выполняем запрос к базе данных
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
            WHERE p.id = ANY($1::int[]);
        `, [ids]);

        // Преобразуем кодировку, если требуется
        const transformedRows = transformEncoding(products.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error('Ошибка при получении продуктов:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
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
        res.status(500).json({ message: 'Ошибка получения максимальной цены' });
    }
};

const getProductToCompare = async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Запрос для основного продукта
      const productQuery = `
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
      const productResult = await pool.query(productQuery, [productId]);
  
      if (productResult.rowCount === 0) {
        return res.status(404).json({ message: 'Продукт не найден' });
      }
  
      // Преобразуем данные для продукта
      const product = transformEncoding(productResult.rows)[0];
  
      // Запрос для характеристик продукта
      const characteristicsQuery = `
        SELECT 
            ct.name AS characteristic_name, 
            pc.value AS characteristic_value
        FROM product_characteristics pc
        JOIN characteristics_templates ct ON pc.template_id = ct.id
        WHERE pc.product_id = $1;
      `;
      const characteristicsResult = await pool.query(characteristicsQuery, [productId]);
  
      const characteristics = transformEncoding(characteristicsResult.rows || []);
  
      // Добавляем характеристики в продукт
      product.characteristics = characteristics.map((ch) => ({
        name: ch.characteristic_name,
        value: ch.characteristic_value,
      }));
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка получение продукта для сравнения' });
    }
  };
  


const getFavorites = async (req, res) => {

    const token = req.params.token;

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
        res.status(500).json({ message: 'Ошибка получения избранных' });
    }
};


const postFavorites = async (req, res) => {
    try {
      const { token, product_id } = req.body;
  
      if (!token) {
        return res.status(401).json({ message: 'Токен отсутствует' });
      }
  
      const userId = extractUserIdFromToken(token);
  
      await pool.query(`
        INSERT INTO favorites (user_id, product_id)
        VALUES ($1, $2);
      `, [userId, product_id]);
  
      res.status(201).json({ message: 'Продукт добавлен в избранные' });
  
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
    
        const userId = extractUserIdFromToken(token);

        await pool.query(`
            DELETE FROM favorites
            WHERE user_id = $1 AND product_id = $2;
        `, [userId, product_id]);

        res.status(200).json({ message: 'Продукт удален с избранных' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при удаления продукта из избранных' });
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
      res.status(500).json({ message: 'Ошибка проверки избранных' });
    }
};

const getCommentCount = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.comment,
                c.rating,
                COUNT(*) OVER() as count,
                AVG(c.rating) OVER() as rating
            FROM comments_ratings c
            WHERE c.product_id = $1;
        `, [req.params.productId]);

        const comments = result.rows.map(row => ({
            comment: row.comment,
            rating: row.rating
        }));

        res.status(200).json({
            comments,
            count: result.rows[0]?.count || 0,
            rating: result.rows[0]?.rating || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения комментариев' });
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
        res.status(500).json({ message: 'Ошибка получения комментариев' });
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
        res.status(500).json({ message: 'Ошибка получения комментариев' });
    }
};


const postComment = async (req, res) => {
    try {
        const { token, product_id, comment, rating } = req.body;

        if (!token) {
            return res.status(401).json({ message: 'Токен отсутствует' });
        }

        const user_id = extractUserIdFromToken(token);

        await pool.query(`
            INSERT INTO comments_ratings (user_id, product_id, comment, rating)
            VALUES ($1, $2, $3, $4);
        `, [user_id, product_id, comment, rating]);

        res.status(201).json({ message: 'Комментарий добавлен' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при добавления комментария' });
    }
};
  

module.exports = { getProducts, getProductById, getProductsByCategoriesId, getProductsByIdMore, getProductByIds, 
    getMaxPriceByCategories, getProductToCompare, getFavorites, postFavorites, deleteFavorites, checkFavorite,
    getCommentCount, getCommentByProductId, getCommentByUserId, postComment };