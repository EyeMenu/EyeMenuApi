var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');
var cors = require('cors');


var index = require('./routes/index');
var Servers = require('./routes/Servers');
var Login = require('./routes/Login');
var Post = require('./routes/Post');
var Passwords = require('./routes/Passwords');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
	  	host     : '159.65.22.131',
	  	user     : 'EyeMenuDev',
      password : 'Pa55word1',
  		database : 'EyeMenu'
	});
	connection.connect();
	next();
});
//app.use('/', index);
app.use('/api/v1/Servers', Servers);
app.use('/api/v1/Passwords', Passwords);
app.use('/api/v1/Post', Post);
app.use('/api/v1/Login', Login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
var server = http.createServer(app);
server.listen(4001);
