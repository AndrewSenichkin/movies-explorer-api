const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const DuplicateUserError = require('../errors/DuplicateUserError');
const PageNotFoundError = require('../errors/PageNotFoundError ');
const InaccurateDataError = require('../errors/InaccurateDataError');

const { SECRET_KEY_DEV } = require('../utils/constants');

const { NODE_ENV, SECRET_KEY } = process.env;
const { CREATED_CODE } = require('../errors/StatusCode');

// Функция создания нового пользователя
const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => res.status(CREATED_CODE).send({
      email: user.email,
      name: user.name,
      _id: user._id,
    }))
    .catch((e) => {
      if (e.code === 11000) {
        next(new DuplicateUserError('Такой пользователь уже существует'));
      } else if (e.name === 'ValidationError') {
        next(
          new InaccurateDataError(
            'Переданы некорректные данные при создании пользователя',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Функция аутентификации пользователя
const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // Создание JWT-токена
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : SECRET_KEY_DEV,
        { expiresIn: '7d' },
      );

      // Отправка токена в ответ
      res.send({ token });
    })
    .catch(next);
};

// Получение данных текущего пользователя
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(() => {
      throw new PageNotFoundError('Пользователь по указанному _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new InaccurateDataError('Запрашиваемый пользователь не найден'));
      } else {
        next(e);
      }
    });
};

// Обновление данных пользователя
const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new PageNotFoundError('Пользователь с указанным _id не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      if (e.code === 11000) {
        next(new DuplicateUserError('Такой пользователь уже существует'));
      } else if (e.name === 'ValidationError') {
        next(
          new InaccurateDataError('Переданы некорректные данные при обновлении профиля'),
        );
      } else {
        next(e);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateUser,
  login,
};
