// var winter = 0;
// var spring = 1;
// var summer = 2;
// var autumn = 3;
var socket = io.connect('http://localhost:3000');
var statistics = {
    "timestamp": "",
    "framecount": 0,
    "becomeFlower":0,   //grass
    "die":0,            //grassEater
    "mul":0,            //gishatich
    "energy":0,         //flower
    "move":0,          //AdvEater
    "treeEnergy":0      //Tree
}

var weather = 0;

var side = 20;

var grassArr = [];

var eaterArr = [];

var gishatArr = [];

var folwerArr = [];

var advancedArr = [];

var treeArr =[];

var matrix = [];

var bbbb  = document.getElementById("bbbb")
bbbb.style.height = 0
/**/
function setup() {

    var n = Math.round(random(15, 30));
    var m = Math.round(random(15, 30));

    for (var y = 0; y < n; ++y) {
        matrix[y] = [];
        for (var x = 0; x < m; ++x) {
            // matrix[y][x] = Math.round(random(0, 4));
            var rand = random(400);
            if(rand<20){
                 var r = 0;
            }
            else if(21<rand  && rand<100){
                 var r = 1;
            }
            else if(101<rand && rand<300){
                var r = 2;
            }
            else if(301<rand && rand<350){
                var r = 3;
            }
            else if(351<rand && rand<401){
                r = 4;
            }
            matrix[y][x] = r;
        }
    }

    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');


    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var eater = new GrassEater(x, y, 2);
                eaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                var gish = new Gishatich(x, y, 3);
                gishatArr.push(gish);
            }
            else if (matrix[y][x] == 4) {
                var adv = new Advancedeater(x, y, 4);
                advancedArr.push(adv);
            }
            else if (matrix[y][x] == 5) {
                var flow = new Flower(x, y, 5);
                folwerArr.push(flow);
            }
            else if (matrix[y][x] == 6) {
                var newTree = new Tree(x, y, 6);
                treeArr.push(newTree);
            }
        }
    }

}


var count = 0;


function draw() {
    // console.log(frameCount);
    if (frameCount % 50 == 0) {
        statistics.timestamp = (new Date()).toString();
        statistics.framecount = frameCount;
        socket.emit("send data", statistics);
        // console.log(frameCount);
    }
    count++;
    if (count < 11) {
        weather = 0;
        console.log("winter");
    }
    else if (count < 21) {
        weather = 1;
        console.log("spring");
    }
    else if (count < 31) {
        weather = 2;
        console.log("summer");
    }
    else if (count < 41) {
        weather = 3;
        console.log("autumn");
    }
    else {
        count = 0;
    }
    drawMatrix();

    for (var i in grassArr) {
        grassArr[i].mul();
        if (count % 5 == 0) {
            grassArr[i].becomeFlower();
        }
        if (weather==0) {
            grassArr[i].becomeTree();
        }
    }
    for (var i in eaterArr) {
        eaterArr[i].eat();
    }
    for (var i in gishatArr) {
        gishatArr[i].eat();
    }
    for (var i in folwerArr) {
        folwerArr[i].changeEnergy();
    }
    for (var i in advancedArr) {
        if (weather == 0) {
            advancedArr[i].move();
        }
        else {
            advancedArr[i].eat();
        }
    }
    for (var i in treeArr) {
        treeArr[i].changeEnergy();
    }
    

    // console.log(bbbb.style.height)
    bbbb.style.height=parseInt(bbbb.style.height.split("px")[0]) + 20 +"px"

    function timedRefresh(timeoutPeriod) {
        setTimeout("location.reload(true);",timeoutPeriod);
    }
    
    window.onload = timedRefresh(17000);
    
}


/**/

function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if (weather == 0) {
                    fill("white");
                }
                else if (weather == 1) {
                    fill("#cfe08d");
                }
                else if (weather == 2) {
                    fill("#459305");
                }
                else {
                    fill("#9e7d2c")
                }
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                if (weather == 1) {
                    fill("pink");
                }
                else if (weather == 2) {
                    fill("#ad0d15");
                }
                else if (weather == 3) {
                    fill("#e5743b");
                }

                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#0c4a6b");
                rect(x * side, y * side, side, side);
            }
        }
    }
}


