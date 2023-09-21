const movieRouter = require('express').Router();
// Создание экземпляра роутера Express.

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
// Импорт обработчиков для маршрутов, связанных с фильмами.

const { createMovieValidator, deleteMovieValidator } = require('../middlewares/validation');
// Импорт валидаторов, определенных в middleware, для проверки данных перед обработкой запросов.

movieRouter.get('/movies', getMovies);
// Маршрут GET для получения списка фильмов. Используется обработчик getMovies.

movieRouter.post('/movies', createMovieValidator, createMovie);
// Маршрут POST для создания нового фильма. Перед обработкой запроса,
// данные проходят через валидацию с помощью валидатора createMovieValidator.
// Затем используется обработчик createMovie для создания фильма.

movieRouter.delete('/movies/:movieId', deleteMovieValidator, deleteMovie);
// Маршрут DELETE для удаления фильма. Перед обработкой запроса, параметры
// проходят через валидацию с помощью валидатора deleteMovieValidator.
// Затем используется обработчик deleteMovie для удаления фильма.

module.exports = movieRouter;
// Экспорт созданного роутера, чтобы он мог быть
// использован в других модулях приложения.
