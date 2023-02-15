import {Map} from "./Map.js";
import {Cell} from "./Cell.js";
import {Action} from "./Enums/Action.js";

let map = new Map(50, 50);

function init() {

    map.mapTiles[2].cell = new Cell(1, 100)

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

            let action = value.cell.DecideAction()
            console.log(Action[action])

            switch (action) {
                case Action.Rest:
                    console.log("Rest")
                    let emptyNeighbourCells = 0;
                    value.environment.forEach(x => {
                        if(x.cell == null)
                            emptyNeighbourCells++
                    })

                    let extraEnergy = (emptyNeighbourCells >= 3) ? (7 - 2) * emptyNeighbourCells : 1;
                    value.cell.energy += extraEnergy;

                    if (value.cell.energy > 200)
                    {
                        value.cell.energy = 200;
                    }

                    break;
                case Action.Nothing:
                    break;
                case Action.Die:
                    // TODO:
                    break;
                // Eat
                case Action.EatLeft:
                    //eatTo(value, value.locationX - 1, value.locationY)
                    break;
                case Action.EatUp:
                    //eatTo(value, value.locationX, value.locationY + 1)
                    break;
                case Action.EatDown:
                    //eatTo(value, value.locationX, value.locationY -1)
                    break;
                case Action.EatRight:
                    //eatTo(value, value.locationX + 1, value.locationY)
                    break;
                // Move
                case Action.MoveLeft:
                    value.environment[3].cell = value.cell
                    value.environment[4].cell = null
                    break;
                case Action.MoveUp:
                    value.environment[1].cell = value.cell
                    value.environment[4].cell = null
                    break;
                case Action.MoveDown:
                    value.environment[7].cell = value.cell
                    value.environment[4].cell = null
                    break;
                case Action.MoveRight:
                    let location2 = map.getLocation(value.locationX + 1, value.locationY)
                    location2[0].cell = value.cell;
                    let location1 = map.getLocation(value.locationX, value.locationY)
                    location1[0].cell = null;
                    // value.environment[5].cell = value.cell
                    // value.environment[4].cell = null
                    break;
                case Action.SplitLeft:
                    value.cell.energy = value.cell.energy / 2;
                    value.environment[3].cell = value.cell
                    break;
                case Action.SplitUp:
                    value.cell.energy = value.cell.energy / 2;
                    value.environment[1].cell = value.cell
                    break;
                case Action.SplitDown:
                    value.cell.energy = value.cell.energy / 2;
                    value.environment[7].cell = value.cell
                    break;
                case Action.SplitRight:
                    value.cell.energy = value.cell.energy / 2;
                    value.environment[5].cell = value.cell
                    break;
            }
        }

    })

    setTimeout(() => {  window.requestAnimationFrame(draw); }, 1000);
    //window.requestAnimationFrame(draw);

}

init();
