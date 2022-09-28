import { Point } from '../interface'
import { Piece } from './Piece'


export class Rook extends Piece {
    static straightDirections: Point[] = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0],
    ]

    moves(): Point[] {
        return this.board.directionalIterator(this.position, Rook.straightDirections)
    }
}
