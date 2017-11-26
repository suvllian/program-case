var express = require('express');
var fs = require('fs');
var mysql = require('mysql');
var router = express.Router();
var utils = require('./../utils/index.js');
var stockSql = require('./../models/stock-sql');
var dbConfig = require('./../models/db-config');
var pool = mysql.createPool(dbConfig.mysql);

router.get('/', function(req, res, next) {
  res.json({ author: 'suvllian'})
})

router.get('/getData', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var codeOrName = req.query.codeOrName
    var condition = '%' + codeOrName + '%'
		var startTime = req.query.startTime
		var endTime = req.query.endTime
    var query = codeOrName ? stockSql.queryAllWithCode : stockSql.queryAll

    connection.query(query, [startTime, endTime, condition, condition], function(err, result) {
      utils.responseJSON(res, result, 'get')
      connection.release()
    })
  })
})

router.get('/getSpecific', function(req, res, next) {
	pool.getConnection(function(err, connection) {
		var code = req.query.code

    connection.query(stockSql.query, [code], function(err, result) {
      utils.responseJSON(res, result, 'get')
      connection.release()
    })
  })
})

module.exports = router;
