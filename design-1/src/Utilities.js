// Map
export let mapWidth = 50;
export let mapHeight = 50;
// Cell constants
export const cellWidth = 10;
export const cellHeight = 10;
// Energy
export const cellMaxEnergy = 200;
export const cellMinEnergy = 50;
export const cellSplitMinEnergy = 100;
export class Utilities {
    static setMapSize(width, height) {
        mapWidth = width;
        mapHeight = height;
    }
}
