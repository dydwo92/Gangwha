var express = require('express');
var logger = require('morgan');
var app = express();

app.use(logger('dev'));
app.use(express.static('dist'));
app.use('/public', express.static('public'));

app.get('/', function(req,res,next){
  res.sendFile('index.html');
});

app.get('*', function(req,res,next){
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, "0.0.0.0");
