import { Base } from "./Cells/Base";
import { Cell } from "./Cell";
let message = "Toeter";
console.log(message);
var attack = new Base();
var cell = new Cell();
function init() {
    window.requestAnimationFrame(draw);
}
function draw() {
    var canvas = document.createElement('canvas');
    const ctx = canvas.getContext("2d");
    window.requestAnimationFrame(draw);
}
init();
