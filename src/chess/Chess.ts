import { Player, Point } from './interface'
import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from './pieces'
import { Board } from './Board'
import { comparePoints, enemyOf } from './utils'

export class Chess {
    public board: Board
    public currentPlayer: Player = 'white'
    public winner?: Player

    constructor() {
        this.board = new Board()
        this.board.data = [
            [new Rook(this.board, 'black'), new Knight(this.board, 'black'), new Bishop(this.board, 'black'), new Queen(this.board, 'black'), new King(this.board, 'black'), new Bishop(this.board, 'black'), new Knight(this.board, 'black'), new Rook(this.board, 'black')],
            [new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black')],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white')],
            [new Rook(this.board, 'white'), new Knight(this.board, 'white'), new Bishop(this.board, 'white'), new Queen(this.board, 'white'), new King(this.board, 'white'), new Bishop(this.board, 'white'), new Knight(this.board, 'white'), new Rook(this.board, 'white')],
        ]
    }

    public move(from: Point, to: Point): boolean {
        const piece = this.board.getItem(from)
        if (piece === null || !this.moveIsValid(piece, to)) return false

        this.handleCastling(piece, to)
        this.board.moveItem(from, to)
        piece.moved = true
        if (this.currentPlayerIsWinner()) {
            this.winner = this.currentPlayer
        } else {
            this.toggleCurrentPlayer()
        }
        return true
    }

    private moveIsValid(piece: Piece, to: Point) {
        return piece.color === this.currentPlayer && piece.canMove(to)
    }

    private handleCastling(piece: Piece, to: Point) {
        if (piece instanceof King) {
            const castlingMove = piece.castlingMoves().find(({ kingNewPosition }) => comparePoints(kingNewPosition, to))
            if (castlingMove) {
                this.board.moveItem(castlingMove.rook.position, castlingMove.rookNewPosition)
                castlingMove.rook.moved = true
            }
        }
    }

    private currentPlayerIsWinner() {
        return this.board.movesCount(enemyOf(this.currentPlayer)) === 0
    }

    private toggleCurrentPlayer() {
        this.currentPlayer = enemyOf(this.currentPlayer)
    }
}
