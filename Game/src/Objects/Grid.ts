export class Grid {

    size: number;
    grid: Map<string, Cell>;

    constructor(size: number) {
        this.size = size;
        this.grid = new Map();
    }

    addCell(x: number, y: number, energy: number = 0) {
        const cell = new Cell(x, y, energy);
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

    printGrid() {
        for (let y = 0; y < this.size; y++) {
            const row = Array.from({ length: this.size }, (_, x) => {
                const cell = this.getCell(x, y);
                return cell ? cell.energy.toString().padStart(3) : " . ";
            }).join("");

            console.log(row);
        }
    }

    update() {
        for (const cell of this.grid.values()) {
            const adjacentEmptyCells = this.getAdjacentCells(cell.x, cell.y).filter(
                (adjCell) => adjCell.energy === 0
            );

            // Gain energy from empty neighboring cells
            const energyGained = adjacentEmptyCells.length * 5; // Energy gained per empty cell (adjust as needed)
            cell.gainEnergy(energyGained);

            // Attack a random neighboring cell
            const randomIndex = Math.floor(Math.random() * adjacentEmptyCells.length);
            const targetCell = adjacentEmptyCells[randomIndex];
            if (targetCell) {
                cell.attack(targetCell);
            }
        }
    }

}