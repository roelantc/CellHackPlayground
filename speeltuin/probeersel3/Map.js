import { MapTile } from "./MapTile.js";
export class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    width;
    height;
    mapTiles = [];
    getMapTileIndex(x, y) {
        return this.mapTiles.findIndex((mapTile) => mapTile.locationX == x && mapTile.locationY == y);
    }
    getEnvironment(x, y) {
        return this.mapTiles.filter((mapTile) => mapTile.locationX >= (x - 1) &&
            mapTile.locationX <= (x + 1) &&
            mapTile.locationY >= (y - 1) &&
            mapTile.locationY <= (y + 1));
    }
    generateMap() {
        let index = 0;
        let x, y, di, dj, ei, ej, n;
        for (x = 0; x <= this.width; x++) {
            for (y = 0; y <= this.height; y++) {
                this.mapTiles[index] = new MapTile(index, x, y);
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
    }
}
