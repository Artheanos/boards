import { Point } from '../interface'
import { Piece } from './Piece'
import { Bishop } from './Bishop'
import { Rook } from './Rook'


export class King extends Piece {
    protected moves(): Point[] {
        const directions = Bishop.diagonalDirections.concat(Rook.straightDirections)
        return this.board.iterator(this.position, directions, 1)
    }
}
