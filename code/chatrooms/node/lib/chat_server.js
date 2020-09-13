var socketio = require('socket.io'); 
var io;
var guestNumber = 1;
var nickNames   = {};
var namesUsed   = [];
var currentRoom = {};

function assignGuestName(socket, guestNumber, nickNames, nameUsed) {
    var name = guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult',{
       success:true,
       name:name
    });
    nameUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, room) {
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult', {room:room});

    socket.broadcast.to(room).emit('message', {
        text:nickNames[socket.id] + ' has joined ' + room + '.'
    });

    var usersInRoom = io.sockets.clients(socket.room);
    var usersInRoomSummary;
    if(usersInRoom.length > 1){
        usersInRoomSummary = 'Users currently in ' + room + ":";
        for(var index in usersInRoom){
            var userSocketId = usersInRoom[index].id;
            if(userSocketId != socket.id){
                if(index > 0){
                    usersInRoomSummary += ' ,';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
    }
    usersInRoomSummary += '.';
    socket.emit('message',{text:usersInRoomSummary});
}

function handleNameChangeAttempts(socket, nickNames, namesUsed){
	socket.on('nameAttempt', function(name){
		if(name.indexOf('Guest') == 0){
			socket.emit('nameResult',{
				success:false,
				message:'Names cannot begin with "Guest".'
			});
		}else{
			if(namesUsed.indexOf(name) == -1){
				var previousName = nickNames[socket.id];
				var previousNameIndex = namesUsed.indexOf(previousName);
				namesUsed.push(name);
				nickNames[socket.id] = name;
				delete namesUsed[previousNameIndex];

				socket.emit('nameResult',{
					success:true,
					name:name
				});
			}else{
				socket.emit('nameResult',{
					success:false,
					message:'That name is already in use.'
				});
			}
		}
	});
}

function handleMessageBroadcasting(socket, nickNames) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message',{
            user:nickNames[socket.id] + ' : ',
            text:message.text
        })
    })
}

function handleRoomJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom)
    })
}

function handleClientDisconnection(socket, nickNames, nameUsed) {
    socket.on('disconnect',function () {
        var nameIndex = nameUsed.indexOf(nickNames[socket.id]);
        delete nameUsed[nameIndex];
        delete nickNames[socket.id];
    })
}

exports.listen = function (server) {
    io = socketio.listen(server);

    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'room1');

        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket,nickNames,namesUsed);
        handleRoomJoining(socket);

        socket.on('rooms', function () {
            socket.emit('rooms',io.sockets.rooms);
        });

        handleClientDisconnection(socket,nickNames,namesUsed);
    })

};

