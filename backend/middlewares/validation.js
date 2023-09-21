const { Joi, celebrate } = require('celebrate');
// Подключение модуля celebrate из пакета celebrate,
// который предоставляет удобные средства для валидации запросов

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
// Подключение регулярного выражения URL_REGEX

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});
// Валидатор для проверки данных при входе пользователя в систему.
// Проверяет, что поле email является обязательным и содержит правильный
// формат электронной почты, а также что поле password является обязательным.

const createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
    password: Joi.string().required(),
  }),
});
// Валидатор для проверки данных при создании нового пользователя.
// Проверяет, что поле name является обязательным и содержит строку
// длиной от 2 до 30 символов, поле email является обязательным и
// содержит правильный формат электронной почты, а также
// что поле password является обязательным.

const createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_REGEX),
    trailerLink: Joi.string().required().regex(URL_REGEX),
    thumbnail: Joi.string().required().regex(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
// Валидатор для проверки данных при создании нового фильма.
// Проверяет, что все поля соответствуют определенным требованиям,
// например, что они являются обязательными или содержат правильные форматы данных.

const deleteMovieValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});
// Валидатор для проверки данных при удалении фильма. Проверяет,
// что поле movieId является обязательным и содержит
// шестнадцатеричное значение длиной 24 символа.

const getCurrentUserValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});
// Валидатор для проверки данных при получении информации о текущем пользователе.
// Проверяет, что поле userId является обязательным
// и содержит шестнадцатеричное значение длиной 24 символа.

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});
// Валидатор для проверки данных при обновлении информации о пользователе.
// Проверяет, что поле name является обязательным и содержит строку длиной
// от 2 до 30 символов, а также что поле email является обязательным
// и содержит правильный формат электронной почты.

module.exports = {
  loginValidator,
  createUserValidator,
  createMovieValidator,
  getCurrentUserValidator,
  deleteMovieValidator,
  updateUserValidator,
};
// Экспорт объекта, содержащего все валидаторы,
// чтобы они могли быть использованы в других модулях.
