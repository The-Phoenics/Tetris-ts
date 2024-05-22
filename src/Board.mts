import { AudioManager } from "./AudioManager.mjs";
import { GLOBAL, Point } from "./Global.mjs";
import { Shape } from "./Shape.mjs";
import { Utils } from "./Utils.mjs";

export class Board {
    public boardData: string[];
    public numOfLinesCleared: number = 0;

    constructor() {
        this.boardData = new Array(GLOBAL.ROWS * GLOBAL.COLUMNS).fill(
            GLOBAL.EMPTY_BLOCK_COLOR_STRING
        );
    }

    public update(shape: Shape): void {
        if (!shape) {
            console.log('undefined this tetromino')
        } else {
            console.log('fine')
        }
        shape.points.forEach((point) => {
            const idx = (point.y - 1) * GLOBAL.COLUMNS + (point.x - 1);
            this.boardData[idx] = shape.color;
        });

        this.clearLines();
    }

    public clearLines = () => {
        for (let r = GLOBAL.ROWS - 1; r >= 0; r--) {
            let rowIsFilled: boolean = true;
            for (let c = 0; c < GLOBAL.COLUMNS; c++) {
                if (this.boardData[r * GLOBAL.COLUMNS + c] == GLOBAL.EMPTY_BLOCK_COLOR_STRING) {
                    rowIsFilled = false;
                    break;
                }
            }

            if (rowIsFilled) {
                const rowStart: number = r * GLOBAL.COLUMNS;
                const deleteCount: number = GLOBAL.COLUMNS;

                // delete the current row
                this.boardData.splice(rowStart, deleteCount);

                // add an empty block row at beginning
                let emptyBlockRow: string[] = new Array(GLOBAL.COLUMNS).fill(
                    GLOBAL.EMPTY_BLOCK_COLOR_STRING
                );
                this.boardData = emptyBlockRow.concat(this.boardData);
                
                r = GLOBAL.ROWS;
                this.onLineClearing();
            }
        }
    };

    private onLineClearing = () => {
        AudioManager.playLineClear();
        this.numOfLinesCleared++;
    }

    public render = (ctx: CanvasRenderingContext2D, blockSize: number) => {
        for (let r = 0; r < GLOBAL.ROWS; r++) {
            for (let c = 0; c < GLOBAL.COLUMNS; c++) {
                // board index is for the color of block
                let boardIdx = r * GLOBAL.COLUMNS + c;
                Utils.drawColorBlockImg(new Point(c + 1, r + 1), this.boardData[boardIdx], ctx, blockSize);
            }
        }
    }

    public isEmptyAt(point: Point): boolean {
        const idx: number = (point.y - 1) * GLOBAL.COLUMNS + (point.x - 1);
        if (idx < 0)
            return true;

        return this.boardData[idx] === GLOBAL.EMPTY_BLOCK_COLOR_STRING;
    }
}
