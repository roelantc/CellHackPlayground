import {Map} from "./Map.js";
import {Cell} from "./Cell.js";
import {Action} from "./Enums/Action.js";
import {MapTile} from "./MapTile";

let message: string = "Toeter";

console.log(message);

let map = new Map(49, 49);
let lastCalledTime = performance.now();
let fps = 0;

//map.map.push(cell);
// TOOD: get maptile based on location and add cell

function init() {
    map.generateMap()
    let cellPlayer1 = new Cell(1, 100);
    map.addCell(cellPlayer1, 1, 1);

    let cellPlayer2 = new Cell(2, 100);
    map.addCell(cellPlayer2, 49, 49);

    let cellPlayer3 = new Cell(3, 100);
    map.addCell(cellPlayer3, 1, 49);

    console.log(map.getCells())

    window.requestAnimationFrame(draw);
}

function moveTo(mapTile: MapTile, newLocationX: number, newLocationY: number) {
    console.log("MoveTo")
    let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY)
    neighbours.map(value => {
        if (value.locationX == newLocationX && value.locationY == newLocationY && value.cell == null)
        {
            value.cell = mapTile.cell
            mapTile.cell = null
        }
    })
}

function eatTo(mapTile: MapTile, newLocationX: number, newLocationY: number) {
    let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY)
    neighbours.map(value => {
        if (value.locationX == newLocationX && value.locationY == newLocationY && value.cell != null && value.cell.type != mapTile.cell!.type)
        {
            console.log("EatTo")
            value.cell.energy -= 1;
            if (value.cell.energy < 20)
            {
                value.cell = null;
            }

            mapTile.cell!.energy += 1;
        }
    })
}

function splitTo(mapTile: MapTile, newLocationX: number, newLocationY: number) {
    console.log("SplitTo")
    if (mapTile.cell!.energy >= 40) {
        let newMapTile = map.mapTiles.filter(value => value.locationX == newLocationX && value.locationY == newLocationY && value.cell == null)
        mapTile.cell!.energy -= Math.floor(mapTile.cell!.energy / 2)
        newMapTile.map(x => x.cell = new Cell(mapTile.cell!.type, mapTile.cell!.energy))
    }
}

function draw() {

    // FPS
    let delta = (performance.now() - lastCalledTime) / 1000;
    lastCalledTime = performance.now();
    fps = ~~(1 / delta);
    console.log(fps);
    // @ts-ignore
    document.getElementById('fps').textContent = fps;

    // var canvas = document.getElementById('canvas');
    // const ctx = canvas.getContext("2d", { alpha: false });

    let offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = 750;
    offScreenCanvas.height = 750;
    let offScreenContext = offScreenCanvas.getContext("2d", { alpha: false });

    // ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    // map.mapTiles.forEach(function(value) {
    //         ctx.beginPath();
    //         ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    //         ctx.rect(value.locationX * 5, value.locationY * 5, 4, 4);
    //         ctx.stroke();
    // })

    // let tiles = map.mapTiles;
    // map.mapTiles = Object.create(tiles)

    map.mapTiles.filter((mapTile) => mapTile.cell instanceof Cell).forEach(function (mapTile) {

        if (offScreenContext == null)
            return;

        if(mapTile.cell != null) {
            offScreenContext?.beginPath();
            offScreenContext?.rect(mapTile.locationX * 10, mapTile.locationY * 10, 8, 8);
            if (mapTile.cell.type == 1) {
                offScreenContext.fillStyle = "rgba(0, 255, 0, " + (mapTile.cell.energy / 200) + ")";
            }
            else if (mapTile.cell.type == 2) {
                offScreenContext.fillStyle = "rgba(0, 0, 255, " + (mapTile.cell.energy / 200) + ")";
            }
            else {
                offScreenContext.fillStyle = "rgba(255, 0, 0, " + (mapTile.cell.energy / 200) + ")";
            }
            offScreenContext.fill();

            let cell = mapTile.cell;
            if (mapTile.cell.energy < 20) {
                map.mapTiles[mapTile.index].cell = null;
                return;
            }

            let action = cell.DecideAction()

            switch (action) {
                case Action.Rest:
                    console.log("Rest")
                    let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY)
                    let emptyNeighbourCells = 0;
                    neighbours.forEach(x => {
                        if(x.cell == null)
                            emptyNeighbourCells++
                    })

                    let extraEnergy = (emptyNeighbourCells >= 3) ? (7 - 2) * emptyNeighbourCells : 1;
                    cell.energy += extraEnergy;

                    if (cell.energy > 200)
                    {
                        cell.energy = 200;
                    }

                    break;
                case Action.Nothing:
                    break;
                case Action.Die:
                    map.mapTiles.map(x => {
                        if (x.locationX == mapTile.locationX && x.locationY == mapTile.locationY) {
                            x.cell = null;
                        }
                    })
                    break;
                // Eat
                case Action.EatLeft:
                    eatTo(mapTile, mapTile.locationX - 1, mapTile.locationY)
                    break;
                case Action.EatUp:
                    eatTo(mapTile, mapTile.locationX, mapTile.locationY + 1)
                    break;
                case Action.EatDown:
                    eatTo(mapTile, mapTile.locationX, mapTile.locationY -1)
                    break;
                case Action.EatRight:
                    eatTo(mapTile, mapTile.locationX + 1, mapTile.locationY)
                    break;
                // Move
                case Action.MoveLeft:
                    moveTo(mapTile, mapTile.locationX - 1, mapTile.locationY);
                    break;
                case Action.MoveUp:
                    moveTo(mapTile, mapTile.locationX, mapTile.locationY - 1);
                    break;
                case Action.MoveDown:
                    moveTo(mapTile, mapTile.locationX, mapTile.locationY + 1);
                    break;
                case Action.MoveRight:
                    moveTo(mapTile, mapTile.locationX + 1, mapTile.locationY);
                    break;
                case Action.SplitLeft:
                    splitTo(mapTile, mapTile.locationX - 1, mapTile.locationY);
                    break;
                case Action.SplitUp:
                    splitTo(mapTile, mapTile.locationX, mapTile.locationY - 1);
                    break;
                case Action.SplitDown:
                    splitTo(mapTile, mapTile.locationX, mapTile.locationY + 1);
                    break;
                case Action.SplitRight:
                    splitTo(mapTile, mapTile.locationX + 1, mapTile.locationY);
                    break;

            }
        }
    })


    // @ts-ignore
    let onScreenContext = document.getElementById('canvas')?.getContext('2d', { alpha: false });
    onScreenContext.drawImage(offScreenCanvas, 0, 0);

    //setTimeout(() => {  window.requestAnimationFrame(draw); }, 1000);
    window.requestAnimationFrame(draw);

}

init();
