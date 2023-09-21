const { Joi, celebrate } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailer: Joi.string().required().pattern(urlRegex),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const createValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email({ tlds: { allow: false } }),
  }),
});

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
  createValidation,
  loginValidation,
  updateUserInfoValidation,
};
