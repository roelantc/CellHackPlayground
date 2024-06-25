import {MapEnvironmentTile} from "./MapEnvironmentTile.js";
import {Cell} from "./Cell.js";

export class MapTile {

    constructor(locationX: number, locationY: number, cell: Cell | null) {
        this.locationX = locationX;
        this.locationY = locationY;
        this.cell = cell;
    }
    
    public locationX: number;
    public locationY: number;
    public cell: Cell | null;

    // TODO: hier dan een cell zetten of niet zetten via methods denk ik op basis van maptile info

    // TODO: MapTile environment data verplaatsen op cell niveau.
    environment: MapEnvironmentTile[] = [];


}