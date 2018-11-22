class GrassEater extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(random(10, 15));
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
                [this.x + 1, this.y + 1]
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
            matrix[newY][newX] = 2;

            this.y = newY;
            this.x = newX;
        }
        this.energy--;
        if (this.energy <= 0) {
            this.die();
        }
        else if (this.energy >= 10) {
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
            if (weather != 0) {
                this.move();
            }

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
        var friends = this.chooseCell(2);
        var randomCell = random(emptyCells);
    //    console.log(friends);


        for (var i in eaterArr) {
            for (var j in friends) {
                if (eaterArr[i].gender != friends[j].gender ) {
                    if (randomCell) {
                        var newX = randomCell[0];
                        var newY = randomCell[1];

                        matrix[this.y][this.x] = 0;
                        matrix[newY][newX] = 2;

                        var newEater = new GrassEater(newX, newY, 1);
                        eaterArr.push(newEater);
                        this.energy = Math.round(random(2, 4));
                    }

                }
            }
        }

    }

}

    //     if (randomCell) {
    //         var newX = randomCell[0];
    //         var newY = randomCell[1];

    //         matrix[this.y][this.x] = 0;
    //         matrix[newY][newX] = 2;

    //         var newEater = new GrassEater(newX, newY, 1);
    //         eaterArr.push(newEater);
    //         this.energy = Math.round(random(2, 4));
    //     }