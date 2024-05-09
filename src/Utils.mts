import { Board } from "./Board.mjs";
import { GLOBAL } from "./Global.mjs";
import { IShape, JShape, LShape, OShape, SShape, Shape, TShape, ZShape } from "./Shape.mjs";

export function randomTetromino(board: Board): Shape {
    const randNum = Math.floor(Math.random() * 7);
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

export function randomColorString(): string {
    let randomIdx = Math.floor(Math.random() * GLOBAL.COLORS.length);
    return GLOBAL.COLORS[randomIdx];
}