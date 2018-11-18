class Grass extends Base {
    constructor(x, y, index) {
        super(x, y, index);
        this.multiply = Math.round(random(0, 7));
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
        if (weather != 0) {
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

}