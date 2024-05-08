import { Board } from "./Board.mjs";
import { IShape, JShape, LShape, OShape, SShape, Shape, TShape, ZShape } from "./Shape.mjs";

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
    BLOCK_IMG: any,
    DROP_SHADOW_COLOR: string,
    EMPTY_BLOCK_COLOR_STRING: string,
    ROWS: number,
    COLUMNS: number,
    GAP: number,
    COLORS: string[],
    INITIAL_POSITION: Point;
}

// Global Object values are use across the project
const columns = 10;
export const GLOBAL: GlobalObject = {
    BLOCK_IMG: null,
    DROP_SHADOW_COLOR: '#6f6f6f33',
    EMPTY_BLOCK_COLOR_STRING: '#aaaaaa',
    ROWS: 20,
    COLUMNS: columns,
    GAP: 2,
    COLORS: ["#ff0000cc", "#00ff00cc", "#0000ffcc", "#ffff00cc", "#00ffffcc", "#ff00ffcc"],
    INITIAL_POSITION: new Point(columns / 2, 1),
};

export function randomTetromino(board: Board): Shape {
    const randNum = Math.floor(Math.random() * 7);
    const shapesCharacters = "IOTJLSZ";
    let shape: Shape;

    switch (shapesCharacters[randNum]) {
        case "I":
            shape = new IShape(board);
            break;

        case "O":
            shape = new OShape(board);
            break;

        case "T":
            shape = new TShape(board);
            break;

        case "J":
            shape = new JShape(board);
            break;

        case "L":
            shape = new LShape(board);
            break;

        case "S":
            shape = new SShape(board);
            break;

        default:
            shape = new ZShape(board);
            break;
    }
    return shape;
}

export function randomColorString(): string {
    let randomIdx = Math.floor(Math.random() * GLOBAL.COLORS.length);
    return GLOBAL.COLORS[randomIdx];
}

export function canMove(direction: string, points: Point[]) {
    let canMoveInDirection = true;
    switch (direction) {
        case "down":
            for (let i = 0; i < points.length; i++) {
                if (points[i].y == GLOBAL.ROWS) {
                    canMoveInDirection = false;
                    break;
                }
            }
            break;

        case "left":
            for (let i = 0; i < points.length; i++) {
                if (points[i].x == 1) {
                    canMoveInDirection = false;
                    break;
                }
            }
            break;

        case "right":
            for (let i = 0; i < points.length; i++) {
                if (points[i].x == GLOBAL.COLUMNS) {
                    canMoveInDirection = false;
                    break;
                }
            }
            break;

        default:
            break;
    }
    return canMoveInDirection;
}
