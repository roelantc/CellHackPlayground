import { MapTile } from "./MapTile.js";
import { MapEnvironmentTile } from "./MapEnvironmentTile.js";
export class Map {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.generateMap();
    }
    width;
    height;
    mapTiles = [];
    generateMap() {
        let index = 0;
        let x, y;
        // Generate Map
        for (x = 0; x <= this.width; x++) {
            for (y = 0; y <= this.height; y++) {
                index++;
                this.mapTiles[index] = new MapTile(x, y, null, index);
            }
        }
        // TODO: Een cel moet een environment hebben, deze maken we aan op het moment dat we de cell tot leven brengen
        // Sort surroundings
        index = 0;
        for (x = 0; x <= this.width; x++) {
            for (y = 0; y <= this.height; y++) {
                index++;
                this.mapTiles[index].environment = this.getNeighbours(x, y);
            }
        }
    }
    getNeighbours(x, y) {
        return this.mapTiles
            .filter((mapTile) => mapTile.locationX >= (x - 1) &&
            mapTile.locationX <= (x + 1) &&
            mapTile.locationY >= (y - 1) &&
            mapTile.locationY <= (y + 1))
            .map((mapTile) => new MapEnvironmentTile(mapTile.locationX, mapTile.locationY, null));
    }
    getLocation(x, y) {
        return this.mapTiles.filter((mapTile) => mapTile.locationX == x && mapTile.locationY == y);
    }
}
