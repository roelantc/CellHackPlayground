import {Action} from "./Enums/Action.js";

export class MapTile {

    constructor(index: number, locationX: number, locationY: number) {
        this.index = index;
        this.locationX = locationX;
        this.locationY = locationY;
    }

    public index: number;

    public locationX: number;
    public locationY: number;

    public type: number = 0;
    public energy: number = 0;

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

}