
class Flower extends Base{
    constructor(x, y, index) {
        super(x, y, index);
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
        return super.chooseCell(character);
    }
    changeEnergy() {
        this.energy++;

        function FlowerEn() {
            statistics.energy++;
            
        }
        FlowerEn();
    }
}