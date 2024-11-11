const { Pool } = require('pg');
require('dotenv').config();

// Подключение к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'smart',
    password: '27324853',
    port: 5000,
});

module.exports = pool;