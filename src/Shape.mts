import { Point } from "./Types.mjs";

export class Straight {
    public points: Point[];

    constructor() {
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}

export class SquareShape {
    public points: Point[];

    constructor() {
        this.points = [];
    }

    public drop(): void {}
    public move(): void {}
}

export class TShape {
    public points: Point[];
    private color: string;

    constructor(colorArg: string = 'red') {
        this.color = colorArg
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}

    public draw(drawBlock: (point: Point, color: string) => void) {
        this.points.forEach(point => {
            drawBlock(point, this.color)
        })
    }
}

export class SkewShape {
    public points: Point[];

    constructor() {
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}
