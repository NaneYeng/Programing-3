// var winter = 0;
// var spring = 1;
// var summer = 2;
// var autumn = 3;
var weather = 0;

var side = 20;

var grassArr = [];

var eaterArr = [];

var gishatArr = [];

var folwerArr = [];

var advancedArr = [];

var matrix = [];

function setup() {

    var n = Math.round(random(15, 30));
    var m = Math.round(random(15, 30));

    for (var y = 0; y < n; ++y) {
        matrix[y] = [];
        for (var x = 0; x < m; ++x) {
            matrix[y][x] = Math.round(random(0, 4));
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
        }
    }



}
var count = 0;
function draw() {
    count++;
    if(count<51){
        weather=0;
        console.log("winter");
    }
    else if(count<101){
        weather=1;
        console.log("spring");
    }
    else if(count<151){
        weather=2;
        console.log("summer");
    }
    else if(count<201){
        weather=3;
        console.log("autumn");
    }
    else{
        count=0;
    }
    drawMatrix();

    for (var i in grassArr) {
        grassArr[i].mul();
        if (count %5  == 0) {    
            grassArr[i].becomeFlower();
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
        advancedArr[i].eat();
    }   


}


/**/

function drawMatrix() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                if(weather == 0){
                    fill("white");
                }
                else if(weather == 1){
                    fill("#cfe08d");
                }
                else if(weather == 2){
                    fill("#459305");
                }
                else{
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
                fill("pink");
                rect(x * side, y * side, side, side);
            }
        }
    }
}


