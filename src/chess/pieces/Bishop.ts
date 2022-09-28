import { Point } from '../interface'
import { Piece } from './Piece'


export class Bishop extends Piece {
    static diagonalDirections: Point[] = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ]

    moves(): Point[] {
        return this.board.directionalIterator(this.position, Bishop.diagonalDirections)
    }
}
