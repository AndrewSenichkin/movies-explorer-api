const Movie = require('../models/movie');

const AccessDeniedError = require('../errors/AccessDeniedError');
const PageNotFoundError = require('../errors/PageNotFoundError ');
const InaccurateDataError = require('../errors/InaccurateDataError');

// Функция getMovies получает список фильмов, связанных с текущим пользователем,
// путем поиска фильмов с соответствующим значением в поле owner.
// Получение списка фильмов
const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// Функция createMovie создает новый документ фильма в базе данных,
// используя переданный запросом тело (req.body), и связывает его с текущим
// пользователем, устанавливая значение поля owner равным req.user._id.
// Создание нового фильма
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  // Создание нового документа фильма в базе данных
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id, // Связываем фильм с текущим пользователем
  })
    .then((movie) => res.send(movie))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(
          new InaccurateDataError(
            'Переданы некорректные данные при создании карточки фильма',
          ),
        );
      } else {
        next(e);
      }
    });
};

// Функция deleteMovie удаляет документ фильма. Она сначала ищет фильм по указанному
// movieId и проверяет, существует ли такой фильм. Если фильм не найден, генерируется
// исключение PageNotFoundError. Затем функция проверяет, является ли текущий пользователь
// владельцем фильма, сравнивая req.user._id с идентификатором владельца фильма.
// Если пользователь не является владельцем, генерируется исключение AccessDeniedError.
// Если пользователь является владельцем, функция удаляет документ фильма из базы данных
// с помощью Movie.deleteOne и отправляет удаленный фильм в ответе.
// Удаление фильма
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new PageNotFoundError('Фильм с указанным _id не найден');
    })
    .then((movie) => {
      const owner = movie.owner.toString();

      // Проверка, является ли текущий пользователь владельцем фильма
      if (req.user._id === owner) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send(movie);
          })
          .catch(next);
      } else {
        throw new AccessDeniedError('Невозможно удалить фильм');
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new InaccurateDataError('Переданы некорректные данные для удаления'));
      } else {
        next(e);
      }
    });
};

// Код экспортирует три функции getMovies, createMovie и deleteMovie,
// чтобы они были доступны в других модулях.
module.exports = {
  getMovies, // Получение списка фильмов, связанных с текущим пользователем
  createMovie, // Создание нового документа фильма
  deleteMovie, // Удаление документа фильма
};
