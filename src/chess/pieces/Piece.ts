import { PieceType, Player, Point } from '../interface'
import { Board } from '../Board'
import { comparePoints, enemyOf } from '../utils'
import { King } from './King'


export abstract class Piece {
    public board: Board
    public color: Player
    public type: PieceType
    public position: Point
    public moved: boolean

    protected enemy: Player

    constructor(board: Board, color: Player, type?: PieceType) {
        this.board = board
        this.color = color
        this.type = type || this.constructor.name.toLowerCase() as PieceType

        this.position = [0, 0]
        this.enemy = enemyOf(this.color)
        this.moved = false
    }

    canMove(to: Point): boolean {
        return this.moves().some(point => comparePoints(point, to))
    }

    moves(): Point[] {
        return this.movesWithoutCapture().concat(this.movesWithCapture())
    }

    movesWithoutCapture(): Point[] {
        return this._movesWithoutCapture().filter(point => !this.exposesKing(point))
    }

    movesWithCapture(): Point[] {
        return this._movesWithCapture().filter(point => !this.exposesKing(point))
    }

    _movesWithoutCapture(): Point[] {
        return this._moves().filter(point => this.board.getItem(point) === null)
    }

    _movesWithCapture(): Point[] {
        return this._moves().filter(point => this.board.getItem(point)?.color === this.enemy)
    }

    protected _moves(): Point[] {
        return []
    }

    protected exposesKing(targetPosition: Point): boolean {
        let result = true
        const thisPosition = this.position
        const targetPiece = this.board.getItem(targetPosition)
        this.board.setItem(thisPosition, targetPiece)
        this.board.setItem(targetPosition, this)

        for (const piece of this.board.pieces(this.color)) {
            if (piece.constructor.name !== 'King') continue

            result = (piece as any).canBeCaptured()
            this.board.setItem(thisPosition, this)
            this.board.setItem(targetPosition, targetPiece)
            break
        }

        return result
    }

    toString() {
        return `${this.color} ${this.type}`
    }
}
