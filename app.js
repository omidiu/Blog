const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// require mongoose 
const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true); // for deprecatin warning


try {
  mongoose.connect('mongodb://localhost/final-project', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, () =>
    console.log("connected to database"));
} catch (error) {
  console.log("could not connect to database");
  console.log(error);
  
}


const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');


const { log } = require('console');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/comments', commentRouter);


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
