"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = void 0;
var Grid = /** @class */ (function () {
    function Grid(size) {
        this.size = size;
        this.grid = new Map();
    }
    Grid.prototype.addCell = function (x, y, energy) {
        if (energy === void 0) { energy = 0; }
        var cell = new Cell(x, y, energy);
        this.grid.set("".concat(x, "-").concat(y), cell);
    };
    Grid.prototype.getCell = function (x, y) {
        return this.grid.get("".concat(x, "-").concat(y));
    };
    Grid.prototype.getAdjacentCells = function (x, y) {
        var adjacentCells = [];
        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) {
                    continue;
                }
                var adjacentCell = this.getCell(x + dx, y + dy);
                if (adjacentCell) {
                    adjacentCells.push(adjacentCell);
                }
            }
        }
        return adjacentCells;
    };
    Grid.prototype.printGrid = function () {
        var _this = this;
        var _loop_1 = function (y) {
            var row = Array.from({ length: this_1.size }, function (_, x) {
                var cell = _this.getCell(x, y);
                return cell ? cell.energy.toString().padStart(3) : " . ";
            }).join("");
            console.log(row);
        };
        var this_1 = this;
        for (var y = 0; y < this.size; y++) {
            _loop_1(y);
        }
    };
    Grid.prototype.update = function () {
        for (var _i = 0, _a = this.grid.values(); _i < _a.length; _i++) {
            var cell = _a[_i];
            var adjacentEmptyCells = this.getAdjacentCells(cell.x, cell.y).filter(function (adjCell) { return adjCell.energy === 0; });
            // Gain energy from empty neighboring cells
            var energyGained = adjacentEmptyCells.length * 5; // Energy gained per empty cell (adjust as needed)
            cell.gainEnergy(energyGained);
            // Attack a random neighboring cell
            var randomIndex = Math.floor(Math.random() * adjacentEmptyCells.length);
            var targetCell = adjacentEmptyCells[randomIndex];
            if (targetCell) {
                cell.attack(targetCell);
            }
        }
    };
    return Grid;
}());
exports.Grid = Grid;
