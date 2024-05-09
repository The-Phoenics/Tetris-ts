import { Game } from "./Game.mjs";

class GameManager {
    public gameOver: boolean = true;
    public assetsLoaded: boolean = false;

    public startBtn: HTMLButtonElement;
    private game: any;
    private CANVAS = document.querySelector(".game-canvas") as HTMLCanvasElement;
    private CANVAS_CONTEXT = this.CANVAS.getContext("2d") as CanvasRenderingContext2D;

    constructor() {
        this.init();
        this.startBtn = document.querySelector('.start-btn') as HTMLButtonElement;
        this.startBtn.onclick = this.onGameStart;
    }

    public init = () => {
        this.game = new Game({
            canvas: this.CANVAS,
            canvasContext: this.CANVAS_CONTEXT,
        });
    }

    public onGameStart = () => {
        console.log(`Game started.`)
        this.gameOver = false;
        this.startBtn.style.visibility = 'hidden';
    }

    public onGameOver = () => {
        console.log(`Game Over!`)
        this.startBtn.style.visibility = 'visible';
    }

    public run = () => {
        if (!this.gameOver && this.assetsLoaded) {
            this.game.update();
            this.game.render();
        } else {

            this.game.render();
        }
    }
    
}

export default GameManager;