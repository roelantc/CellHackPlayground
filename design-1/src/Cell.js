// @ts-ignore
import { Vector } from "kontra";
import { createElement } from "./HtmlElement";
import { container } from "./GameScene";
import { CellAction } from "./CellAction";
import { cellHeight, cellMaxEnergy, cellMinEnergy, cellSplitMinEnergy, cellWidth, mapHeight, mapWidth } from "./Utilities";
import { CellType } from "./CellType";
export const cells = [];
export class Cell {
    width;
    height;
    htmlElement;
    type;
    energy;
    vector;
    color;
    constructor(vector, energy, type = CellType.Rock, color = '#ff1100') {
        this.vector = vector;
        vector.clamp(0, 0, mapWidth, mapHeight);
        this.width = cellWidth;
        this.height = cellHeight;
        this.type = type;
        this.color = color;
        this.energy = energy;
        this.htmlElement = createElement();
        this.htmlElement.classList.add('cell');
        this.render();
        container.append(this.htmlElement);
        cells.push(this);
    }
    update() {
        if (this.type === CellType.Rock) {
            return;
        }
        if (this.energy < cellMinEnergy) {
            this.dieCell();
            return;
        }
        let environment = this.getCellNeighbours();
        let cellAction = this.decideCellAction(environment);
        switch (cellAction) {
            case CellAction.Rest:
                this.restCell();
                break;
            case CellAction.MoveRight:
                this.moveCell(this.vector.x + 1, this.vector.y);
                break;
            case CellAction.MoveUp:
                this.moveCell(this.vector.x, this.vector.y - 1);
                break;
            case CellAction.MoveLeft:
                this.moveCell(this.vector.x - 1, this.vector.y);
                break;
            case CellAction.MoveDown:
                this.moveCell(this.vector.x, this.vector.y + 1);
                break;
            case CellAction.SplitRight:
                this.splitCell(this.vector.x + 1, this.vector.y);
                break;
            case CellAction.SplitLeft:
                this.splitCell(this.vector.x - 1, this.vector.y);
                break;
            case CellAction.SplitDown:
                this.splitCell(this.vector.x, this.vector.y + 1);
                break;
            case CellAction.SplitUp:
                this.splitCell(this.vector.x, this.vector.y - 1);
                break;
            case CellAction.EatRight:
                this.eatCell(this.vector.x + 1, this.vector.y);
                break;
            case CellAction.EatLeft:
                this.eatCell(this.vector.x - 1, this.vector.y);
                break;
            case CellAction.EatUp:
                this.eatCell(this.vector.x, this.vector.y - 1);
                break;
            case CellAction.EatDown:
                this.eatCell(this.vector.x, this.vector.y + 1);
                break;
            case CellAction.FeedRight:
                this.feedCell(this.vector.x + 1, this.vector.y);
                break;
            case CellAction.FeedLeft:
                this.feedCell(this.vector.x - 1, this.vector.y);
                break;
            case CellAction.FeedUp:
                this.feedCell(this.vector.x, this.vector.y - 1);
                break;
            case CellAction.FeedDown:
                this.feedCell(this.vector.x, this.vector.y + 1);
                break;
            default:
                // CellAction.Nothing
                break;
        }
    }
    render() {
        this.htmlElement.style.left = `${this.vector.x * this.width}px`;
        this.htmlElement.style.top = `${this.vector.y * this.height}px`;
        this.htmlElement.style.transform = `scale(${this.energy / cellMaxEnergy})`;
        this.htmlElement.style.backgroundColor = this.color;
        this.htmlElement.style.opacity = `${this.energy / cellMaxEnergy}`;
    }
    dieCell() {
        let index = cells.indexOf(this);
        container.removeChild(this.htmlElement);
        cells.splice(index, 1);
        this.render();
    }
    restCell() {
        if (this.energy === cellMaxEnergy) {
            return;
        }
        let neighbours = this.getCellNeighbours();
        let emptyNeighbourCells = 8 - neighbours.length;
        let extraEnergy = (emptyNeighbourCells >= 3) ? (7 - 2) * emptyNeighbourCells : 1;
        this.energy += extraEnergy;
        if (this.energy > cellMaxEnergy) {
            this.energy = cellMaxEnergy;
        }
    }
    getCellNeighbours() {
        return cells.filter(cell => cell.vector.x >= (this.vector.x - 1) &&
            cell.vector.x <= (this.vector.x + 1) &&
            cell.vector.y >= (this.vector.y - 1) &&
            cell.vector.y <= (this.vector.y + 1) &&
            cell.vector.y != this.vector.y &&
            cell.vector.x != this.vector.x);
    }
    moveCell(x, y) {
        if (!this.isCellPositionFree(x, y)) {
            return;
        }
        if (this.vector.x < x) {
            this.vector.x += 1;
        }
        else if (this.vector.x > x) {
            this.vector.x -= 1;
        }
        else if (this.vector.y < y) {
            this.vector.y += 1;
        }
        else if (this.vector.y > y) {
            this.vector.y -= 1;
        }
    }
    splitCell(x, y) {
        if (x <= mapWidth && y <= mapHeight && x >= 0 && y >= 0 && this.energy >= cellSplitMinEnergy && this.isCellPositionFree(x, y)) {
            new Cell(new Vector(x, y), this.energy / 2, this.type, this.color);
        }
    }
    isCellPositionFree(x, y) {
        return !cells.some(cell => cell.vector.x == x && cell.vector.y == y);
    }
    eatCell(x, y) {
        let neighbourCell = this.getCell(x, y);
        if (neighbourCell === undefined) {
            return;
        }
        this.energy += 10;
        neighbourCell.energy -= 10;
        if (this.energy > cellMaxEnergy) {
            this.energy = cellMaxEnergy;
        }
    }
    feedCell(x, y) {
        let neighbourCell = this.getCell(x, y);
        if (neighbourCell === undefined) {
            return;
        }
        this.energy -= 10;
        neighbourCell.energy += 10;
        if (neighbourCell.energy > cellMaxEnergy) {
            neighbourCell.energy = cellMaxEnergy;
        }
    }
    getCell(x, y) {
        return cells.find(cell => cell.vector.x == x && cell.vector.y == y && cell.type == CellType.Player);
    }
    decideCellAction(environment) {
        // TODO: Dit achter een callback functie proppen zodat dit makkelijk per cel anders kan zijn
        // TODO: hier moet dan een mechanisme komen om wat de speler aan algoritme gemaakt heeft eruit te laten komen
        if (this.energy < cellSplitMinEnergy + 10)
            return CellAction.Rest;
        let eatActions = [
            CellAction.EatUp,
            CellAction.EatDown,
            CellAction.EatLeft,
            CellAction.EatRight
        ];
        if (environment.some(x => x.color != this.color && x.type == CellType.Player)) {
            return eatActions[Math.floor(Math.random() * eatActions.length)];
        }
        let moveActions = [
            CellAction.MoveUp,
            CellAction.MoveDown,
            CellAction.MoveLeft,
            CellAction.MoveRight,
        ];
        if (environment.length < 2 && Math.random() < 0.5) {
            return moveActions[Math.floor(Math.random() * moveActions.length)];
        }
        let actions = [
            CellAction.Rest,
            CellAction.Rest,
            CellAction.MoveUp,
            CellAction.MoveDown,
            CellAction.MoveLeft,
            CellAction.MoveRight,
            CellAction.SplitRight,
            CellAction.SplitLeft,
            CellAction.SplitUp,
            CellAction.SplitDown,
            // CellAction.FeedRight,
            // CellAction.FeedLeft,
            // CellAction.FeedUp,
            // CellAction.FeedDown,
        ];
        return actions[Math.floor(Math.random() * actions.length)];
    }
}
