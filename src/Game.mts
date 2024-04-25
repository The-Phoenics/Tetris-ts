import { Board } from "./Board.mjs";
import { TShape } from "./Shape.mjs";
import { GLOBAL, GameContext, Point, randomColorString } from "./Global.mjs";

export class Game {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public canvas_width: number;
    public canvas_height: number;
    public board: Board;
    private blockSize: number;

    private tshapemino = new TShape(new Point(GLOBAL.COLUMNS / 2, 0), randomColorString());

    // constructor
    constructor(config: GameContext) {
        this.canvas = config.canvas;
        this.ctx = config.canvasContext;
        this.canvas_width = 0;
        this.canvas_height = 0;
        this.blockSize = 0;

        // Game Controls
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case "ArrowLeft":
                    this.tshapemino.move("left")
                    break;

                case "ArrowRight":
                    this.tshapemino.move("right")
                    break;

                case "ArrowDown":
                    this.tshapemino.move("down")
                    break;
            
                default:
                    break;
            }
        })

        // initalize canvas 
        this.updateCanvasDimensions();
        window.addEventListener("resize", () => {
            this.updateCanvasDimensions();
        });

        this.board = new Board();

        // init
        this.initialize();
    }

    private initialize = () => {}

    private clearCanvas = () => {
        this.ctx.fillStyle = 'white';
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

        if (this.canvas.height % 2 != 0)
            this.canvas.height = this.canvas.height - 1

        this.canvas.width = Math.floor(this.canvas.height * RATIO);

        // calculate block size
        let gapArea = GLOBAL.COLUMNS + 1;
        this.blockSize = (this.canvas.width - gapArea * GLOBAL.GAP) / GLOBAL.COLUMNS;
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

    public update = () => {
        this.tshapemino.update()
    };

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
