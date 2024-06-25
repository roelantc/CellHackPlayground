import {Cell} from "./Cell.js";
import {Action} from "./Action.js";

export class Grid {

    size: number;
    grid: Map<string, Cell | undefined>;

    constructor(size: number) {
        this.size = size;
        this.grid = new Map();
    }

    addCell(x: number, y: number, player: number, energy: number = 0) {
        const cell = new Cell(x, y, player, energy);
        this.grid.set(`${x}-${y}`, cell);
    }

    getCell(x: number, y: number): Cell | undefined {
        return this.grid.get(`${x}-${y}`);
    }

    getAdjacentCells(x: number, y: number): Cell[] {
        const adjacentCells: Cell[] = [];

        for (let dx= -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }

                const adjacentCell = this.getCell(x + dx, y + dy);
                if (adjacentCell) {
                    adjacentCells.push(adjacentCell);
                }
            }
        }

        return adjacentCells;
    }

    generateMap() {

        let x, y;

        // Generate Map
        for (x = 0; x <= this.size; x++) {
            for (y = 0; y <= this.size; y++) {
                this.grid.set(`${x}-${y}`, undefined);
            }
        }

        // for (let y = 0; y < this.size; y++) {
        //     const row = Array.from({ length: this.size }, (_, x) => {
        //         const cell = this.getCell(x, y);
        //         return cell ? cell.energy.toString().padStart(3) : " . ";
        //     }).join("");
        //
        //     console.log(row);
        // }
    }

    update() {

        for (const cell of this.grid.values()) {
            if (cell != undefined) {
                let action = cell.decideAction();

                if (action == Action.MoveRight)
                {
                    let tempGrid = new Map<string, Cell | undefined>();
                    tempGrid = this.grid;
                    console.log(tempGrid);
                    tempGrid.set(`${cell.x}-${cell.y}`, undefined);
                    cell.x += 1;
                    tempGrid.set(`${cell.x}-${cell.y}`, cell);
                    this.grid = tempGrid;
                }
            }
        }
    }

    moveCellInMap(map: Map<string, Cell>, key: string, newIndex: number): Map<string, Cell> {
        // Convert the Map to an array of key-value pairs
        const entries = Array.from(map.entries());

        // Find the index of the item to move
        const currentIndex = entries.findIndex(([k]) => k === key);

        if (currentIndex === -1) {
            // Key not found in the Map, return the original Map
            return map;
        }

        // Remove the item from its current position
        const [removedItem] = entries.splice(currentIndex, 1);

        // Insert the item at the new index
        entries.splice(newIndex, 0, removedItem);

        // Create a new Map from the modified array
        return new Map<string, Cell>(entries);
    }

    printGrid() {
        //console.log(this.grid)
        for (let y = 0; y < this.size; y++) {
            const row = Array.from({ length: this.size }, (_, x) => {
                const cell = this.getCell(x, y);
                if (cell != undefined) {
                    //console.log(`${cell.x}-${cell.y}`);
                }
            });
        }
    }
}