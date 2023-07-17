const { Joi, celebrate } = require('celebrate');
const { urlRegex, passwordRegex, emailRegex } = require('../utils/constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    thumbnail: Joi.string().required().pattern(urlRegex),
    trailer: Joi.string().required().pattern(urlRegex),
    image: Joi.string().required().pattern(urlRegex),
    description: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    country: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    year: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const createValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().pattern(passwordRegex),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().pattern(passwordRegex),
    email: Joi.string().required().email(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(emailRegex),
  }),
});

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
  createValidation,
  loginValidation,
  updateUserInfoValidation,
};
