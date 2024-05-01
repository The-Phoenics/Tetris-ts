import { GLOBAL, Point } from "./Global.mjs";
import { Shape } from "./Shape.mjs";

export class Board {
    public boardData: string[];

    constructor() {
        this.boardData = new Array(GLOBAL.ROWS * GLOBAL.COLUMNS).fill(
            GLOBAL.EMPTY_BLOCK_COLOR_STRING
        );
    }

    public update(shape: Shape): void {
        shape.points.forEach((point) => {
            const idx = (point.y - 1) * GLOBAL.COLUMNS + (point.x - 1);
            this.boardData[idx] = shape.color;
        });
    }

    public render(drawBlock: (point: Point, color: string) => void): void {
        for (let x = 0; x < GLOBAL.ROWS; x++) {
            for (let y = 0; y < GLOBAL.COLUMNS; y++) {
                // board index is for the color of block
                let boardIdx = x * GLOBAL.COLUMNS + y;
                drawBlock(new Point(y + 1, x + 1), this.boardData[boardIdx]);
            }
        }
    }

    public isEmptyAt(point: Point): boolean {
        const idx: number = (point.y) * GLOBAL.COLUMNS + (point.x);
        if (idx < 0)
            return true;
        else if (idx > GLOBAL.ROWS * GLOBAL.COLUMNS)
            return false;
        return this.boardData[idx] === GLOBAL.EMPTY_BLOCK_COLOR_STRING;
    }
}
