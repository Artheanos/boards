import { PieceType, Player, Point } from '../interface'
import { Board } from '../Board'
import { comparePoints } from '../utils'


export abstract class Piece {
    public board: Board
    public color: Player
    public type: PieceType
    public position: Point

    protected enemy: Player

    constructor(board: Board, color: Player, type?: PieceType) {
        this.board = board
        this.color = color
        this.type = type || this.constructor.name.toLowerCase() as PieceType

        this.position = [0, 0]
        this.enemy = this.color === 'white' ? 'black' : 'white'
    }

    canMove(to: Point): boolean {
        return this.movesWithoutCapture()
            .concat(this.movesWithCapture())
            .some(point => comparePoints(point, to))
    }

    movesWithoutCapture(): Point[] {
        return this.moves().filter(i => this.board.getItem(i) === null)
    }

    movesWithCapture(): Point[] {
        return this.moves().filter(i => this.board.getItem(i)?.color === this.enemy)
    }

    protected moves(): Point[] {
        return []
    }

    toString() {
        return `${this.color} ${this.type}`
    }
}
