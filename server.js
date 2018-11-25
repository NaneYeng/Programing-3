
var fs = require('fs');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var statData = [];

if (fs.existsSync("data.json")) {
    var statData = require("./data.json");
}

app.get('/', function (req, res) {
    res.redirect('index.html');
});

app.get('/statistics', function (req, res) {
    res.redirect('stats.html');
});

server.listen(3000);

io.on('connection', function (socket) {
    socket.on("send data", function (data) {
        statData.push(data);
        fs.writeFile('data.json', JSON.stringify(statData));
    })

    socket.on("get stats", function () {
        fs.readFile('data.json', "utf8", function (err, statisticsFromFile) {
        socket.emit("send stats", statisticsFromFile);
        });

    })


});
// var express = require("express");
// var app = express();

// app.get("/", function(req, res){
//    res.send("Hello world");
// });

// app.listen(3000, function(){
//    console.log("Example is running on port 3000");
// });