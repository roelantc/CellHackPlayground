// Map
export let mapWidth : number = 50;
export let mapHeight: number = 50;

// Cell constants
export const cellWidth: number = 10;
export const cellHeight: number = 10;

// Energy
export const cellMaxEnergy : number = 200;
export const cellMinEnergy : number = 50;
export const cellSplitMinEnergy : number = 100;

export class Utilities {

    public static setMapSize(width: number, height: number) {
        mapWidth = width;
        mapHeight = height;
    }
}