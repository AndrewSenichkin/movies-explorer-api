const router = require('express').Router();
// Создание экземпляра роутера Express.

const auth = require('../middlewares/auth');
// Импорт middleware для аутентификации пользователя.

const userRouter = require('./users');
const movieRouter = require('./movies');
// Импорт маршрутов для пользователей и фильмов.

const { createUser, login } = require('../controllers/users');
// Импорт обработчиков для регистрации и входа пользователя.

const { loginValidator, createUserValidator } = require('../middlewares/validation');
// Импорт валидаторов для проверки данных при регистрации и входе пользователя.

const PageNotFoundError = require('../errors/PageNotFoundError ');
// Импорт пользовательской ошибки для обработки ошибки 404 - страница не найдена.

router.post('/signup', createUserValidator, createUser);
// Маршрут POST для регистрации пользователя. Перед обработкой запроса,
// данные проходят через валидацию с помощью валидатора createUserValidator.
// Затем используется обработчик createUser для создания нового пользователя.

router.post('/signin', loginValidator, login);
// Маршрут POST для входа пользователя. Перед обработкой запроса,
// данные проходят через валидацию с помощью валидатора loginValidator.
// Затем используется обработчик login для выполнения входа пользователя.

router.use(auth);
// Применение middleware auth ко всем маршрутам, расположенным ниже этой строки.
// Это обеспечивает аутентификацию пользователя перед обработкой этих маршрутов.

router.use('/', userRouter);
router.use('/', movieRouter);
// Использование маршрутов, связанных с пользователями и фильмами. Они
// обрабатываются в соответствующих модулях userRouter и movieRouter.

router.use('*', (req, res, next) => {
  next(new PageNotFoundError('Страница не найдена'));
});
// Маршрут-перехватчик, который будет обрабатывать все запросы, не совпадающие
// с предыдущими маршрутами. Он создает и передает ошибку 404 - страница не найдена.

module.exports = router;
// Экспорт созданного роутера, чтобы он мог быть использован в других модулях приложения.
