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
    GAP: 2,
    COLORS: ['red', 'blue', 'green', 'yellow', 'orange'],
};

export function randomColorString(): string {
    let randomIdx = Math.floor(Math.random() * GLOBAL.COLORS.length)
    return GLOBAL.COLORS[randomIdx]

}