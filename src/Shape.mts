import { ProgramUpdateLevel } from "../node_modules/typescript/lib/typescript";
import { GLOBAL, Point, canMove } from "./Global.mjs";

export class Shape {
    public points: Point[] = [];
    public color: string = "red";
    public hasLanded: boolean = false;
    public currentRotation: number = 1;
    public moveDownInterval: any;
    public moveTimer: number = 1000;
    public MAX_ROTATION: number = 0;

    constructor() {
        this.moveDownInterval = setInterval(() => {
            this.move("down");
        }, this.moveTimer);
    }

    public rotate(clockwise: boolean = true): void {}
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

export class IShape extends Shape {
    constructor(colorArg: string) {
        super();
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = colorArg;
        this.MAX_ROTATION = 2;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public rotate(clockwise: boolean = true): void {
        let x = this.points[0].x;
        let y = this.points[0].y;
        let newPointsArray: Point[] = [];
        this.currentRotation =
            this.currentRotation + 1 > this.MAX_ROTATION ? 1 : this.currentRotation + 1;
        switch (this.currentRotation) {
            case 1:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x - 2, y));
                newPointsArray.push(new Point(x + 1, y));
                break;

            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x, y - 2));
                newPointsArray.push(new Point(x, y + 1));
                break;

            default:
                break;
        }
        this.points = newPointsArray;
    }

    public drop(): void {}
}

export class OShape extends Shape {
    constructor(colorArg: string) {
        super();
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = colorArg;

        let x: number = this.points[0].x;
        let y: number = this.points[0].y;
        this.points.push(new Point(x, y));
        this.points.push(new Point(x - 1, y));
        this.points.push(new Point(x, y - 1));
        this.points.push(new Point(x - 1, y - 1));
    }

    public rotate(clockwise: boolean = true): void {}
    public drop(): void {}
}

export class JShape extends Shape {
    constructor(colorArg: string) {
        super();
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = colorArg;
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public rotate(clockwise: boolean = true): void {
        let x = this.points[0].x;
        let y = this.points[0].y;
        let newPointsArray: Point[] = [];
        this.currentRotation =
            this.currentRotation + 1 > this.MAX_ROTATION ? 1 : this.currentRotation + 1;
        switch (this.currentRotation) {
            case 1:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x, y - 2));
                break;
            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x, y + 2));
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
                newPointsArray.push(new Point(x - 2, y));
                newPointsArray.push(new Point(x, y + 1));
                break;
            default:
                break;
        }
        this.points = newPointsArray;
    }

    public drop(): void {}
}

export class LShape extends Shape {
    constructor(colorArg: string) {
        super();
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = colorArg;
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
    public rotate(clockwise: boolean = true): void {
        let x = this.points[0].x;
        let y = this.points[0].y;
        let newPointsArray: Point[] = [];
        this.currentRotation =
            this.currentRotation + 1 > this.MAX_ROTATION ? 1 : this.currentRotation + 1;
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
}

export class SShape extends Shape {
    constructor(colorArg: string) {
        super();
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = colorArg;
        this.MAX_ROTATION = 2;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public rotate(clockwise: boolean = true): void {
        let x = this.points[0].x;
        let y = this.points[0].y;
        let newPointsArray: Point[] = [];
        this.currentRotation =
            this.currentRotation + 1 > this.MAX_ROTATION ? 1 : this.currentRotation + 1;
        switch (this.currentRotation) {
            case 1:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x + 1, y - 1));
                break;

            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x - 1, y - 1));
                newPointsArray.push(new Point(x, y + 1));
                break;

            default:
                break;
        }
        this.points = newPointsArray;
    }

    public drop(): void {}
}

export class TShape extends Shape {
    constructor(colorArg: string) {
        super();
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = colorArg;
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public rotate(clockwise: boolean = true): void {
        let x = this.points[0].x;
        let y = this.points[0].y;
        let newPointsArray: Point[] = [];
        this.currentRotation =
            this.currentRotation + 1 > this.MAX_ROTATION ? 1 : this.currentRotation + 1;
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
}

export class ZShape extends Shape {
    public points: Point[];

    constructor(colorArg: string) {
        super();
        this.points = [];
    }

    public rotate(clockwise: boolean = true): void {}
    public drop(): void {}
}
