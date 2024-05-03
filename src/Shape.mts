import { Board } from "./Board.mjs";
import { GLOBAL, Point, randomColorString } from "./Global.mjs";

export class Shape {
    public points: Point[] = [];
    public color: string = "red";
    public hasLanded: boolean = false;
    public currentRotation: number = 1;
    public moveDownInterval: any;
    public moveTimer: number = 400;
    public MAX_ROTATION: number = 0;
    private board: Board;

    constructor(board: Board) {
        // reference to the game board
        this.board = board;
        this.moveDownInterval = setInterval(() => {
            this.move("down");
        }, this.moveTimer);
    }

    public rotate(clockwise: boolean = true): void {}
    public drop(): void {}
    public move(direction: string): void {
        const prevPoints: Point[] = Array.from(this.points);
        if (!this.hasLanded) {
            switch (direction) {
                case "down":
                    this.points.forEach((point) => {
                        point.y += 1;
                    });
                    break;

                case "left":
                    this.points.forEach((point) => {
                        point.x -= 1;
                    });
                    break;

                case "right":
                    this.points.forEach((point) => {
                        point.x += 1;
                    });
                    break;

                default:
                    break;
            }
        }

        if (this.checkCollsion()) {
            if (direction == "down") {
                this.hasLanded = true;
            }

            // reset the position to previous points(position)
            this.points = prevPoints;
        }
    }

    public onLanding = () => {
        this.board.update(this);
        console.log(`Tetromino has landed.`);
        clearInterval(this.moveDownInterval);
    };

    public render(drawBlock: (point: Point, color: string) => void) {
        this.points.forEach((point) => {
            drawBlock(point, this.color);
        });
    }

    public checkCollsion = (): boolean => {
        let collided = false;
        for (let i = 0; i < this.points.length; i++) {
            if (!this.board.isEmptyAt(this.points[i])) {
                collided = true;
                break;
            }
        }
        return collided;
    };
}

export class IShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
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
    constructor(board: Board) {
        super(board);
        this.color = randomColorString();
        let x: number = GLOBAL.INITIAL_POSITION.x;
        let y: number = GLOBAL.INITIAL_POSITION.y;
        let newPointsArray: Point[] = [];
        newPointsArray.push(new Point(x, y));
        newPointsArray.push(new Point(x - 1, y));
        newPointsArray.push(new Point(x, y - 1));
        newPointsArray.push(new Point(x - 1, y - 1));
        this.points = newPointsArray;
    }

    public drop(): void {}
}

export class JShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
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
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x - 1, y + 1));
                break;
            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x + 2, y));
                break;
            case 3:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x + 1, y - 1));
                break;
            case 4:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x + 1, y + 1));
                break;
            default:
                break;
        }
        this.points = newPointsArray;
    }

    public drop(): void {}
}

export class LShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
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
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x + 1, y + 1));
                break;
            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x - 1, y + 1));
                break;
            case 3:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x, y + 1));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x - 1, y - 1));
                break;
            case 4:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x + 1, y - 1));
                break;
            default:
                break;
        }
        this.points = newPointsArray;
    }
    public drop(): void {}
}

export class SShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
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
    constructor(board: Board) {
        super(board);
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
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
    constructor(board: Board) {
        super(board);
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
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
                newPointsArray.push(new Point(x + 1, y));
                newPointsArray.push(new Point(x, y - 1));
                newPointsArray.push(new Point(x - 1, y - 1));
                break;

            case 2:
                newPointsArray.push(new Point(x, y));
                newPointsArray.push(new Point(x - 1, y));
                newPointsArray.push(new Point(x - 1, y + 1));
                newPointsArray.push(new Point(x, y - 1));
                break;

            default:
                break;
        }
        this.points = newPointsArray;
    }

    public drop(): void {}
}
