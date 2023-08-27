const router = require('express').Router();

const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.delete('/:id', deleteMovieValidation, deleteMovie);
router.post('/', createMovieValidation, createMovie);
router.get('/', getMovies);

module.exports = router;
