import {Cell} from "./Cell.js";

export class MapTile {

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public x: number;
    public y: number;
    public cell : Cell | null = null;

}