export class MapTile {
    constructor(index, locationX, locationY, cell) {
        this.index = index;
        this.locationX = locationX;
        this.locationY = locationY;
        this.cell = cell;
    }
    index;
    locationX;
    locationY;
    cell;
    type;
    energy;
}
