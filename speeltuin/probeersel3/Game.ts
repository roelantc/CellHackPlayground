import {Map} from "./Map.js";
import {Action} from "./Enums/Action.js";
import {MapTile} from "./MapTile.js";


let map = new Map(24, 24);

//map.map.push(cell);
// TOOD: get maptile based on location and add cell

function init() {
    map.generateMap()

    var index1 = map.getMapTileIndex(2, 2)
    map.mapTiles[index1].type = 1;
    map.mapTiles[index1].energy = 100;

    var index2 = map.getMapTileIndex(23, 23)
    map.mapTiles[index2].type = 2;
    map.mapTiles[index2].energy = 100;

    var index3 = map.getMapTileIndex(2, 23)
    map.mapTiles[index3].type = 3;
    map.mapTiles[index3].energy = 100;

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

    map.mapTiles.forEach(function(value) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            ctx.rect(value.locationX * 5, value.locationY * 5, 4, 4);
            ctx.stroke();
    })

    let tiles = map.mapTiles;
    map.mapTiles = Object.create(tiles)

    map.mapTiles.forEach(function (value) {

        function moveTo(mapTile: MapTile, newLocationX: number, newLocationY: number) {
            console.log("MoveTo")
            let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY)
            neighbours.map(value => {
                if (value.locationX == newLocationX && value.locationY == newLocationY && value.type == 0)
                {
                    value.energy = mapTile.energy
                    value.type = mapTile.type
                    mapTile.energy = 0
                    mapTile.type = 0;
                }
            })
        }

        function eatTo(mapTile: MapTile, newLocationX: number, newLocationY: number) {
            let neighbours = map.getNeighbours(mapTile.locationX, mapTile.locationY)
            neighbours.map(value => {
                if (value.locationX == newLocationX && value.locationY == newLocationY && value.type != 0)
                {
                    console.log("EatTo")
                    value.energy -= 1;
                    if (value.energy < 20)
                    {
                        value.energy = 0;
                    }

                    mapTile.energy += 1;
                }
            })
        }

        function splitTo(mapTile: MapTile, newLocationX: number, newLocationY: number) {
            console.log("SplitTo")
            if (mapTile.energy >= 40) {
                let newMapTile = map.mapTiles.filter(value => value.locationX == newLocationX && value.locationY == newLocationY && value.type == 0)
                mapTile.energy -= Math.floor(mapTile.energy / 2)

                newMapTile.map(x => {
                    x.energy = Math.floor(mapTile.energy / 2)
                    x.type = mapTile.type
                })

            }
        }

        if(value.type != 0) {

            ctx.beginPath();
            ctx.rect(value.locationX * 5, value.locationY * 5, 4, 4);
            if (value.type == 1) {
                ctx.fillStyle = "rgba(0, 255, 0, " + (value.energy / 200) + ")";
            }
            else if (value.type == 2) {
                ctx.fillStyle = "rgba(0, 0, 255, " + (value.energy / 200) + ")";
            }
            else {
                ctx.fillStyle = "rgba(255, 0, 0, " + (value.energy / 200) + ")";
            }
            ctx.fill();

            if (value.energy < 20) {
                value.energy = 0;
                return;
            }

            let action = value.DecideAction()

            switch (action) {
                case Action.Rest:
                    console.log("Rest")
                    let neighbours = map.getNeighbours(value.locationX, value.locationY)
                    let emptyNeighbourCells = 0;
                    neighbours.forEach(x => {
                        if(x.type == 0)
                            emptyNeighbourCells++
                    })

                    let extraEnergy = (emptyNeighbourCells >= 3) ? (7 - 2) * emptyNeighbourCells : 1;
                    value.energy += extraEnergy;

                    if (value.energy > 200)
                    {
                        value.energy = 200;
                    }

                    break;
                case Action.Nothing:
                    break;
                case Action.Die:
                    map.mapTiles.map(x => {
                        if (x.locationX == value.locationX && x.locationY == value.locationY) {
                            x.type = 0;
                            x.energy = 0;
                        }
                    })
                    break;
                // Eat
                case Action.EatLeft:
                    eatTo(value, value.locationX - 1, value.locationY)
                    break;
                case Action.EatUp:
                    eatTo(value, value.locationX, value.locationY + 1)
                    break;
                case Action.EatDown:
                    eatTo(value, value.locationX, value.locationY -1)
                    break;
                case Action.EatRight:
                    eatTo(value, value.locationX + 1, value.locationY)
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
    })

    //setTimeout(() => {  window.requestAnimationFrame(draw); }, 1000);
    window.requestAnimationFrame(draw);

}

init();
