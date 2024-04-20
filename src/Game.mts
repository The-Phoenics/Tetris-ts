
export class Game {
    constructor() {}

    run = () => {
        window.requestAnimationFrame(this.run)
    }
}