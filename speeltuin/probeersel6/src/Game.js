import { Grid } from "./Grid.js";
let grid = new Grid(5);
generateMap();
function generateMap() {
    grid.generateMap();
    grid.addCell(0, 0, 1, 100);
    window.requestAnimationFrame(draw);
}
function draw() {
    grid.update();
    grid.printGrid();
    grid.update();
    grid.printGrid();
    //setTimeout(() => {  window.requestAnimationFrame(draw); }, 1000);
}
