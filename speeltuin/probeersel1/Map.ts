export class Map {

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public width: number;
    public height: number;

    public map: [{[key: string]: number}]

    getSize() {
        return this.width * this.height;
    }

    generateMap() {

        for (let x = 0; x < this.width; x++)
        {
            for (let y = 0; y < this.width; y++)
            {
                this.map.push()
            }
        }

    }

}