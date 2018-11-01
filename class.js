class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = Math.round(random(0, 7));
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];


    }

    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));

        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
    becomeFlower() {
        var emptyCells = this.chooseCell(1);
        // console.log(emptyCells);
        if (emptyCells.length == 8) {


            for (var i in grassArr) {
                if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            var newFlower = new Flower(this.x, this.y, 5);
            folwerArr.push(newFlower);
            matrix[this.y][this.x] = 5;
            matrix[this.y][this.x + 1] = 5;
            matrix[this.y][this.x - 1] = 5;
            matrix[this.y + 1][this.x] = 5;
            matrix[this.y - 1][this.x] = 5;




        }

    }





}






class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = Math.round(random(0, 7));
        this.index = index;
        this.directions = [];
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
                [this.x + 1, this.y + 1]
            ];
    }

    chooseCell(character) {
        this.getNewCoordinates();

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }


    move() {
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);

        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];



            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            this.y = newY;
            this.x = newX;
        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
        else if (this.energy >= 9) {
            this.mul();
        }

    }



    eat() {
        var emptyCells = this.chooseCell(1);
        var randomCell = random(emptyCells);

        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;


            this.y = newY;
            this.x = newX;

            this.energy++;

        }
        else {
            this.move();
        }
    }



    die() {

        for (var i in eaterArr) {
            if (this.x == eaterArr[i].x && this.y == eaterArr[i].y) {
                eaterArr.splice(i, 1);
                break;
            }
        }

        matrix[this.y][this.x] = 0;



    }

    mul() {
        this.energy++;
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);
        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 2;

            var newEater = new GrassEater(newX, newY, 1);
            eaterArr.push(newEater);
            this.energy = Math.round(random(0, 4));
        }
    }

}










class Gishatich {

    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
        this.directions = [];
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
                [this.x + 1, this.y + 1]
            ];
    }

    chooseCell(character) {
        this.getNewCoordinates();

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }


    move() {
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);
        this.energy--;

        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            this.y = newY;
            this.x = newX;
        }
        if (this.energy <= 0) {
            this.die();
        }
        else if (this.energy >= 7) {
            this.mul();
        }

    }



    eat() {
        var emptyCells = this.chooseCell(2);
        var randomCell = random(emptyCells);

        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            for (var i in eaterArr) {
                if (newX == eaterArr[i].x && newY == eaterArr[i].y) {
                    eaterArr.splice(i, 1);
                    break;
                }
            }


            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;


            this.y = newY;
            this.x = newX;

            this.energy++;

        }
        else {
            this.move();
        }
    }



    die() {

        for (var i in gishatArr) {
            if (this.x == gishatArr[i].x && this.y == gishatArr[i].y) {
                gishatArr.splice(i, 1);
                break;
            }
        }

        matrix[this.y][this.x] = 0;



    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);
        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 3;

            var newgishat = new Gishatich(newX, newY, 1);
            gishatArr.push(newgishat);
            this.energy = Math.round(random(0, 5));
        }
    }

}


class Flower {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.mult = Math.round(random(10, 17));
        this.directions = [];
        this.energy = 0;
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
                [this.x + 1, this.y + 1]
            ];
    }

    chooseCell(character) {
        this.getNewCoordinates();

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

    }
    changeEnergy() {
        this.energy++;
    }
}









class Advancedeater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = Math.round(random(5, 15));
        this.index = index;
        this.directions = [];
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

        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;

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
        if (this.energy <= 5) {
            this.die();
        }
        else if (this.energy >= 14) {
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


            //  console.log(this.energy);

        }
        else if (grassrandom) {
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
        this.energy++;
        var emptyCells = this.chooseCell(0);
        var randomCell = random(emptyCells);
        if (randomCell) {
            var newX = randomCell[0];
            var newY = randomCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;

            var newAdvanced = new Advancedeater(newX, newY, 1);
            advancedArr.push(newAdvanced);
            this.energy = Math.round(random(0, 4));
        }
    }

}




