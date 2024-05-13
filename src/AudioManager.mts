export namespace AudioManager {
    let TETRIS_MUSIC: any;
    let LINE_CLEAR: any;

    export function init() {
        TETRIS_MUSIC = new Audio("tetris-music.mp3");
        LINE_CLEAR = new Audio("line-clear.mp3");
        TETRIS_MUSIC.onload = () => {
            console.log('Tetris music loaded!')
        }
    }
    
    export function playTetrisMusic() {
        if (TETRIS_MUSIC)
            TETRIS_MUSIC.play();
    }

    export function playLineClear() {
        LINE_CLEAR.cloneNode(true).play(); 
    }
}