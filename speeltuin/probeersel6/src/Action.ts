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

export enum Action {
    Rest = 1,
    Nothing,
    Die,

    // Eat
    EatUp,
    EatDown,
    EatLeft,
    EatRight,

    // Move
    MoveUp,
    MoveDown,
    MoveLeft,
    MoveRight,

    // Split
    SplitUp,
    SplitDown,
    SplitLeft,
    SplitRight,

    // Feed
    FeedUp,
    FeedDown,
    FeedLeft,
    FeedRight,
}