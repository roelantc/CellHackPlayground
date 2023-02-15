// -- Action enumeration --
// The rough idea is that the more crowded a cells environment is
// the more energy it takes per turn.
//
// Rest - When resting a cell will take in energy from the nutrient rich
//      solution around it; the more empty space in the cells environment the
//      more energy it gains from this.
// Nothing - Literally nothing. If an action like MOVE_UP fails, this is the
//      fall back move.
// Die - Cell energy immediately drops to zero.
//
// Actions that require a direction:
// NOTE, only cardinal directions are valid
//
// Eat - Takes energy from a neighboring cell. What kind of cell does not
//      matter; eating at your own cells is allowed.
// Move - Move cell into an empty space.
// Split - Cell splits into an empty space, creating two duplicate children
//      with half the energy of the parent. Cell memory of the children is
//      initially the value of the parent at the moment of splitting.
// Feed - Gives away some energy to a neighboring cell. What kind of cell
//      does not matter.
export var Action;
(function (Action) {
    Action[Action["Rest"] = 1] = "Rest";
    Action[Action["Nothing"] = 2] = "Nothing";
    Action[Action["Die"] = 3] = "Die";
    // Eat
    Action[Action["EatUp"] = 4] = "EatUp";
    Action[Action["EatDown"] = 5] = "EatDown";
    Action[Action["EatLeft"] = 6] = "EatLeft";
    Action[Action["EatRight"] = 7] = "EatRight";
    // Move
    Action[Action["MoveUp"] = 8] = "MoveUp";
    Action[Action["MoveDown"] = 9] = "MoveDown";
    Action[Action["MoveLeft"] = 10] = "MoveLeft";
    Action[Action["MoveRight"] = 11] = "MoveRight";
    // Split
    Action[Action["SplitUp"] = 12] = "SplitUp";
    Action[Action["SplitDown"] = 13] = "SplitDown";
    Action[Action["SplitLeft"] = 14] = "SplitLeft";
    Action[Action["SplitRight"] = 15] = "SplitRight";
    // Feed
    Action[Action["FeedUp"] = 16] = "FeedUp";
    Action[Action["FeedDown"] = 17] = "FeedDown";
    Action[Action["FeedLeft"] = 18] = "FeedLeft";
    Action[Action["FeedRight"] = 19] = "FeedRight";
})(Action || (Action = {}));
