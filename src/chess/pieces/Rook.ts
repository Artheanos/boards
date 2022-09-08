import { Point } from '../interface'
import { Piece } from './Piece'


export class Rook extends Piece {
    canMove(from: Point, to: Point): boolean {
        return false
    }
}
