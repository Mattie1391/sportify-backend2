// app.js

const AppDataSource = require('./db/data-source');

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("❌ Error during Data Source initialization", err);
  });


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');


const app = express();

const cors = require('cors');
const pinoHttp = require('pino-http');

app.get('/test-db', async (req, res) => {
  const userRepo = AppDataSource.getRepository("User");
  const user = await userRepo.save({ name: "測試用戶" });
  res.json(user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);


app.use(cors());
app.use(pinoHttp());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
