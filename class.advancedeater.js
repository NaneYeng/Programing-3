class Advancedeater extends Base{
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = Math.round(random(5, 15));
        this.gender = Math.round(random(1, 2));

    }

    getNewCoordinates() {
        this.directions =
            [
                [this.x - 1, this.y - 1],
                [this.x, this.y - 1],
                [this.x + 1, this.y - 1],
                [this.x - 1, this.y],
                [this.x + 1, this.y],
                [this.x - 1, this.y + 1],
                [this.x, this.y + 1],
                [this.x + 1, this.y + 1],
                [this.x + 1, this.y - 2],
                [this.x + 1, this.y + 2],
                [this.x - 2, this.y + 1],
                [this.x + 2, this.y + 1],
                [this.x, this.y - 2],
                [this.x, this.y + 2],
                [this.x + 2, this.y - 2],
                [this.x + 2, this.y + 1],
                [this.x + 2, this.y - 1],
                [this.x + 2, this.y],
                [this.x - 1, this.y - 2],
                [this.x - 1, this.y + 2],
                [this.x - 2, this.y + 2],
                [this.x - 2, this.y],
                [this.x - 2, this.y - 1],
                [this.x - 2, this.y - 2],
            ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }


    move() {
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);

        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];



            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            this.y = newY;
            this.x = newX;
        }
        this.energy--;
        if (this.energy <= 3) {
            this.die();
        }
        else if (this.energy >= 10) {
            this.mul();
        }

    }



    eat() {
        var emptyCells = this.chooseCell(5);
        var randomCell = random(emptyCells);
        var grassCell = this.chooseCell(3);
        var grassrandom = random(grassCell);
        
        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            for (var i in folwerArr) {
                if (newX == folwerArr[i].x && newY == folwerArr[i].y) {
                    this.energy += folwerArr[i].energy;
                    folwerArr.splice(i, 1);
                    break;
                }
            }


            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;


            this.y = newY;
            this.x = newX;

            this.energy++;


            //  console.log(this.energy);

        }
        else if (grassrandom) {
            if(weather != 0 && weather != 1){
            var newX = grassrandom[0];
            var newY = grassrandom[1];

            for (var i in gishatArr) {
                if (newX == gishatArr[i].x && newY == gishatArr[i].y) {
                    gishatArr.splice(i, 1);
                    break;
                }
            }


            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;


            this.y = newY;
            this.x = newX;

            this.energy++;

        }
    }
        else {
            this.move();
        }
    
}



    die() {

        for (var i in advancedArr) {
            if (this.x == advancedArr[i].x && this.y == advancedArr[i].y) {
                advancedArr.splice(i, 1);
                break;
            }
        }

        matrix[this.y][this.x] = 0;



    }

    mul() {
        var theothers = []
        this.energy++;
        var emptyCells = this.chooseCell(1);
        var randomCell = random(emptyCells);
        var friends = this.chooseCell(4);

        for (var i in friends) {
            for (var j in advancedArr) {
                if (friends[i][0] == advancedArr[j].x && friends[i][1] == advancedArr[j].y && advancedArr[j].gender != this.gender) {
                    theothers.push(friends[i])
                }
            }
        }


        var randomFriend = random(theothers);

        if (randomFriend && randomCell) {
            console.log(randomFriend)
            var newX = randomCell[0];
            var newY = randomCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            var newAdvanced = new Advancedeater(newX, newY, 4);
            advancedArr.push(newAdvanced);
            this.energy = Math.round(random(0, 4));
            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            // noLoop()
        }

    }

}





// this.energy++;
//         var emptyCells = this.chooseCell(1);
//         var randomCell = random(emptyCells);
//         if (randomCell) {
//             var newX = randomCell[0];
//             var newY = randomCell[1];

//             matrix[this.y][this.x] = 0;
//             matrix[newY][newX] = 4;

//             var newAdvanced = new Advancedeater(newX, newY, 1);
//             advancedArr.push(newAdvanced);
//             this.energy = Math.round(random(0, 4));
//             for (var i in grassArr) {
//                 if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
//                     grassArr.splice(i, 1);
//                     break;
//                 }
//             }
//         }
