import {Cell} from "./Cell.js";
import {MapTile} from "./MapTile.js";

export class Map {
    get mapCells(): MapTile[] {
        return this._mapCells;
    }

    set mapCells(value: MapTile[]) {
        this._mapCells = value.filter((mapTile) => mapTile.cell instanceof Cell);
    }

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    private width: number;
    private height: number;

    mapTiles: MapTile[] = [];
    private _mapCells: MapTile[]

    generateMap() {

        let index = 0;
        let x, y;

        // Generate Map
        for (x = 0; x <= this.width; x++) {
            for (y = 0; y <= this.height; y++) {
                index++;
                this.mapTiles[index] = new MapTile(x, y);
            }
        }

        // TODO: Een cel moet een environment hebben, deze maken we aan op het moment dat we de cell tot leven brengen
        // Sort surroundings
        // index = 0;
        // for (x = 0; x <= this.width; x++) {
        //     for (y = 0; y <= this.height; y++) {
        //         index++;
        //         this.mapTiles[index].environment = this.getEnvironment(x, y)
        //
        //     }
        // }
    }

    getEnvironment(x: number, y: number) : MapTile[]
    {
        return this.mapTiles
            .filter((mapTile) =>
                mapTile.x >= (x -1) &&
                mapTile.x <= (x + 1) &&
                mapTile.y >= (y -1) &&
                mapTile.y <= (y + 1)
            )
    }

    addCell(cell: Cell, x: number, y: number) {
        let index = this.mapTiles.findIndex((mapTile) => mapTile?.x == x && mapTile?.y == y);
        this.mapTiles[index].cell = cell;
    }

    private getMapCells(): MapTile[] {
        return this.mapTiles.filter((mapTile) => mapTile.cell instanceof Cell)
    }
}