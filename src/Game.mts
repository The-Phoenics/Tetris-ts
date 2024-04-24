import { collapseTextChangeRangesAcrossMultipleVersions } from "../node_modules/typescript/lib/typescript";
import { Board } from "./Board.mjs";
import { TShape } from "./Shape.mjs";
import { GLOBAL, GameContext, Point } from "./Types.mjs";

export class Game {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public canvas_width: number;
    public canvas_height: number;
    public board: Board;
    private blockSize: number;

    private tshapemino = new TShape('blue');
    private pointsForTetromino: Point[] = [];

    // constructor
    constructor(config: GameContext) {
        this.canvas = config.canvas;
        this.ctx = config.canvasContext;
        this.canvas_width = 0;
        this.canvas_height = 0;
        this.blockSize = 0;

        // initalize canvas 
        this.updateCanvasDimensions();
        window.addEventListener("resize", () => {
            console.log("resize");
            this.updateCanvasDimensions();
        });

        this.board = new Board();
        
        // init
        this.initialize();
    }

    private initialize = () => {
        let x = GLOBAL.COLUMNS / 2
        let y = 2 
        this.pointsForTetromino.push(new Point(x, y))
        this.pointsForTetromino.push(new Point(x - 1, y))
        this.pointsForTetromino.push(new Point(x + 1, y))
        this.pointsForTetromino.push(new Point(x, y + 1))
        this.tshapemino.points = this.pointsForTetromino;
    }

    private clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };

    /*
     * Resonsive canvas
     * calculate height and block size for canvas based on view width
     */
    private updateCanvasDimensions = () => {
        // ratio of canvas width to height
        const RATIO = 0.5;
        this.canvas.height =
            document.querySelector(".canvas-container")?.clientHeight!;
        this.canvas.width = this.canvas.height * RATIO;

        // calculate block size
        let gapArea = GLOBAL.COLUMNS + 1;
        this.blockSize =
            (this.canvas.width - gapArea * GLOBAL.GAP) / GLOBAL.COLUMNS;
    };

    private drawGrid = () => {
        for (let i = 0; i < GLOBAL.ROWS; i++) {
            for (let j = 0; j < GLOBAL.COLUMNS; j++) {
                let xpos = (this.blockSize + GLOBAL.GAP) * j + GLOBAL.GAP;
                let ypos = (this.blockSize + GLOBAL.GAP) * i + GLOBAL.GAP;
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(xpos, ypos, this.blockSize, this.blockSize);
            }
        }
    };

    private drawBlock = (point: Point, color: string) => {
        this.ctx.fillStyle = color;
        let x = GLOBAL.GAP * point.x + this.blockSize * (point.x - 1);
        let y = GLOBAL.GAP * point.y + this.blockSize * (point.y - 1);
        this.ctx.fillRect(x, y, this.blockSize, this.blockSize);
    };

    public update = () => {};

    public render = () => {
        this.drawGrid();
        this.tshapemino.draw(this.drawBlock);
    };

    // game loop
    public run = () => {
        this.clearCanvas();
        this.update();
        this.render();
        window.requestAnimationFrame(this.run);
    };
}
