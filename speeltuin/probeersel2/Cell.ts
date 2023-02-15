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
        let actionList = [
            Action.MoveLeft,
            Action.MoveRight,
            Action.MoveUp,
            Action.MoveDown,
            Action.Rest,
            Action.SplitLeft,
            Action.SplitRight,
            Action.SplitUp,
            Action.SplitDown,
            Action.EatLeft,
            Action.EatRight,
            Action.EatUp,
            Action.EatDown,
        ]

        if (this.type == 1) {
            return actionList[Math.floor(Math.random() * actionList.length)];
        }

        if (this.type == 2) {

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

            return moveActions[Math.floor(Math.random() * moveActions.length)];
        }



        if (this.type == 3) {
            let player3Actions = [
                Action.Rest,
                Action.Rest,
                Action.Rest,
                Action.Rest,
                Action.SplitLeft,
                Action.SplitRight,
                Action.SplitUp,
                Action.SplitDown,
                // Action.EatLeft,
                // Action.EatRight,
                // Action.EatUp,
                // Action.EatDown,
            ]
            return player3Actions[Math.floor(Math.random() * player3Actions.length)];
        }
    }

    // ExcecuteAction(action: Action)
    // {
    //     switch (action) {
    //         case Action.Rest:
    //             this.energy += 1 // TODO: hier kijken naar omringende cellen, en rekening houden met de maximale cap van de cell energy
    //             break;
    //         case Action.Nothing:
    //             break;
    //         case Action.Die:
    //             this.type = 0;
    //             break;
    //         // Eat
    //         case Action.EatLeft:
    //             break;
    //         case Action.EatUp:
    //             break;
    //         case Action.EatDown:
    //             break;
    //         case Action.EatRight:
    //             break;
    //         // Move
    //         case Action.MoveLeft:
    //             this.locationX -= 1;
    //             break;
    //         case Action.MoveUp:
    //             this.locationY -= 1;
    //             break;
    //         case Action.MoveDown:
    //             this.locationY += 1;
    //             break;
    //         case Action.MoveRight:
    //             this.locationX += 1;
    //             break;
    //         case Action.SplitLeft:
    //             let energy = this.energy / 2;
    //             let locationX = this.locationX - 1;
    //             new Cell(this.type, energy, locationX, this.locationY)
    //             break;
    //
    //     }
    // }
}