export class Cell {

    // what kind of cell this is, either faction (index into GameState->ai) or 0 for "empty".
    public type: int;

    public energy: int = 200;
    public x: int = 0;
    public y: int = 100;
    public size: int = 2;
    
}