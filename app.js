require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { PORT = 3000 } = process.env;

mongoose
  .connect(URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

const app = express();
app.use(cors());
// подключаем rate-limiter
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const {
    status = 500,
    message,
  } = err;
  res.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port successfully ${PORT}`);
});
