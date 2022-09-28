import { Chess } from 'chess'
import { Knight } from '../../src/chess/pieces'
import { point } from '../../src/chess/utils'

describe('Chess', () => {
    let chess: Chess

    beforeEach(() => {
        chess = new Chess()
    })

    it('generates board', () => {
        expect(chess.board.data.map(row => row.map(piece => piece?.type || null))).toEqual([
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        ])
    })

    it('returns false when trying to move a null', () => {
        const piece = chess.board.getItem(point('a7'))
        const moveResult = chess.move(point('a6'), point('a7'))
        expect(moveResult).toBe(false)
        expect(chess.board.getItem(point('a7'))).toBe(piece)
    })

    describe('pawn', () => {
        beforeEach(() => {
            chess.currentPlayer = 'black'
        })

        describe('moving', () => {
            it('can move 1 tile forwards if there is no piece in front of it', () => {
                const actionPiece = chess.board.getItem(point('a7'))
                const moveResult = chess.move(point('a7'), point('a6'))

                expect(moveResult).toBe(true)
                expect(chess.board.getItem(point('a7'))).toBe(null)
                expect(chess.board.getItem(point('a6'))).toBe(actionPiece)
            })

            it('can move 2 tiles forwards if has not been moved', () => {
                const actionPiece = chess.board.getItem(point('a7'))
                const moveResult = chess.move(point('a7'), point('a5'))

                expect(moveResult).toBe(true)
                expect(chess.board.getItem(point('a7'))).toBe(null)
                expect(chess.board.getItem(point('a5'))).toBe(actionPiece)
            })

            it('cannot move 1 tile forwards if there is a piece in front of it', () => {
                const obstructingPiece = new Knight(chess.board, 'black')
                chess.board.setItem(point('a6'), obstructingPiece)

                const actionPiece = chess.board.getItem(point('a7'))
                const moveResult = chess.move(point('a7'), point('a6'))

                expect(moveResult).toBe(false)
                expect(chess.board.getItem(point('a7'))).toBe(actionPiece)
                expect(chess.board.getItem(point('a6'))).toBe(obstructingPiece)
            })

            it('cannot move 2 tiles forwards if has not been moved and there is a piece in front of it', () => {
                const obstructingPiece = new Knight(chess.board, 'black')
                chess.board.setItem(point('a6'), obstructingPiece)

                const actionPiece = chess.board.getItem(point('a7'))
                const moveResult = chess.move(point('a7'), point('a5'))

                expect(moveResult).toBe(false)
                expect(chess.board.getItem(point('a7'))).toBe(actionPiece)
                expect(chess.board.getItem(point('a6'))).toBe(obstructingPiece)
                expect(chess.board.getItem(point('a5'))).toBe(null)
            })

            it('cannot move 2 tiles forwards if has been moved', () => {
                const actionPiece = chess.board.getItem(point('a7'))
                chess.move(point('a7'), point('a6'))
                const moveResult = chess.move(point('a6'), point('a4'))

                expect(moveResult).toBe(false)
                expect(chess.board.getItem(point('a7'))).toBe(null)
                expect(chess.board.getItem(point('a6'))).toBe(actionPiece)
                expect(chess.board.getItem(point('a5'))).toBe(null)
            })

            it('cannot move diagonally', () => {
                const actionPiece = chess.board.getItem(point('a7'))
                const moveResult = chess.move(point('a7'), point('b6'))

                expect(moveResult).toBe(false)
                expect(chess.board.getItem(point('a7'))).toBe(actionPiece)
                expect(chess.board.getItem(point('b6'))).toBe(null)
            })

            it('cannot move if it would expose the king', () => {
                chess.board.moveItem(point('c1'), point('a4'))
                const moveResult = chess.move(point('d7'), point('d6'))
                expect(moveResult).toBe(false)
            })
        })

        describe('capturing', () => {
            describe('when there is a piece diagonally 1 tile away from and in front of the pawn', () => {
                it('captures a piece when it is white', () => {
                    chess.board.setItem(point('b6'), new Knight(chess.board, 'white'))

                    const actionPiece = chess.board.getItem(point('a7'))
                    const moveResult = chess.move(point('a7'), point('b6'))

                    expect(moveResult).toBe(true)
                    expect(chess.board.getItem(point('a7'))).toBe(null)
                    expect(chess.board.getItem(point('b6'))).toBe(actionPiece)
                })

                it('does not capture a piece when it is black', () => {
                    const targetPiece = new Knight(chess.board, 'black')
                    chess.board.setItem(point('b6'), targetPiece)

                    const actionPiece = chess.board.getItem(point('a7'))
                    const moveResult = chess.move(point('a7'), point('b6'))

                    expect(moveResult).toBe(false)
                    expect(chess.board.getItem(point('a7'))).toBe(actionPiece)
                    expect(chess.board.getItem(point('b6'))).toBe(targetPiece)
                })
            })
        })
    })

    it('game', () => {
        expect(chess.move(point('a7'), point('a5'))).toBe(false)
        expect(chess.move(point('a2'), point('a4'))).toBe(true)
        expect(chess.move(point('b7'), point('b5'))).toBe(true)
        expect(chess.move(point('a4'), point('b5'))).toBe(true)
        expect(chess.move(point('h7'), point('h5'))).toBe(true)
        expect(chess.move(point('e2'), point('e3'))).toBe(true)
        expect(chess.move(point('f1'), point('a6'))).toBe(false)
        expect(chess.move(point('b8'), point('a6'))).toBe(true)
        expect(chess.move(point('b5'), point('b6'))).toBe(true)
        expect(chess.move(point('c7'), point('b6'))).toBe(true)
        expect(chess.move(point('f1'), point('a6'))).toBe(true)
    })
})
