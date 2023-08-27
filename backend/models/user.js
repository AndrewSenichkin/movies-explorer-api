const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../errors/Unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: ({ length }) => length >= 2 && length <= 30,
      message: 'Имя должно быть от 2 до 30 символов',
    },
  },

  email: {
    unique: true,
    type: String,
    required: true,
    validate: {
      validator: (email) => /.+@.+\..+/.test(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      // попытаемся найти пользователя по почте
      return this
        .findOne({ email })
        .select('+password')
        .then((user) => {
          if (!user) return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
          // нашёлся — сравниваем хеши
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) return Promise.reject(new Unauthorized('Неверные учетные данные'));
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
