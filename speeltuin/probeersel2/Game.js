import { Map } from "./Map.js";
import { Cell } from "./Cell.js";
import { Action } from "./Enums/Action.js";
let message = "Toeter";
console.log(message);
let map = new Map(24, 24);
//map.map.push(cell);
// TOOD: get maptile based on location and add cell
function init() {
    map.generateMap();
    let cellPlayer1 = new Cell(1, 100);
    map.addCell(cellPlayer1, 1, 1);
    let cellPlayer2 = new Cell(2, 100);
    map.addCell(cellPlayer2, 24, 24);
    let cellPlayer3 = new Cell(3, 100);
    map.addCell(cellPlayer3, 1, 24);
    window.requestAnimationFrame(draw);
}
function draw() {
    var canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //transform meuk
    // Store the current transformation matrix
    //     context.save();
    //
    // // Use the identity matrix while clearing the canvas
    //     context.setTransform(1, 0, 0, 1, 0, 0);
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //
    // // Restore the transform
    //     context.restore();
    map.mapTiles.forEach(function (value) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.rect(value.locationX * 5, value.locationY * 5, 4, 4);
        ctx.stroke();
    });
    let tiles = map.mapTiles;
    map.mapTiles = Object.create(tiles);
    map.mapTiles.forEach(function (value) {
        function moveTo(mapTile, newLocationX, newLocationY) {
            console.log("MoveTo");
            let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY);
            neighbours.map(value => {
                if (value.locationX == newLocationX && value.locationY == newLocationY && value.cell == null) {
                    value.cell = mapTile.cell;
                    mapTile.cell = null;
                }
            });
        }
        function eatTo(mapTile, newLocationX, newLocationY) {
            let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY);
            neighbours.map(value => {
                if (value.locationX == newLocationX && value.locationY == newLocationY && value.cell != null && value.cell.type != mapTile.cell.type) {
                    console.log("EatTo");
                    value.cell.energy -= 1;
                    if (value.cell.energy < 20) {
                        value.cell = null;
                    }
                    mapTile.cell.energy += 1;
                }
            });
        }
        function splitTo(mapTile, newLocationX, newLocationY) {
            console.log("SplitTo");
            if (mapTile.cell.energy >= 40) {
                let newMapTile = map.mapTiles.filter(value => value.locationX == newLocationX && value.locationY == newLocationY && value.cell == null);
                mapTile.cell.energy -= Math.floor(mapTile.cell.energy / 2);
                newMapTile.map(x => x.cell = new Cell(mapTile.cell.type, mapTile.cell.energy));
            }
        }
        if (value.cell != null) {
            ctx.beginPath();
            ctx.rect(value.locationX * 5, value.locationY * 5, 4, 4);
            if (value.cell.type == 1) {
                ctx.fillStyle = "rgba(0, 255, 0, " + (value.cell.energy / 200) + ")";
            }
            else if (value.cell.type == 2) {
                ctx.fillStyle = "rgba(0, 0, 255, " + (value.cell.energy / 200) + ")";
            }
            else {
                ctx.fillStyle = "rgba(255, 0, 0, " + (value.cell.energy / 200) + ")";
            }
            ctx.fill();
            let cell = value.cell;
            if (value.cell.energy < 20) {
                map.mapTiles[value.index].cell = null;
                return;
            }
            let action = cell.DecideAction();
            switch (action) {
                case Action.Rest:
                    console.log("Rest");
                    let neighbours = map.getNeighbours(value.locationX, value.locationY);
                    let emptyNeighbourCells = 0;
                    neighbours.forEach(x => {
                        if (x.cell == null)
                            emptyNeighbourCells++;
                    });
                    let extraEnergy = (emptyNeighbourCells >= 3) ? (7 - 2) * emptyNeighbourCells : 1;
                    cell.energy += extraEnergy;
                    if (cell.energy > 200) {
                        cell.energy = 200;
                    }
                    break;
                case Action.Nothing:
                    break;
                case Action.Die:
                    map.mapTiles.map(x => {
                        if (x.locationX == value.locationX && x.locationY == value.locationY) {
                            x.cell = null;
                        }
                    });
                    break;
                // Eat
                case Action.EatLeft:
                    eatTo(value, value.locationX - 1, value.locationY);
                    break;
                case Action.EatUp:
                    eatTo(value, value.locationX, value.locationY + 1);
                    break;
                case Action.EatDown:
                    eatTo(value, value.locationX, value.locationY - 1);
                    break;
                case Action.EatRight:
                    eatTo(value, value.locationX + 1, value.locationY);
                    break;
                // Move
                case Action.MoveLeft:
                    moveTo(value, value.locationX - 1, value.locationY);
                    break;
                case Action.MoveUp:
                    moveTo(value, value.locationX, value.locationY - 1);
                    break;
                case Action.MoveDown:
                    moveTo(value, value.locationX, value.locationY + 1);
                    break;
                case Action.MoveRight:
                    moveTo(value, value.locationX + 1, value.locationY);
                    break;
                case Action.SplitLeft:
                    splitTo(value, value.locationX - 1, value.locationY);
                    break;
                case Action.SplitUp:
                    splitTo(value, value.locationX, value.locationY - 1);
                    break;
                case Action.SplitDown:
                    splitTo(value, value.locationX, value.locationY + 1);
                    break;
                case Action.SplitRight:
                    splitTo(value, value.locationX + 1, value.locationY);
                    break;
            }
        }
    });
    //setTimeout(() => {  window.requestAnimationFrame(draw); }, 1000);
    window.requestAnimationFrame(draw);
}
init();
