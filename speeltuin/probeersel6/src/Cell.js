import { Action } from "./Action.js";
export class Cell {
    x;
    y;
    player;
    energy;
    constructor(x, y, player, energy = 0) {
        this.x = x;
        this.y = y;
        this.player = player;
        this.energy = energy;
    }
    decideAction() {
        return Action.MoveRight;
        // if (this.energy < 125)
        //     return Action.Rest;
        //
        // if (this.energy > 150)
        // {
        //     let agressionActions = [
        //         Action.SplitLeft,
        //         Action.SplitRight,
        //         Action.SplitUp,
        //         Action.SplitDown,
        //         Action.EatLeft,
        //         Action.EatRight,
        //         Action.EatUp,
        //         Action.EatDown,
        //     ]
        //
        //     return agressionActions[Math.floor(Math.random() * agressionActions.length)];
        // }
        let moveActions = [Action.MoveLeft,
            Action.MoveRight,
            Action.MoveUp,
            Action.MoveDown,
            Action.Rest
        ];
        return moveActions[Math.floor(Math.random() * moveActions.length)];
    }
}
