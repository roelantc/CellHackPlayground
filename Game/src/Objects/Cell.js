"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var Cell = /** @class */ (function () {
    function Cell(x, y, energy) {
        if (energy === void 0) { energy = 0; }
        this.x = x;
        this.y = y;
        this.energy = energy;
    }
    return Cell;
}());
exports.Cell = Cell;
