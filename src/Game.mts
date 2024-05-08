import { Board } from "./Board.mjs";
import { IShape, Shape } from "./Shape.mjs";
import { GLOBAL, GameContext, Point, randomTetromino } from "./Global.mjs";

export class Game {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public canvas_width: number;
    public canvas_height: number;
    public board: Board;
    private blockSize: number;
    private tetromino: Shape;

    constructor(config: GameContext) {
        this.canvas = config.canvas;
        this.ctx = config.canvasContext;
        this.canvas_width = 0;
        this.canvas_height = 0;
        this.blockSize = 0;
        this.board = new Board();
        this.tetromino = new IShape(this.board);

        // initalize canvas
        this.updateCanvasDimensions();
        window.addEventListener("resize", () => {
            this.updateCanvasDimensions();
        });

        this.init();
    }

    private init(): void {
        // Game Controls
        window.addEventListener("keydown", (e) => {
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
                    this.tetromino.drop();
                    break;

                default:
                    break;
            }
        });
    }

    private clearCanvas = () => {
        this.ctx.fillStyle = GLOBAL.EMPTY_BLOCK_COLOR_STRING;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };

    /*
     * Resonsive canvas
     * calculate height and block size for canvas based on view width
     */
    private updateCanvasDimensions = () => {
        // ratio of canvas width by height
        const RATIO = 0.502;
        this.canvas.height = Math.floor(document.querySelector(".canvas-container")?.clientHeight!);

        if (this.canvas.height % 2 != 0) this.canvas.height = this.canvas.height - 1;

        this.canvas.width = Math.floor(this.canvas.height * RATIO);

        // calculate block size
        let gapArea = GLOBAL.COLUMNS + 1;
        this.blockSize = (this.canvas.width - gapArea * GLOBAL.GAP) / GLOBAL.COLUMNS;
    };

    private drawColorBlock = (point: Point, color: string) => {
        this.ctx.fillStyle = color;
        let x = GLOBAL.GAP * point.x + this.blockSize * (point.x - 1);
        let y = GLOBAL.GAP * point.y + this.blockSize * (point.y - 1);
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
    };

    private drawColorBlockImg = (point: Point, color: string) => {
        let x = GLOBAL.GAP * point.x + this.blockSize * (point.x - 1);
        let y = GLOBAL.GAP * point.y + this.blockSize * (point.y - 1);
        if (GLOBAL.BLOCK_IMG == null || GLOBAL.BLOCK_IMG == undefined) {
            // ...
        }
        else {
            this.ctx.drawImage(GLOBAL.BLOCK_IMG, x, y, this.blockSize, this.blockSize);
            // this.ctx.globalCompositeOperation = "multiply";
            this.ctx.globalAlpha = 0.8
            this.ctx.fillStyle = color;
            this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
        }
    }

    public update = () => {
        this.tetromino.update();
        if (this.tetromino.hasLanded) {
            this.tetromino.onLanding();
            this.tetromino = randomTetromino(this.board);
        }
    };

    public render = () => {
        this.clearCanvas();
        this.board.render(this.drawColorBlockImg);
        this.tetromino.render(this.drawColorBlockImg);
    };

    // game loop
    public run = () => {
        this.update();
        this.render();
        window.requestAnimationFrame(this.run);
    };
}
