
var fs = require('fs');  
var express = require('express'); 
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var statData = []; 


if (fs.existsSync("public/data.json")) { 
    var statData = require("./public/data.json");
}


app.use(express.static("public"));
app.use('/socket', express.static(__dirname + '/node_modules/socket.io-client/dist/'));
app.use('/p5', express.static(__dirname + '/node_modules/p5/lib/'));


app.get('/', function (req, res) {
    res.redirect('index.html');
});

app.get('/stats', function (req, res) {
    res.redirect('stats.html');
});

server.listen(3000);

io.on('connection', function (socket) {
    socket.on("send data", function (data) {
        statData.push(data); 
        fs.writeFile('public/data.json', JSON.stringify(statData)); 
    })

    socket.on("get stats", function () { 
        
        fs.readFile('public/data.json', "utf8", function(err, statisticsFromFile) {
            
            socket.emit("send stats",statisticsFromFile);    
        });
        
    })
    

});
