import { GLOBAL, Point, canMove } from "./Global.mjs";

export class Shape {
    public points: Point[] = [];
    public color: string = "red";

    public rotate(): void {}
    public drop(): void {}
    public move(direction: string): void {}
}

export class Straight extends Shape {
    public points: Point[];

    constructor() {
        super();
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}

export class SquareShape extends Shape {
    public points: Point[];

    constructor() {
        super();
        this.points = [];
    }

    public drop(): void {}
    public move(): void {}
}

export class TShape extends Shape {
    public points: Point[] = [];
    public color: string;
    private moveTimer: number = 1000;
    private moveDownInterval;
    public hasLanded: boolean = false;
    public currentRotation: number = 1;

    constructor(initPos: Point, colorArg: string = "red") {
        super();
        this.points.push(initPos);
        this.color = colorArg;
        this.currentRotation = Math.floor(Math.random() * 4 + 1);
        this.rotate();

        this.moveDownInterval = setInterval(() => {
            this.move("down");
        }, this.moveTimer);
    }

    public rotate(clockwise: boolean = true): void {
        let x = this.points[0].x;
        let y = this.points[0].y;
        let newPointsArray: Point[] = [];
        this.currentRotation = this.currentRotation + 1 > 4 ? 1 : this.currentRotation + 1;
        switch (this.currentRotation) {
            case 1:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x, y - 1));
                break;

            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x, y - 1));
                break;

            case 3:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x, y - 1));
                break;

            case 4:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x, y + 1));
                break;

            default:
                break;
        }
        this.points = newPointsArray;
    }

    public drop(): void {}

    public move(direction: string): void {
        if (!this.hasLanded) {
            switch (direction) {
                case "down":
                    if (canMove(direction, this.points)) {
                        this.points.forEach((point) => {
                            point.y += 1;
                        });
                    }
                    break;

                case "left":
                    if (canMove(direction, this.points)) {
                        this.points.forEach((point) => {
                            point.x -= 1;
                        });
                    }
                    break;

                case "right":
                    if (canMove(direction, this.points)) {
                        this.points.forEach((point) => {
                            point.x += 1;
                        });
                    }
                    break;

                default:
                    break;
            }
        }
    }

    public update = () => {
        this.points.forEach((point) => {
            if (point.y >= GLOBAL.ROWS) {
                clearInterval(this.moveDownInterval);
                this.hasLanded = true;
            }
        });
    };

    public render(drawBlock: (point: Point, color: string) => void) {
        this.points.forEach((point) => {
            drawBlock(point, this.color);
        });
    }
}

export class SkewShape extends Shape {
    public points: Point[];

    constructor() {
        super();
        this.points = [];
    }

    public rotate(): void {}
    public drop(): void {}
    public move(): void {}
}
