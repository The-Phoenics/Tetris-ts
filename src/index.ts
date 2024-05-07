import { Game } from "./Game.mjs";
import { GLOBAL } from "./Global.mjs";

let gameHasStarted: boolean = false;

const CANVAS = document.querySelector(".game-canvas") as HTMLCanvasElement;
const CANVAS_CONTEXT = CANVAS.getContext("2d") as CanvasRenderingContext2D;

window.onload = () => {
    GLOBAL.BLOCK_IMG  = new Image();
    GLOBAL.BLOCK_IMG.src = './block.jpg';
    GLOBAL.BLOCK_IMG.onload = () => {
        console.log(`Image loaded!`)
    }
}

RunGame();

function Init(): void {
    gameHasStarted = true;
}

function RunGame(): void {
    let game = new Game({
        canvas: CANVAS,
        canvasContext: CANVAS_CONTEXT,
    });
    // game loop
    game.run();
}
