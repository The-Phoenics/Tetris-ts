import { GLOBAL, Point, canMove } from "./Global.mjs";

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
    private initalPosition: Point;
    public points: Point[];
    private color: string;
    private moveTimer: number = 1000;
    private moveDownInterval;
    public isAtBottom: boolean = false;
    public currentRotation: number = 1;

    constructor(initPos: Point, colorArg: string = "red") {
        this.initalPosition = initPos;
        this.color = colorArg;
        this.currentRotation = Math.floor(Math.random() * 4 + 1);
        this.points = this.rotate();

        this.moveDownInterval = setInterval(() => {
            this.move("down");
        }, this.moveTimer);
    }

    public rotate(clockwise: boolean = true): Point[] {
        let x = this.initalPosition.x;
        let y = this.initalPosition.y;
        let newPointsArray: Point[] = [];
        let rotation: number =
            this.currentRotation + 1 > 4 ? 1 : this.currentRotation + 1;
        switch (rotation) {
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
        return newPointsArray;
    }

    public drop(): void {}

    public move(direction: string): void {
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

    public update = () => {
        this.points.forEach((point) => {
            if (point.y >= GLOBAL.ROWS) clearInterval(this.moveDownInterval);
        });
    };

    public draw(drawBlock: (point: Point, color: string) => void) {
        this.points.forEach((point) => {
            drawBlock(point, this.color);
        });
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
