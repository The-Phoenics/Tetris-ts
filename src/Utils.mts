import { Board } from "./Board.mjs";
import { GLOBAL } from "./Global.mjs";
import { IShape, JShape, LShape, OShape, SShape, Shape, TShape, ZShape } from "./Shape.mjs";

let prevRandomNum: number = -1;
export function randomTetromino(board: Board): Shape {
    let randNum: number = 0;
    while (randNum == prevRandomNum) {
        randNum = Math.floor(Math.random() * 7);
    }
    prevRandomNum = randNum;
    const shapesCharacters = "IOTJLSZ";
    let shape: Shape;
    switch (shapesCharacters[randNum]) {
        case "I":
            shape = new IShape(board);
            break;

        case "O":
            shape = new OShape(board);
            break;

        case "T":
            shape = new TShape(board);
            break;

        case "J":
            shape = new JShape(board);
            break;

        case "L":
            shape = new LShape(board);
            break;

        case "S":
            shape = new SShape(board);
            break;

        default:
            shape = new ZShape(board);
            break;
    }
    return shape;
}

let prevRandomIdx: number = -1;
export function randomColorString(): string {
    let randomIdx: number = 0;
    while (randomIdx == prevRandomIdx) {
        randomIdx = Math.floor(Math.random() * GLOBAL.COLORS.length);
    }
    prevRandomIdx = randomIdx;
    return GLOBAL.COLORS[randomIdx];
}
