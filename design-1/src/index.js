// @ts-ignore
import { GameLoop, init, Vector } from 'kontra';
import { Cell, cells } from "./Cell";
import { container } from "./GameScene";
import { Utilities } from "./Utilities";
import { CellType } from "./CellType";
init();
let updateCount = 0;
let renderCount = 0;
let loop = GameLoop({
    update: function () {
        updateCount++;
        if (updateCount % 10 === 0) {
            cells.forEach((cell) => cell.update());
        }
        if (updateCount >= 60)
            updateCount = 0;
    },
    render: function () {
        renderCount++;
        if (updateCount % 10 === 0) {
            cells.forEach(x => x.render());
        }
        if (updateCount >= 60)
            updateCount = 0;
    }
});
loop.start(); // start the game
const zoomElement = document.getElementById("game-container");
let zoom = 1;
const ZOOM_SPEED = 0.5;
document.addEventListener("wheel", function (e) {
    if (e.deltaY > 0) {
        zoomElement.style.transform = `scale(${(zoom += ZOOM_SPEED)})`;
    }
    else {
        zoomElement.style.transform = `scale(${(zoom -= ZOOM_SPEED)})`;
    }
});
let gameOverButton = document.getElementsByClassName('gameOver')[0];
gameOverButton.addEventListener('click', x => gameOver());
let level1Button = document.getElementsByClassName('level1')[0];
level1Button.addEventListener('click', x => level1());
let level2Button = document.getElementsByClassName('level2')[0];
level2Button.addEventListener('click', x => level2());
let level3Button = document.getElementsByClassName('level3')[0];
level3Button.addEventListener('click', x => level3());
function level1() {
    gameOver();
    Utilities.setMapSize(50, 50);
    new Cell(new Vector(10, 10), 50, CellType.Player);
    new Cell(new Vector(40, 40), 50, CellType.Player, '#009dff');
    new Cell(new Vector(10, 40), 50, CellType.Player, '#07ff07');
    new Cell(new Vector(40, 10), 50, CellType.Player, '#ffc500');
}
function level2() {
    gameOver();
    Utilities.setMapSize(50, 50);
    new Cell(new Vector(24, 24), 100, CellType.Player);
    new Cell(new Vector(26, 26), 100, CellType.Player, '#07ff07');
}
function level3() {
    Utilities.setMapSize(5, 5);
    gameOver();
    new Cell(new Vector(0, 0), 100, CellType.Player);
    new Cell(new Vector(5, 5), 100, CellType.Player, '#07ff07');
    new Cell(new Vector(0, 2), 200, CellType.Rock, '#000000');
    new Cell(new Vector(0, 3), 200, CellType.Rock, '#000000');
    new Cell(new Vector(0, 4), 200, CellType.Rock, '#000000');
    new Cell(new Vector(0, 5), 200, CellType.Rock, '#000000');
    new Cell(new Vector(1, 2), 200, CellType.Rock, '#000000');
    new Cell(new Vector(1, 3), 200, CellType.Rock, '#000000');
    new Cell(new Vector(1, 4), 200, CellType.Rock, '#000000');
    new Cell(new Vector(1, 5), 200, CellType.Rock, '#000000');
    new Cell(new Vector(4, 2), 200, CellType.Rock, '#000000');
    new Cell(new Vector(4, 3), 200, CellType.Rock, '#000000');
    new Cell(new Vector(5, 0), 200, CellType.Rock, '#000000');
    new Cell(new Vector(5, 1), 200, CellType.Rock, '#000000');
    new Cell(new Vector(5, 2), 200, CellType.Rock, '#000000');
    new Cell(new Vector(5, 3), 200, CellType.Rock, '#000000');
}
function gameOver() {
    updateCount = 0;
    renderCount = 0;
    cells.length = 0;
    container.innerHTML = '';
}
