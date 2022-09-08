import { PieceType, Player, Point } from '../interface'
import { Board } from '../Board'
import { comparePoints } from '../utils'


export abstract class Piece {
    public board: Board
    public color: Player
    public type: PieceType

    protected enemy: Player

    constructor(board: Board, color: Player, type?: PieceType) {
        this.board = board
        this.color = color
        this.type = type || this.constructor.name.toLowerCase() as PieceType

        this.enemy = this.color === 'white' ? 'black' : 'white'
    }

    canMove(from: Point, to: Point): boolean {
        return this.movesWithoutCapture(from, to)
            .concat(this.movesWithCapture(from, to))
            .some(point => comparePoints(point, to))
    }

    movesWithoutCapture(from: Point, to: Point): Point[] { return [] }

    movesWithCapture(from: Point, to: Point): Point[] { return [] }

    toString() {
        return `${this.color} ${this.type}`
    }
}
