/* 
* @Author: Marte
* @Date:   2017-08-03 09:43:32
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-03 16:26:53
*/

var http = require("http");

//     server = http.createServer(function(req, res){
//         res.writeHead(200, {
//             "Content-type": "text/plain"
//         });
//         res.write("hello world");
//         res.end();
//     });

// server.listen(8066);
// console.log('server start');
// 
var express = require('express');

var app = express();

var server = http.createServer(app);

var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname+'/WWW'));

server.listen(8066);

var arr = [];

io.on("connection", function(socket){
    arr = [];
    socket.on("login", function(d){
        if(arr.indexOf(d) != -1){
            socket.emit("loginError");
        }else {
            socket.name = d;
            arr.push(d);
            socket.index = arr.length;
            socket.online = true;
            socket.emit('loginSuccess');
            io.sockets.emit("system", d, socket.index, "login");
        }
    });

    socket.on("disconnect", function(){  
        if(socket.online){
            arr.pop();
            socket.index = arr.length;
            socket.online = false;
        }
        io.sockets.emit("system", socket.name, socket.index, "logout");
    });

    socket.on("postMesg", function(data){

        io.sockets.emit("newMsg", socket.name, data, 'text');
    });

    socket.on("img", function(data){
        io.sockets.emit("newMsg", socket.name, data, 'img');
    });

});