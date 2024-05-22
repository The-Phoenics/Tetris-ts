import { Board } from "./Board.mjs";
import { GLOBAL, Point } from "./Global.mjs";
import { Utils } from "./Utils.mjs";

export class Shape {
    public points: Point[] = [];
    public dropPoints: Point[] = [];
    public color: string = "red";
    public hasLanded: boolean = false;
    public currentRotation: number = 1;
    public moveDownTimeOut: any;
    public moveTime: number = 400;
    public MAX_ROTATION: number = 0;
    public gameOver: boolean = false;
    public moveDownTimerFlag: boolean = true;
    public id: string = "";
    private board: Board;

    constructor(board: Board) {
        this.board = board;
    }

    public rotate(clockwise: boolean = true): void {
        let rotation = getRotation(this);
        if (rotation.length != 0) {
            // previous position
            let prevPoints: Point[] = this.points.map((point) => new Point(point.x, point.y));
            this.points = rotation;

            // push tetromino back to right/left-most of the board
            this.wallKick();

            if (this.checkCollsion()) {
                this.points = prevPoints;
            }

            // update drop position as tetromino rotates
            this.updateDrop();
        }
    }

    public wallKick = () => {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].x <= 0) {
                // left side wallkick
                this.points.forEach((point) => {
                    point.x += 1;
                });
            } else if (this.points[i].x > GLOBAL.COLUMNS) {
                // right side wallkick
                this.points.forEach((point) => {
                    point.x -= 1;
                });
            }
        }
    };

    public updateDrop = () => {
        let tmpDropPos: Point[] = this.points.map((point) => new Point(point.x, point.y));
        while (!this.checkCollsionAt(tmpDropPos)) {
            tmpDropPos.forEach((point) => {
                point.y += 1;
            });
        }
        tmpDropPos.forEach((point) => {
            point.y -= 1;
        });
        this.dropPoints = tmpDropPos;
    };

    public drop(): void {
        this.points = this.dropPoints;
        this.moveDownTimerFlag = false;
        this.hasLanded = true;
    }

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
            // update the drop position as tetromino changes position
            this.updateDrop();
        }
    }

    public onLanding = () => {
        this.board.update(this);
        clearTimeout(this.moveDownTimeOut);
    };

    public render = (ctx: CanvasRenderingContext2D, blockSize: number) => {
        // draw where tetromino will draw
        this.dropPoints.forEach((point) => {
            Utils.drawColorBlockImg(point, GLOBAL.DROP_SHADOW_COLOR, ctx, blockSize);
        });
        // draw the tetromino
        this.points.forEach((point) => {
            Utils.drawColorBlockImg(point, this.color, ctx, blockSize);
        });
    }

    public update = () => {
        if (this.moveDownTimerFlag) {
            this.move("down");
            this.moveDownTimerFlag = false;
            this.moveDownTimeOut = setTimeout(() => {
                this.moveDownTimerFlag = true;
            }, this.moveTime);
        }
    };

    public isOutOfBoard = (point: Point): boolean => {
        let bool = point.x < 1 || point.y > GLOBAL.ROWS || point.x > GLOBAL.COLUMNS;
        return bool;
    };

    public checkCollsion = (): boolean => {
        for (let i = 0; i < this.points.length; i++) {
            if (this.isOutOfBoard(this.points[i]) || !this.board.isEmptyAt(this.points[i])) {
                return true;
            }
        }
        return false;
    };

    public checkGameOver = () => {
        for (let i = 0; i < this.points.length; i++) {
            if (this.points[i].y >= 1 && !this.board.isEmptyAt(this.points[i])) {
                console.log('game over')
                return true;
            }
        }
        return false;
    };

    public checkCollsionAt = (collisionPoints: Point[]): boolean => {
        let collided = false;
        for (let i = 0; i < collisionPoints.length; i++) {
            if (
                this.isOutOfBoard(collisionPoints[i]) ||
                !this.board.isEmptyAt(collisionPoints[i])
            ) {
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
        this.color = Utils.randomColorString();
        this.MAX_ROTATION = 3;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
}

export class OShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "O";
        this.color = Utils.randomColorString();
        let x: number = GLOBAL.INITIAL_POSITION.x;
        let y: number = GLOBAL.INITIAL_POSITION.y;
        let newPointsArray: Point[] = [];
        newPointsArray.push(new Point(x, y));
        newPointsArray.push(new Point(x - 1, y));
        newPointsArray.push(new Point(x, y - 1));
        newPointsArray.push(new Point(x - 1, y - 1));
        this.points = newPointsArray;
    }
}

export class JShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "J";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = Utils.randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
}

export class LShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "L";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = Utils.randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
}

export class SShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "S";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = Utils.randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
}

export class TShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "T";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = Utils.randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
}

export class ZShape extends Shape {
    constructor(board: Board) {
        super(board);
        this.id = "Z";
        this.points.push(GLOBAL.INITIAL_POSITION);
        this.color = Utils.randomColorString();
        this.MAX_ROTATION = 4;
        this.currentRotation = Math.floor(Math.random() * this.MAX_ROTATION + 1);
        this.rotate();
    }
}

function getRotation(shape: Shape, clockwise: boolean = true): Point[] {
    let id = shape.id;
    let x = shape.points[0].x;
    let y = shape.points[0].y;
    let newPointsArray: Point[] = [];
    shape.currentRotation =
        shape.currentRotation + 1 > shape.MAX_ROTATION ? 1 : shape.currentRotation + 1;

    switch (id) {
        case "I":
            switch (shape.currentRotation) {
                case 1:
                    x = x + 1;
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x - 2, y));
                    break;

                case 2:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x, y + 2));
                    break;

                case 3:
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x - 1, y - 1));
                    newPointsArray.push(new Point(x - 1, y + 1));
                    newPointsArray.push(new Point(x - 1, y + 2));
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
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x - 1, y - 1));
                    break;
                case 2:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x + 1, y - 1));
                    break;
                case 3:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x + 1, y + 1));
                    break;
                case 4:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x - 1, y + 1));
                    break;
                default:
                    break;
            }
            break;

        case "L":
            switch (shape.currentRotation) {
                case 1:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x + 1, y - 1));
                    break;
                case 2:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x + 1, y + 1));
                    break;
                case 3:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x - 1, y + 1));
                    break;
                case 4:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x - 1, y - 1));
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
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x + 1, y + 1));
                    break;

                case 3:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x - 1, y + 1));
                    break;

                case 4:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x - 1, y - 1));
                    newPointsArray.push(new Point(x - 1, y));
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
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x - 1, y - 1));
                    newPointsArray.push(new Point(x + 1, y));
                    break;

                case 2:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x + 1, y));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x + 1, y - 1));
                    break;

                case 3:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x, y + 1));
                    newPointsArray.push(new Point(x + 1, y + 1));
                    break;

                case 4:
                    newPointsArray.push(new Point(x, y));
                    newPointsArray.push(new Point(x, y - 1));
                    newPointsArray.push(new Point(x - 1, y));
                    newPointsArray.push(new Point(x - 1, y + 1));
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
