import { Point } from "./Types";

export class Straight {
    private points: Point[];

    constructor() {
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}

export class SquareShape {
    private points: Point[];

    constructor() {
        this.points = [];
    }

    public drop(): void {}
    public move(): void {}
}

export class TShape {
    private points: Point[];

    constructor() {
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}

export class SkewShape {
    private points: Point[];

    constructor() {
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}
