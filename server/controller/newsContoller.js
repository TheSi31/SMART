const pool = require('./../db');

const transformEncoding = require('../transformEncoding');

const getNews = async (req, res) => {
    try {
    const news = await pool.query('SELECT id, title, date, preview_img, summary FROM news;');

        const transformedRows = transformEncoding(news.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting news' });
    }
};

const getNewsById = async (req, res) => {
    try {
        const news = await pool.query('SELECT * FROM news WHERE id = $1;', [req.params.id]);

        const transformedRows = transformEncoding(news.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting news by id' });
    }
};

module.exports = { getNews, getNewsById };