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

const columns = 10;
export const GLOBAL = {
    ROWS: 20,
    COLUMNS: columns,
    GAP: 2,
    COLORS: ["red", "blue", "green", "yellow", "orange", "cyan"],
    INITIAL_POSITION: new Point(columns / 2, 3),
};

export function randomTetromino(): Shape {
    const randNum = Math.floor(Math.random() * 7);
    const shapesCharacters = "IOTJLSZ";
    let shape: Shape;

    switch (shapesCharacters[randNum]) {
        case "I":
            shape = new IShape();
            break;

        case "O":
            shape = new OShape();
            break;

        case "T":
            shape = new TShape();
            break;

        case "J":
            shape = new JShape();
            break;

        case "L":
            shape = new LShape();
            break;

        case "S":
            shape = new SShape();
            break;

        default:
            shape = new ZShape();
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
