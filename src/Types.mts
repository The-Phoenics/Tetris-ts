export type GameContext = {
    canvas: HTMLCanvasElement;
    canvasContext: CanvasRenderingContext2D;
};

export class Point {
    public x: number;
    public y: number;

    constructor(xval: number, yval: number) {
        this.x = xval;
        this.y = yval;
    }
}

export const GLOBAL = {
    ROWS: 20,
    COLUMNS: 10,
    // gap between blocks
    GAP: 2,
};
