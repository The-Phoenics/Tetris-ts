import { GLOBAL } from "./Global.mjs";
import GameManager from "./GameManager.mjs";
import { AudioManager } from "./AudioManager.mjs";

window.onload = () => {
    GLOBAL.BLOCK_IMG = new Image();
    GLOBAL.BLOCK_IMG.src = "./block.jpg";
    GLOBAL.BLOCK_IMG.onload = () => {
        gm.assetsLoaded = true;
    };
    AudioManager.init();
};

const gm: GameManager = new GameManager();
AudioManager.playTetrisMusic();

(function main() {
    gm.run();
    window.requestAnimationFrame(main);
})();
