import { Board } from "./Board.mjs";
import { GLOBAL, Point } from "./Global.mjs";
import { IShape, JShape, LShape, OShape, SShape, Shape, TShape, ZShape } from "./Shape.mjs";

export namespace Utils {

    let prevRandomNum: number = -1;
    export function randomTetromino(board: Board): Shape {
        let randNum: number = 0;
        while (randNum == prevRandomNum) {
            randNum = Math.floor(Math.random() * 7);
        }
        prevRandomNum = randNum;
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

    let prevRandomIdx: number = -1;
    export function randomColorString(): string {
        let randomIdx: number = 0;
        while (randomIdx == prevRandomIdx) {
            randomIdx = Math.floor(Math.random() * GLOBAL.COLORS.length);
        }
        prevRandomIdx = randomIdx;
        return GLOBAL.COLORS[randomIdx];
    }

    export function clearCanvas(canvas: HTMLCanvasElement) {
        const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvasContext.fillStyle = GLOBAL.EMPTY_BLOCK_COLOR_STRING;
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    }

    export function drawColorBlockImg(point: Point, color: string, canvasContext: CanvasRenderingContext2D, blockSize: number) {
        let x = GLOBAL.GAP * point.x + blockSize * (point.x - 1);
        let y = GLOBAL.GAP * point.y + blockSize * (point.y - 1);
        if (GLOBAL.BLOCK_IMG) {
            canvasContext.drawImage(GLOBAL.BLOCK_IMG, x, y, blockSize, blockSize);
            canvasContext.globalAlpha = 0.8;
            canvasContext.fillStyle = color;
            canvasContext.fillRect(x, y, blockSize, blockSize);
        }
    };
}
