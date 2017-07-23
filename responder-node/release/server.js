var path = require('path');
var express = require('express');
var app = express();
var server =require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '/')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
})

var answerListObject = {};

// 抢答名单列表
var answerList = [];

io.on('connection', function(socket) {
  
  // 监听抢答请求
  socket.on('answer', function(obj){
    if (!answerList.hasOwnProperty(obj.userNumber)) {
      answerListObject[obj.userNumber] = {
        userNumber: obj.userNumber,
        userName: obj.userName,
        timeStamp: obj.timeStamp
      }

      // 将抢答者信息存到数组中
      answerList.push(obj);

      // 触发客户端更新数据
      io.emit('getData', {data: answerList})
    }
  })

  // 监听获取数据请求
  socket.on('getInitData', function(obj) {

    // 返回数据给客户端
    io.emit('getInitData', {data: answerList})
  })

  // 监听管理员重置事件
  socket.on('reset', function(obj){
    answerList = [];
    io.emit('reset');
    io.emit('getData', {data: []})
  })
})

server.listen(9000, function(err) {
  console.log('Listening at *:9000');
})