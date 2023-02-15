export class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    width;
    height;
    map;
    getSize() {
        return this.width * this.height;
    }
    generateMap() {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.width; y++) {
                this.map.push();
            }
        }
    }
}
