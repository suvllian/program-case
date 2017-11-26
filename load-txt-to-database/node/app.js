var express = require('express');
var path = require('path');
var fs = require('fs');
var mysql = require('mysql');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var watch = require('watch');
var http = require('http');
var index = require('./routes/index.js');
var dbConfig = require('./models/db-config');
var stockSql = require('./models/stock-sql');
var pool = mysql.createPool(dbConfig.mysql);

watch.createMonitor('/home/', function(monitor) {
	monitor.on('created', function(fileFullPath, stat) {
		var filename = fileFullPath.substring(fileFullPath.lastIndexOf('\\')+1).slice(0, -4)
		var time = Date.parse(new Date(filename)) + 28800000

		fs.readFile(fileFullPath, function(err, data) {
			var dataArray = []
			data = data.toString().replace(/,/g, '')
			dataArray = data.split('\n').map(function(item, index) {
				item = item.split('\t')
				item.push(time.toString())
				return item
			})
			dataArray.pop()

			pool.getConnection(function(err, connection) {
		    connection.query(stockSql.insert, [dataArray], function(err, result) {
		      err ? console.log(err) : console.log('success')
		      connection.release()
		    });
		  });
		})
	})
	monitor.on('changed', function(f, stat) {
		console.log('changed')
	})
	monitor.on('removed', function(f, stat) {
		console.log('removed')
	})
});

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', index);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
