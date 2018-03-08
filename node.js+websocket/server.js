
var http = require("http");

var express = require('express');

var app = express();

var server = http.createServer(app);

var bodyParser = require('body-parser');

var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname+'/WWW'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

server.listen(process.env.PORT || 3000);

var name_arr = [], uid_arr = [], socket_arr = {}, uid = 1, username = '', socket_obj = null;

var user = [
    {
        username: "卡布奇洛",
        uid: 1,
        password: 1,
        img: 'img/icon01.png'
    },
    {
        username: "自酌一杯酒",
        uid: 2,
        password: 666,
        img: 'img/icon02.png'
    },
    {
        username: "拿铁",
        uid: 3,
        password: 777,
        img: 'img/icon03.png'        
    }
];

//登录
app.post('/loginValidate', function(req, res, next){
    var params = req.body;
    for(var i = 0;i < user.length;i++){
        if(user[i].password == params.password){
            username = user[i].username;
            uid = user[i].uid;
            
            return res.send({
                status: 'success',
                username: user[i].username,
                uid: user[i].uid,
                img: user[i].img
            });    
            
        }else continue;      
    }

    return res.send({
        status: 'error',
        username: ''
    });
});

//列表
app.post('/pagelist', function(req, res, next){
    var params = req.body, data = [], arr = user.slice(0);
        
    arr.splice(parseInt(params.uid) - 1, 1);
    for(i in arr){
        var obj = {
            username: arr[i].username,
            uid: arr[i].uid,
            img: arr[i].img
        };
        data.push(obj);
    }

    return res.send({
        status: 'success',
        data: data
    });
});

io.on("connection", function(socket){
    var socket_obj = socket;
    socket_obj.name = username;
    socket_obj.uid = uid;
    socket_obj.online = true;

    socket_arr[uid] = socket_obj;
    socket.on("disconnect", function(){  
        socket_obj.online = false;
    });

    socket.on("postMsg", function(data){
        var jd = {
            name: socket.name,
            uid: socket.uid,
            body: data.body,
            img: data.user.img,
            type: 'text'
        };
        socket_obj.emit("getMsg", jd);
        if(socket_arr[data.target]) socket_arr[data.target].emit("getMsg", jd);   
    });

    socket.on("img", function(data){
        var jd = {
            name: socket.name,
            uid: socket.uid,
            body: data.body,
            img: data.user.img,
            type: 'img'
        };
        socket_obj.emit("getMsg", jd);
        if(socket_arr[data.target]) socket_arr[data.target].emit("getMsg", jd);  
    });

});




console.log('服务器已启动...');