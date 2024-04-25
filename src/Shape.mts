import { GLOBAL, Point } from "./Global.mjs";

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
    private moveTimer: number = 1000;
    private moveDownInterval;
    public isAtBottom: boolean =  false;

    constructor(colorArg: string = 'red') {
        this.color = colorArg
        this.points = [];

        this.moveDownInterval = setInterval(() => {
            this.move('down') 
        }, this.moveTimer)
    }

    public rotate(): void {}
    public drop(): void {}
    public move(direction: string): void {
        if (direction === 'down') {
            this.points.forEach(point => {
                point.y += 1;
            })
        }
    }

    public update = () => {
        this.points.forEach(point => {
            if (point.y >= GLOBAL.ROWS)
                clearInterval(this.moveDownInterval)
        })
    }

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
