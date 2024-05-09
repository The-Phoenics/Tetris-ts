import { GLOBAL } from "./Global.mjs";
import GameManager from "./GameManager.mjs";

window.onload = () => {
    GLOBAL.BLOCK_IMG = new Image();
    GLOBAL.BLOCK_IMG.src = "./block.jpg";
    GLOBAL.BLOCK_IMG.onload = () => {
        gm.assetsLoaded = true;
    };
};

const gm: GameManager = new GameManager();

(function main() {
    gm.run();
    window.requestAnimationFrame(main);
})();
