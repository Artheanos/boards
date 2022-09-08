import { Point } from '../interface'
import { Piece } from './Piece'


export class Queen extends Piece {
    canMove(from: Point, to: Point): boolean {
        return false
    }
}
