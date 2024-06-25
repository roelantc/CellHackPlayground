export class Cell {

    x: number;
    y: number;
    energy: number;

    constructor(x: number, y: number, energy: number = 0) {
        this.x = x;
        this.y = y;
        this.energy = energy;
    }

}