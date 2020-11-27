var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars')
var bodyParser = require('body-parser')
var session = require('express-session') 

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
      },
      slno: function(value,options){
          return parseInt(value) + 1
      }
   },
}))

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/pages'));

app.use(session({
  secret: '1234509876',
  resave: true,
  saveUninitialized: true
})) 


app.use(logger('dev'));
// app.use(express.json());
// app.use(express.bodyParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




const AuthMiddleware = (req,res,next) =>{
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let date = new Date();
  res.locals.title_time = date.toLocaleDateString('en-US',options)
  // if(req.url !== '/' && req.url !== '/sss')
  //   if(!req.session.user_loged)  throw new Error('AuthError')
  next()
}
app.use(AuthMiddleware)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter)

app.use((req,res,next)=>{
  console.log('404')
  res.render('error',{layout:null,title:'404 Error',message:'Page Not Found'})
})

app.use(function(err, req, res, next) {
  console.log("Error Handler")
  console.log({"Express Error":err})
  // set locals, only providing error in development
  res.locals.title = err.message;
  if(err.message == 'AuthError')
    res.locals.message = "Please Login again";
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.send(err.message);
  res.render('error',{layout:null})
});




// error handler










module.exports = app;
