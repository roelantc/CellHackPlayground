import {Action} from "./Enums/Action.js";

export class Cell {

    constructor(type: number, energy: number) {
        this.type = type;
        this.energy = energy;
    }

    public type: number;
    public energy: number;

    DecideAction() : Action
    {

        if (this.energy < 125)
            return Action.Rest;

        if (this.energy > 150)
        {
            let agressionActions = [
                Action.SplitLeft,
                Action.SplitRight,
                Action.SplitUp,
                Action.SplitDown,
                Action.EatLeft,
                Action.EatRight,
                Action.EatUp,
                Action.EatDown,
            ]

            return agressionActions[Math.floor(Math.random() * agressionActions.length)];
        }

        let moveActions = [Action.MoveLeft,
            Action.MoveRight,
            Action.MoveUp,
            Action.MoveDown,
            Action.Rest
        ]

        //return moveActions[Math.floor(Math.random() * moveActions.length)];
        return Action.MoveRight;
    }
}