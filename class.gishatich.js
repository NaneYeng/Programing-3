class Gishatich extends Base {

    constructor(x, y, index) {
        super(x, y, index);
        this.energy = Math.round(random(4, 7));

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
        else if (this.energy >= 10) {
            this.mul();
        }

    }



    eat() {
        var emptyCells = this.chooseCell(2);
        var randomCell = random(emptyCells);
        var advCells = this.chooseCell(5);
        var advrandomCell = random(advCells);

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
            this.energy = Math.round(random(1, 5));
        }
    }

}