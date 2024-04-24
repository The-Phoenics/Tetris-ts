import { GLOBAL } from "./Types.mjs";

export class Board {
    public boardData: number[];

    constructor() {
        this.boardData = new Array(GLOBAL.ROWS * GLOBAL.COLUMNS).fill(0);
    }

    public update(): void {}
    public render(): void {}
}
