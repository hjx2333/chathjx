var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({ port: 8181 });

var name ;
var inx = [];
wss.on('connection', function (ws) {
   // console.log('client connected');

    ws.on('message', function (message) {
        var message = message.split(',');
        console.log(formatDateTime(new Date())+" "+message[0]+"："+message[1]);
    });
});

var formatDateTime = function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second; 
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
};  
