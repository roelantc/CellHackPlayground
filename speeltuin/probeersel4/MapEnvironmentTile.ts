import {Cell} from "./Cell.js";

export class MapEnvironmentTile {

    constructor(locationX: number, locationY: number, cell: Cell | null) {
        this.locationX = locationX;
        this.locationY = locationY;
        this.cell = cell;
    }

    public locationX: number;
    public locationY: number;
    public cell: Cell | null;
}