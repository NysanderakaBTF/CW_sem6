var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photoRouter = require('./routes/photo');
var contestRouter = require('./routes/contest');
var postRouter = require('./routes/post');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contest', contestRouter);
app.use('/post', postRouter);
app.use('/photo', photoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



const mongoString = 'mongodb://45.61.149.220:27017/cw'
const database = mongoose.connection
database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send({err: err.status || 500, msg: err.message});
});

module.exports = app;
app.listen(3000, async () => {
  await mongoose.connect(mongoString);
  console.log(`Server Started at ${3000}`)

})

