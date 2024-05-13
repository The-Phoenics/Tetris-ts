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

interface GlobalObject {
    WIDTH_HEIGHT_RATIO: number,
    BLOCK_IMG: any,
    DROP_SHADOW_COLOR: string,
    EMPTY_BLOCK_COLOR_STRING: string,
    ROWS: number,
    COLUMNS: number,
    GAP: number,
    COLORS: string[],
    INITIAL_POSITION: Point;
    PIECE_CANVAS_ROWS: number,
    PIECE_CANVAS_COLUMNS: number,
}

// Global Object values are usded across the project
const columns = 10;
export const GLOBAL: GlobalObject = {
    WIDTH_HEIGHT_RATIO: 0.502,
    BLOCK_IMG: null,
    DROP_SHADOW_COLOR: '#6f6f6f33',
    EMPTY_BLOCK_COLOR_STRING: '#1212129f',
    ROWS: 20,
    COLUMNS: columns,
    GAP: 2,
    COLORS: ["#ff000077", "#00ff0077", "#0000ff77", "#ffff0077", "#00ffff77", "#ff00ff77"],
    INITIAL_POSITION: new Point(columns / 2, 1),
    PIECE_CANVAS_ROWS: 6,
    PIECE_CANVAS_COLUMNS: 6,
};
