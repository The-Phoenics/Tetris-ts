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
    INITIAL_POSITION: new Point(columns / 2, 0)
};

export function randomColorString(): string {
    let randomIdx = Math.floor(Math.random() * GLOBAL.COLORS.length + 1);
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
