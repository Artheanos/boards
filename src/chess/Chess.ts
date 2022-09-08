import { Player, Point } from './interface'
import { Bishop, King, Knight, Pawn, Piece, Queen, Rook } from './pieces'
import { Board } from './Board'

export class Chess {
    public board: Board
    public currentPlayer: Player = 'white'

    constructor() {
        this.board = new Board()
        this.board.data = [
            [new Rook(this.board, 'black'), new Knight(this.board, 'black'), new Bishop(this.board, 'black'), new King(this.board, 'black'), new Queen(this.board, 'black'), new Bishop(this.board, 'black'), new Knight(this.board, 'black'), new Rook(this.board, 'black')],
            [new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black'), new Pawn(this.board, 'black')],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white'), new Pawn(this.board, 'white')],
            [new Rook(this.board, 'white'), new Knight(this.board, 'white'), new Bishop(this.board, 'white'), new King(this.board, 'white'), new Queen(this.board, 'white'), new Bishop(this.board, 'white'), new Knight(this.board, 'white'), new Rook(this.board, 'white')],
        ]
    }

    public move(from: Point, to: Point): boolean {
        const piece = this.board.getItem(from)
        if (piece === null) return false

        if (piece.canMove(from, to)) {
            this.board.moveItem(from, to)
            this.toggleCurrentPlayer()
            return true
        }

        return false
    }

    private toggleCurrentPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white'
    }
}