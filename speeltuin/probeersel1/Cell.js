export class Cell {
    // what kind of cell this is, either faction (index into GameState->ai) or 0 for "empty".
    type;
    energy = 200;
    x = 0;
    y = 100;
    size = 2;
}
