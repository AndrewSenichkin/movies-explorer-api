const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const { passwordRegex } = require('../utils/constants');
// централизованнуая обработка ошибок
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDate = require('../errors/IncorrectDate');
const Conflict = require('../errors/Conflict');
const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

function login(req, res, next) {
  const { email, password } = req.body;

  if (!passwordRegex.test(password)) throw new IncorrectDate('Пароль не соответствует регексу');

  User
    .findUserByCredentials(email, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign(
          { _id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '3d' },
        );
        return res.send({ token });
      }
      throw new Unauthorized('401: неверная электронная почта или пароль');
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  if (!passwordRegex.test(password)) throw new IncorrectDate('Пароль не соответствует регексу');

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(201).send({ message: 'Пользователь зарегистрирован' }))
    .catch((err) => {
      if (err.code === 11000) next(new Conflict('Пользователь уже существует'));
      else if (err.name === 'ValidationError') next(new IncorrectDate('Неккоректные данные'));
      else next(err);
    });
}

function getUserInfo(req, res, next) {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (user) return res.send(user);
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDate('Некорректный ID'));
      else next(err);
    });
}

function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send(user);
      throw new NotFoundError('Пользователь не найден');
    })
    .catch((err) => {
      if (err.code === 11000) return next(new Conflict('Пользователь уже существует'));
      if (err.name === 'CastError') return next(new IncorrectDate('Некорректный ID'));
      if (err.name === 'ValidationError') return next(new IncorrectDate('Некорректные данные'));

      return next(err);
    });
}

module.exports = {
  updateUserInfo,
  getUserInfo,
  createUser,
  login,
};
