var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/*init data*/
var flavorsRepo = require('./backend_manager').flavorsRepo

flavorsRepo.saveToRepo({key : "1", name : "Espresso", price : "285Rs"});
flavorsRepo.saveToRepo({key : "2", name : "Cappuccino", price : "310Rs"});
flavorsRepo.saveToRepo({key : "3", name : "Americano", price : "290Rs"});
flavorsRepo.saveToRepo({key : "4", name : "Caffe Latte", price : "415Rs"});
flavorsRepo.saveToRepo({key : "5", name : "Caf au Lait", price : "395Rs"});
flavorsRepo.saveToRepo({key : "6", name : "Mochachino", price : "520Rs"});
flavorsRepo.saveToRepo({key : "7", name : "Caramel Macchiato", price : "495Rs"});

var routes = require('./routes/index');
var promotions = require('./routes/promotions');
var payments = require('./routes/payments');
var flavours = require('./routes/flavours');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/promotions', promotions);
app.use('/payments', payments);
app.use('/flavours', flavours);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
