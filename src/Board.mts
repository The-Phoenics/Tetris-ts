import { GLOBAL } from "./Global.mjs";
import { Shape } from "./Shape.mjs";

export class Board {
    public boardData: string[];
    public log: boolean = false;

    constructor() {
        this.boardData = new Array(GLOBAL.ROWS * GLOBAL.COLUMNS).fill("black");
    }

    public update(shape: Shape): void {
        shape.points.forEach((point) => {
            const idx = GLOBAL.COLUMNS * (point.y - 1) + point.x;
            this.boardData[idx] = shape.color;
        });
    }

    public render(ctx: CanvasRenderingContext2D, blockSize: number): void {
        for (let i = 0; i < GLOBAL.ROWS; i++) {
            for (let j = 0; j < GLOBAL.COLUMNS; j++) {
                let xpos = (blockSize + GLOBAL.GAP) * j + GLOBAL.GAP;
                let ypos = (blockSize + GLOBAL.GAP) * i + GLOBAL.GAP;
                let index = i * GLOBAL.COLUMNS + j + 1;

                ctx.fillStyle = this.boardData[index];
                ctx.fillRect(xpos, ypos, blockSize, blockSize);
            }
        }
    }
}
