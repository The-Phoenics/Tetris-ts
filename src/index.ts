import { Game } from "./Game.mjs";

let gameHasStarted: boolean = false;

const startBtn = document.querySelector('.start-btn');
startBtn?.addEventListener('click', () => {
    Init();
    RunGame();
});

function Init(): void {
    gameHasStarted = true;
    console.log(`Gmae Initialized.`)
}

function RunGame(): void {
    console.log(`Gmae Running!`)
    let game = new Game();
    game.run();
}