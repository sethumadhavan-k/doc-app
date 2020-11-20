var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api')

var app = express();



// hbs.
// view engine setup
app.engine('hbs',exphbs({
  'extname' : '.hbs',
  'layoutsDir': path.join(__dirname,'views/layouts'),
  'defaultLayout':'layout',
  'partialsDir': path.join(__dirname,'views/partials'),
  'helpers': {
      section: function(name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
      }
   }
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/pages'));




app.use(logger('dev'));
// app.use(express.json());
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// app.use(function(req, res, next) {
//   if (req.headers['content-type'] === 'application/json;') {
//     req.headers['content-type'] = 'application/json';
//   }
//   next();
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

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
  res.send(err.message);
});

module.exports = app;
