import { GameContext } from "./Types";

const GAP = 2;
const ROWS = 20;
const COLUMNS = 10;

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
        this.canvas_width = 400;
        this.canvas_height = 600;
        this.blockSize = 0;

        this.updateCanvasDimensions();
        window.addEventListener('resize', () => {
            console.log('resize')
            this.updateCanvasDimensions();
        })
    }

    clearCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // calculate height and block size for canvas based on view width
    updateCanvasDimensions = () => {
        this.calculateSize();
        this.calcHeight();
    }

    calcHeight = (): void => {
        let gapArea = (ROWS + 1) * GAP;
        let columnBlockArea = ROWS * this.blockSize;
        this.canvas.height = gapArea + columnBlockArea
    }

    calculateSize = (): void => {
        let gapArea = COLUMNS + 1;
        this.blockSize = (this.canvas.width - gapArea * GAP) / COLUMNS;
    }
 
    drawGrid = () => {
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                let xpos = (this.blockSize + GAP) * j + GAP;
                let ypos = (this.blockSize + GAP) * i + GAP
                this.ctx.fillStyle = "black";
                this.ctx.fillRect(xpos, ypos, this.blockSize, this.blockSize);
            }
        }
    }

    update = () => {}

    render = () => {
        this.drawGrid();
    }

    // game loop
    run = () => {
        this.clearCanvas();
        this.update();
        this.render();
        window.requestAnimationFrame(this.run)
    }
}