import { GameContext } from "./Types";

const ROWS = 20;
const COLUMNS = 10;

// gap between blocks in board
const GAP = 2;

export class Game {
    public ctx: CanvasRenderingContext2D;
    public canvas: HTMLCanvasElement;
    public canvas_width: number; 
    public canvas_height: number;

    private blockSize: number;

    // constructor
    constructor(config: GameContext) {
        this.canvas = config.canvas;
        this.ctx = config.canvasContext;
        this.canvas_width = 0;
        this.canvas_height = 0;
        this.blockSize = 0;

        this.updateCanvasDimensions();
        window.addEventListener('resize', () => {
            console.log('resize')
            this.updateCanvasDimensions();
        })
    }

    private clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /*
    * Resonsive canvas
    * calculate height and block size for canvas based on view width
    */
    private updateCanvasDimensions = () => {
        // ratio of canvas width to height
        const RATIO = 0.5;
        this.canvas.height = document.querySelector('.canvas-container')?.clientHeight!;
        this.canvas.width = this.canvas.height * RATIO

        // calculate block size
        let gapArea = COLUMNS + 1;
        this.blockSize = (this.canvas.width - gapArea * GAP) / COLUMNS;
    }
 
    private drawGrid = () => {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                let xpos = (this.blockSize + GAP) * j + GAP;
                let ypos = (this.blockSize + GAP) * i + GAP
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(xpos, ypos, this.blockSize, this.blockSize);
            }
        }
    }

    public update = () => {}

    public render = () => {
        this.drawGrid();
    }

    // game loop
    public run = () => {
        this.clearCanvas();
        this.update();
        this.render();
        window.requestAnimationFrame(this.run)
    }
}