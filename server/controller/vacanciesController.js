const pool = require('../db');

const transformEncoding = require('../transformEncoding');

const getVacancies = async (req, res) => {
    try {
        const vacancies = await pool.query(`
            SELECT * FROM vacancies;
        `);

        const transformedRows = transformEncoding(vacancies.rows);

        res.status(200).json(transformedRows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка получения вакансий' });
    }
};

const postVacancy = async (req, res) => {
    try {
        const { title, description, requirements, conditions } = req.body;

        await pool.query(`
            INSERT INTO vacancies (title, description, requirements, conditions)
            VALUES ($1, $2, $3, $4)
        `, [title, description, requirements, conditions]);

        res.status(201).json({ message: 'Вакансия создана' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка создания вакансии' });
    }
};

module.exports = { getVacancies, postVacancy };