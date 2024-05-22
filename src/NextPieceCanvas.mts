import { GLOBAL, Point } from "./Global.mjs";
import { Utils } from "./Utils.mjs";

class NextPieceCanvas {
    public canvas: HTMLCanvasElement = document.querySelector(".piece-canvas") as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    constructor(blockSize: number) {
        this.updateCanvasDimensions(blockSize);
    }

    public updateCanvasDimensions = (blockSize: number) => {
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
        const nextTetrominoPoints = Utils.tetrominos[1].points;
        const nextTetrominoColor = Utils.tetrominos[1].color;
        this.drawNextPiece(nextTetrominoPoints, nextTetrominoColor, blockSize);
    }

    private normalizePosition = (tetromino: Point[]): Point[]  => {
        let originX = tetromino[0].x;
        let originY = tetromino[0].y;
        const resTetromino: Point[] = tetromino.map(point => {
            const x = point.x - originX;
            const y = point.y - originY;
            return new Point(x, y); 
        })
        return resTetromino;
    }

    public drawNextPiece = (tetromino: Point[], color: string, blockSize: number) => {
        const nextPieceTetromino = this.normalizePosition(tetromino);
        let x = GLOBAL.PIECE_CANVAS_ROWS / 2;
        let y = GLOBAL.PIECE_CANVAS_COLUMNS / 2;

        // move the position to center of next piece canvas
        nextPieceTetromino.forEach(point => {
            point.x = point.x + x;
            point.y = point.y + y;
            Utils.drawColorBlockImg(point, color, this.ctx, blockSize);
        })
    }

}

export default NextPieceCanvas;