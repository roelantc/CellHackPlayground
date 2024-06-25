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
export var CellAction;
(function (CellAction) {
    CellAction[CellAction["Rest"] = 1] = "Rest";
    CellAction[CellAction["Nothing"] = 2] = "Nothing";
    CellAction[CellAction["Die"] = 3] = "Die";
    // Eat
    CellAction[CellAction["EatUp"] = 4] = "EatUp";
    CellAction[CellAction["EatDown"] = 5] = "EatDown";
    CellAction[CellAction["EatLeft"] = 6] = "EatLeft";
    CellAction[CellAction["EatRight"] = 7] = "EatRight";
    // Move
    CellAction[CellAction["MoveUp"] = 8] = "MoveUp";
    CellAction[CellAction["MoveDown"] = 9] = "MoveDown";
    CellAction[CellAction["MoveLeft"] = 10] = "MoveLeft";
    CellAction[CellAction["MoveRight"] = 11] = "MoveRight";
    // Split
    CellAction[CellAction["SplitUp"] = 12] = "SplitUp";
    CellAction[CellAction["SplitDown"] = 13] = "SplitDown";
    CellAction[CellAction["SplitLeft"] = 14] = "SplitLeft";
    CellAction[CellAction["SplitRight"] = 15] = "SplitRight";
    // Feed
    CellAction[CellAction["FeedUp"] = 16] = "FeedUp";
    CellAction[CellAction["FeedDown"] = 17] = "FeedDown";
    CellAction[CellAction["FeedLeft"] = 18] = "FeedLeft";
    CellAction[CellAction["FeedRight"] = 19] = "FeedRight";
})(CellAction || (CellAction = {}));
