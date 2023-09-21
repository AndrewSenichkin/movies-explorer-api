const jwt = require('jsonwebtoken');

const AuthenticationError = require('../errors/AuthenticationError');

const { SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;

// Промежуточное ПО (Middleware) для проверки аутентификации пользователя
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // Проверяем наличие и формат заголовка авторизации
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new AuthenticationError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // Проверяем валидность и расшифровываем JWT-токен
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
    );
  } catch (err) {
    next(new AuthenticationError('Необходима авторизация!'));
    return;
  }

  req.user = payload; // Записываем расшифрованные данные токена в объект запроса

  next(); // Пропускаем запрос дальше
};
