const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const IncorrectDate = require('../errors/IncorrectDate');
const Forbidden = require('../errors/Forbidden');

function getMovies(req, res, next) {
  const { _id } = req.user;

  Movie
    .find({ owner: _id })
    .populate('owner', '_id')
    .then((movies) => {
      if (movies) return res.send(movies);
      throw new NotFoundError('Данные не найдены');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new IncorrectDate('Передан некорректный id пользователя'));
      else next(err);
    });
}

function createMovie(req, res, next) {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      nameRU,
      nameEN,
      owner: _id,
      movieId,
    })
    .then(() => res.status(201).send({ message: 'Фильм добавлен' }))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new IncorrectDate('Неккоректные данные'));
      else next(err);
    });
}

function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Данные не найдены');

      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) throw new Forbidden('Нельзя удалить не свой фильм');

      movie.deleteOne()
        .then(() => res.send({ message: 'Фильм удалён' }))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
