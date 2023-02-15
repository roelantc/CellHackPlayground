export class MapTile {
    constructor(locationX, locationY, cell, index) {
        this.locationX = locationX;
        this.locationY = locationY;
        this.cell = cell;
        this.index = index;
    }
    index;
    locationX;
    locationY;
    cell;
    // TODO: hier dan een cell zetten of niet zetten via methods denk ik op basis van maptile info
    // TODO: MapTile environment data verplaatsen op cell niveau.
    environment = [];
}
