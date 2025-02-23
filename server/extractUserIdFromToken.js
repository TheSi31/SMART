const jwt = require('jsonwebtoken');
const secretKey = 'dashailoveyou'; 

function extractUserIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Декодированный токен:', decoded);
    return decoded.userId;
  } catch (error) {
    console.error('Ошибка декодирования токена:', error.message);
    throw new Error('Неверный или просроченный токен');
  }
}

module.exports = extractUserIdFromToken;
