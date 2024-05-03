import { Game } from "./Game.mjs";

let gameHasStarted: boolean = false;

const CANVAS = document.querySelector(".game-canvas") as HTMLCanvasElement;
const CANVAS_CONTEXT = CANVAS.getContext("2d") as CanvasRenderingContext2D;

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
