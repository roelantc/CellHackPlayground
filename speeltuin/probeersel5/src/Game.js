import { Map } from "./Map.js";
import { Cell } from "./Cell.js";
let map = new Map(24, 24);
//map.map.push(cell);
// TOOD: get maptile based on location and add cell
function init() {
    map.generateMap();
    let cellPlayer1 = new Cell(1, 100);
    map.addCell(cellPlayer1, 2, 2);
    map.mapCells = map.mapTiles;
    console.log(map.mapCells);
    window.requestAnimationFrame(draw);
}
function DoeIets(mapTile) {
    let environment = map.getEnvironment(mapTile.x, mapTile.y);
    environment[5].cell = mapTile.cell;
    mapTile.cell = null;
}
function draw() {
    let offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = 750;
    offScreenCanvas.height = 750;
    let offScreenContext = offScreenCanvas.getContext("2d", { alpha: false });
    // offScreenContext.beginPath();
    // map.mapTiles.forEach(function(value) {
    //     offScreenContext.strokeStyle = "rgba(255, 255, 255, 0.05)";
    //     offScreenContext.rect(value.x * 10, value.y * 10, 7, 7);
    // })
    // offScreenContext.stroke();
    offScreenContext?.beginPath();
    map.mapCells.forEach((mapTile) => {
        offScreenContext?.rect(mapTile.x * 10, mapTile.y * 10, 8, 8);
        if (mapTile.cell?.type == 1) {
            // @ts-ignore
            offScreenContext.fillStyle = "rgba(0, 255, 0, " + (mapTile.cell.energy / 200) + ")";
        }
        else if (mapTile.cell?.type == 2) {
            // @ts-ignore
            offScreenContext.fillStyle = "rgba(0, 0, 255, " + (mapTile.cell.energy / 200) + ")";
        }
        else if (mapTile.cell?.type == 3) {
            // @ts-ignore
            offScreenContext.fillStyle = "rgba(255, 0, 0, " + (mapTile.cell.energy / 200) + ")";
        }
        DoeIets(mapTile);
    });
    // map.mapTiles.filter((mapTile) => mapTile.cell instanceof Cell && mapTile.cell.type == 1).forEach((mapTile) => {
    //
    //     offScreenContext.rect(mapTile.x * 10, mapTile.y * 10, 8, 8);
    //         if (mapTile.cell?.type == 1) {
    //             offScreenContext.fillStyle = "rgba(0, 255, 0, " + (mapTile.cell.energy / 200) + ")";
    //         } else if (mapTile.cell?.type == 2) {
    //             offScreenContext.fillStyle = "rgba(0, 0, 255, " + (mapTile.cell.energy / 200) + ")";
    //         } else if (mapTile.cell?.type == 3) {
    //             offScreenContext.fillStyle = "rgba(255, 0, 0, " + (mapTile.cell.energy / 200) + ")";
    //         }
    //
    //         DoeIets(mapTile)
    // })
    offScreenContext?.fill();
    // @ts-ignore
    let onScreenContext = document.getElementById('canvas')?.getContext('2d', { alpha: false });
    onScreenContext.drawImage(offScreenCanvas, 0, 0);
    //setTimeout(() => {  window.requestAnimationFrame(draw); }, 1000);
    window.requestAnimationFrame(draw);
}
init();
