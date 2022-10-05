import { Point } from '../interface'
import { Piece } from './Piece'
import { Bishop } from './Bishop'
import { Rook } from './Rook'


export class Queen extends Piece {
    protected _moves(): Point[] {
        return this.board.directionalIterator(this.position, Bishop.diagonalDirections.concat(Rook.straightDirections))
    }
}
