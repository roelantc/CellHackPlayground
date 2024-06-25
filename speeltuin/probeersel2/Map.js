import { MapTile } from "./MapTile.js";
import { Cell } from "./Cell.js";
export class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    width;
    height;
    mapTiles = [];
    getSize() {
        return this.width * this.height;
    }
    getMapTileIndex(x, y) {
        return this.mapTiles.findIndex((element) => element.locationX == x && element.locationY == y);
    }
    isMapTileEmpty(x, y) {
        if (this.isInvalidLocation(x, y))
            return false;
        let index = this.mapTiles.findIndex((element) => element.locationX == x && element.locationY == y);
        return this.mapTiles[index].cell === null;
    }
    addCell(cell, x, y) {
        if (this.isInvalidLocation(x, y))
            return;
        let mapTileIndex = this.getMapTileIndex(x, y);
        this.mapTiles[mapTileIndex].cell = cell;
    }
    isInvalidLocation(x, y) {
        return x > this.width || y > this.height || x < 1 || y < 1;
    }
    getNeighbours(x, y) {
        return this.mapTiles.filter((mapTile) => mapTile.locationX >= (x - 1) &&
            mapTile.locationX <= (x + 1) &&
            mapTile.locationY >= (y - 1) &&
            mapTile.locationY <= (y + 1));
    }
    getCells() {
        return this.mapTiles.filter((mapTile) => mapTile.cell instanceof Cell);
    }
    generateMap() {
        let index = 0;
        let x, y, di, dj, ei, ej, n;
        for (x = 0; x <= this.width; x++) {
            for (y = 0; y <= this.height; y++) {
                this.mapTiles[index] = new MapTile(index, x, y, null);
                index++;
                // for (dj = -1, n = 0; dj <= 1; dj++) {
                //     for (di = -1; di <= 1; di++, n++) {
                //         ei = (x + di) % width;
                //         ej = (y + dj) % height;
                //         if (ei < 0) ei = width - 1;
                //         if (ej < 0) ej = height - 1;
                //         console.log(n + " id van de cells ind e buurt: " + ei + ej * width )
                //         //gs->cells [i + width * j].neighbours [n] = (gs->cells + ei + ej * width);
                //     }
                // }
            }
        }
        // let index = 0;
        // for (let x = 1; x <= this.width; x++)
        // {
        //     for (let y = 1; y <= this.height; y++)
        //     {
        //         let mapTile = new MapTile(index, x, y, null)
        //         this.mapTiles.push(mapTile)
        //         index++;
        //     }
        // }
    }
}
