const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const limiter = require('./middlewares/rateLimiter');
const { MONGO_URL } = require('./utils/config');
const errorHandler = require('./middlewares/errorHandler');

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
app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

async function startServer() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
startServer()
  // eslint-disable-next-line no-console
  .then(() => console.log(`App listening on port successfully\n${MONGO_URL}\nPort: ${PORT}`));
