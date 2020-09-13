var Chat = function(socket){
	this.socket = socket;
}

//执行message监听器
Chat.prototype.sendMessage = function(room,text){
	var message = {
		room:room,
		text:text
	};
	this.socket.emit('message',message);
};

//执行join监听器
Chat.prototype.changeRoom = function(room){
	this.socket.emit('join',{
		newRoom:room
	});
};