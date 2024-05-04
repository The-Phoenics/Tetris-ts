import { Board } from "./Board.mjs";
import { GLOBAL, Point, randomColorString, randomTetromino } from "./Global.mjs";

export class Shape {
    public points: Point[] = [];
    public color: string = "red";
    public hasLanded: boolean = false;
    public currentRotation: number = 1;
    public moveDownTimeOut: any;
    public moveTimer: number = 400;
    public MAX_ROTATION: number = 0;
    public gameOver: boolean = false;
    public canMoveDown: boolean = true;
    public id: string = "";
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    public rotate(clockwise: boolean = true): void {
        let rotation = getRotation(this);
        if (rotation.length != 0) {
            // ... after rotation

            this.points = rotation;
        }
    }

    public drop(): void {}

    public move(direction: string): void {
        let prevPoints: Point[];
        if (!this.hasLanded) {
            prevPoints = this.points.map((point) => new Point(point.x, point.y));
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

            if (this.checkCollsion()) {
                if (direction == "down") {
                    this.hasLanded = true;
                }
                this.points = prevPoints;
            }
        }
    }

    public onLanding = () => {
        this.board.update(this);
        console.log(`Tetromino has landed.`);
        clearTimeout(this.moveDownTimeOut);
    };

    public render(drawBlock: (point: Point, color: string) => void) {
        this.points.forEach((point) => {
            drawBlock(point, this.color);
        });
    }

    public update = () => {
        if (this.canMoveDown) {
            this.move("down");
            this.canMoveDown = false;
            this.moveDownTimeOut = setTimeout(() => {
                this.canMoveDown = true;
            }, this.moveTimer);
        }
    };

    public isOutOfBoard = (point: Point): boolean => {
        let bool = point.x < 1 || point.y > GLOBAL.ROWS || point.x > GLOBAL.COLUMNS;
        return bool;
    };

    public checkCollsion = (): boolean => {
        let collided = false;
        for (let i = 0; i < this.points.length; i++) {
            if (this.isOutOfBoard(this.points[i]) || !this.board.isEmptyAt(this.points[i])) {
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
        this.id = "I";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
        this.MAX_ROTATION = 2;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public drop(): void {}
}

export class OShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "O";
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
        this.id = "J";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public drop(): void {}
}

export class LShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "L";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public drop(): void {}
}

export class SShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "S";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
        this.MAX_ROTATION = 2;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public drop(): void {}
}

export class TShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "T";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public drop(): void {}
}

export class ZShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "Z";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = randomColorString();
        this.MAX_ROTATION = 2;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }

    public drop(): void {}
}

function getRotation(shape: Shape, clockwise: boolean = true): Point[] {
    let id = shape.id;
    let x = shape.points[0].x;
    let y = shape.points[0].y;
    let newPointsArray: Point[] = [];
    shape.currentRotation = shape.currentRotation + 1 > shape.MAX_ROTATION ? 1 : shape.currentRotation + 1;

    switch (id) {
        case "I":
            switch (shape.currentRotation) {
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
            break;

        case "O":
            break;

        case "T":
            switch (shape.currentRotation) {
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
            break;

        case "J":
            switch (shape.currentRotation) {
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
            break;

        case "L":
            switch (shape.currentRotation) {
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
            break;

        case "S":
            switch (shape.currentRotation) {
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
            break;

        case "Z":
            switch (shape.currentRotation) {
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
            break;

        default:
            break;
    }
    return newPointsArray;
}
