import { GLOBAL } from "./Global.mjs";
import { Shape } from "./Shape.mjs";

export class Board {
    public boardData: string[];

    constructor() {
        this.boardData = new Array(GLOBAL.ROWS * GLOBAL.COLUMNS).fill("black");
    }

    public update(shape: Shape): void {
        console.log(this.boardData)
        shape.points.forEach((point) => {
            this.boardData[GLOBAL.COLUMNS * (point.y - 1) + point.x] = shape.color
        })
        console.log(this.boardData)
    }

    public render(ctx: CanvasRenderingContext2D, blockSize: number): void {
        for (let i = 0; i < this.boardData.length; i++) {
            let xpos = (i + 1) % GLOBAL.COLUMNS;
            let ypos = (i + 1) % GLOBAL.COLUMNS;
            console.log(xpos, "  ", ypos);
            ctx.fillStyle = this.boardData[0];
            ctx.fillRect(xpos, ypos, blockSize, blockSize);
        }
    }
}
