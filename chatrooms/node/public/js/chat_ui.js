function divEscapedContentElement(message) {
    return $('<div>' + message + '</div>');
}

function divSystemContentElement(message) {
    return $('<div><i>' + message + '</i></div>');
}


function processUserInput(chatApp,socket) {
    var message = "抢答";
    var systemMessage;

    chatApp.sendMessage($(".room-name .name").text(),message);
    $("#message").append(divEscapedContentElement(message));
    $("#message").scrollTop($("#message").prop('scrollHeight'));
}


var socket = io.connect();
var chatApp  = new Chat(socket);

//注册事件监听器
socket.on('nameResult', function (result) {
    var message;
    if (result.success){
        message = '你是：' + result.name + '.'
    }else {
        message = result.message
    }
    $("#message").html(divSystemContentElement(message))
});


socket.on('joinResult', function (result) {
   $(".room-name .name").text(result.room);
});

socket.on('message',function (result) {
    var message = null;
    if (result.user && result.text) {
        message = $("<div>" + result.user + "<span class='color'>" + result.text + "</span></div>");
    }  
    $('#message').append(message);
});


$("#send-btn").on('click',function () {
    processUserInput(chatApp,socket);
})
