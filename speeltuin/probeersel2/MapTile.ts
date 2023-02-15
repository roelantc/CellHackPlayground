import {Cell} from "./Cell.js";

export class MapTile {

    constructor(index: number, locationX: number, locationY: number, cell: Cell | null) {
        this.index = index;
        this.locationX = locationX;
        this.locationY = locationY;
        this.cell = cell;
    }

    public index: number;
    public locationX: number;
    public locationY: number;

    public cell: Cell | null;

    public type: number;
    public energy: number;

}