import { GLOBAL, Point } from "./Global.mjs";
import { Utils } from "./Utils.mjs";

class NextPieceCanvas {
    public canvas: HTMLCanvasElement = document.querySelector(".piece-canvas") as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    constructor(blockSize: number) {
        this.update(blockSize);
    }

    public update = (blockSize: number) => {
        const numOfGapLines = GLOBAL.PIECE_CANVAS_COLUMNS + 1;
        this.canvas.width = ((blockSize * GLOBAL.PIECE_CANVAS_COLUMNS)) + numOfGapLines * GLOBAL.GAP;
        this.canvas.height = this.canvas.width;
    }

    public render = (blockSize: number) => {
        Utils.clearCanvas(this.canvas);
        // draw piece canvas with empty color blocks
        for (let r = 0; r < GLOBAL.PIECE_CANVAS_ROWS; r++) {
            for (let c = 0; c < GLOBAL.PIECE_CANVAS_ROWS; c++) {
                Utils.drawColorBlockImg(new Point(c + 1, r + 1), GLOBAL.EMPTY_BLOCK_COLOR_STRING, this.ctx, blockSize);
            }
        }
    }

}

export default NextPieceCanvas;