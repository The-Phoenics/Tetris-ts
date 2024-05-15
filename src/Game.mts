import { Board } from "./Board.mjs";
import { Shape } from "./Shape.mjs";
import { GLOBAL, GameContext, Point } from "./Global.mjs";
import { Utils } from "./Utils.mjs";
import NextPieceCanvas from "./NextPieceCanvas.mjs";

export class Game {
    public canvas_width: number;
    public canvas_height: number;
    public board: Board;
    public gameOver: boolean;
    private ctx: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    private nextPieceCanvas: NextPieceCanvas;
    private isSpaceHeldDown: boolean;
    private blockSize: number;
    private tetromino: Shape;
    private scoreValueElement: HTMLHeadElement;

    constructor(config: GameContext) {
        this.scoreValueElement = document.querySelector(".score-value") as HTMLHeadElement;
        this.scoreValueElement.innerText = String(0);
        this.canvas = config.canvas;
        this.ctx = config.canvasContext;
        this.canvas_width = 0;
        this.canvas_height = 0;
        this.blockSize = 0;
        this.board = new Board();
        this.tetromino = Utils.randomTetromino(this.board);
        this.gameOver = true;
        this.isSpaceHeldDown = false; 

        // initalize gameplay and next piece canvas object
        this.updateCanvasDimensions();
        this.nextPieceCanvas = new NextPieceCanvas(this.blockSize);

        window.addEventListener("resize", () => {
            this.updateCanvasDimensions();
        });
        window.addEventListener("keydown", this.gameControls);
        window.addEventListener("keyup", (e) => {
            if (e.key == " ") this.isSpaceHeldDown = false;
        });
    }

    public gameControls = (e: KeyboardEvent) => {
        switch (e.key) {
            case "ArrowUp":
            case "w":
                this.tetromino.rotate(true);
                break;

            case "ArrowLeft":
            case "a":
                this.tetromino.move("left");
                break;

            case "ArrowRight":
            case "d":
                this.tetromino.move("right");
                break;

            case "ArrowDown":
            case "s":
                this.tetromino.move("down");
                break;

            case " ":
                if (!this.isSpaceHeldDown) {
                    this.tetromino.drop();
                    this.isSpaceHeldDown = true;
                }
                break;

            default:
                break;
        }
    };

    /*
     * Resonsive canvas
     * calculate height and block size for canvas based on view width
     */
    private updateCanvasDimensions = () => {
        // ratio of canvas width by height
        this.canvas.height = Math.floor(document.querySelector(".canvas-container")?.clientHeight!);

        if (this.canvas.height % 2 != 0)
            this.canvas.height = this.canvas.height - 1;

        this.canvas.width = Math.floor(this.canvas.height * GLOBAL.WIDTH_HEIGHT_RATIO);

        // calculate block size
        let gapArea = GLOBAL.COLUMNS + 1;
        this.blockSize = (this.canvas.width - gapArea * GLOBAL.GAP) / GLOBAL.COLUMNS;
    };

    private updateScore = (numOfLinesCleared: number) => {
        this.scoreValueElement.innerText = String(numOfLinesCleared);
    }

    public update = () => {
        this.tetromino.update();
        if (this.tetromino.hasLanded) {
            this.tetromino.onLanding();
            this.tetromino = Utils.randomTetromino(this.board);

            if (this.tetromino.checkGameOver()) {
                this.gameOver = true;
            }
        }
        this.nextPieceCanvas.update(this.blockSize);
        this.updateScore(this.board.numOfLinesCleared);
    };

    public render = () => {
        Utils.clearCanvas(this.canvas);
        this.board.render(this.ctx, this.blockSize);
        this.tetromino.render(this.ctx, this.blockSize);
        this.nextPieceCanvas.render(this.blockSize);
    };
}
