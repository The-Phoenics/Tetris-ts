export class Board {
    public readonly ROWS: number = 20;
    public readonly COLUMNS: number = 10;

    public boardData: number[];

    constructor() {
        this.boardData = new Array(this.ROWS * this.COLUMNS).fill(0);
    }

    public update(): void {}
    public render(): void {}
}
