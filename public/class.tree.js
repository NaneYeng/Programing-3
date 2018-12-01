class Tree extends Base{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 0;
    }


    changeEnergy() {
        this.energy++;

        function treeEnergy() {
            statistics.treeEnergy++;
            
        }
        treeEnergy();
    }
} 
