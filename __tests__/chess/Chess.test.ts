import { Chess } from 'chess'
import { Knight } from '../../src/chess/pieces'

describe('Chess', () => {
    let chess: Chess

    beforeEach(() => {
        chess = new Chess()
    })

    it('generates board', () => {
        expect(chess.board.data.map(row => row.map(piece => piece?.type || null))).toEqual([
            ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'],
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
            ['rook', 'knight', 'bishop', 'king', 'queen', 'bishop', 'knight', 'rook'],
        ])
    })

    it('returns false when trying to move a null', () => {
        const piece = chess.board.getItem([1, 0])
        const moveResult = chess.move([2, 0], [1, 0])
        expect(moveResult).toBe(false)
        expect(chess.board.getItem([1, 0])).toBe(piece)
    })

    describe('pawn', () => {
        describe('moving', () => {
            it('can move 1 tile forwards if there is no piece in front of it', () => {
                const actionPiece = chess.board.getItem([1, 0])
                const moveResult = chess.move([1, 0], [2, 0]) && chess.move([2, 0], [3, 0])

                expect(moveResult).toBe(true)
                expect(chess.board.getItem([1, 0])).toBe(null)
                expect(chess.board.getItem([2, 0])).toBe(null)
                expect(chess.board.getItem([3, 0])).toBe(actionPiece)
            })

            it('can move 2 tiles forwards if has not been moved', () => {
                const actionPiece = chess.board.getItem([1, 0])
                const moveResult = chess.move([1, 0], [3, 0])

                expect(moveResult).toBe(true)
                expect(chess.board.getItem([1, 0])).toBe(null)
                expect(chess.board.getItem([3, 0])).toBe(actionPiece)
            })

            it('cannot move 1 tile forwards if there is a piece in front of it', () => {
                const obstructingPiece = new Knight(chess.board, 'black')
                chess.board.setItem([2, 0], obstructingPiece)

                const actionPiece = chess.board.getItem([1, 0])
                const moveResult = chess.move([1, 0], [2, 0])

                expect(moveResult).toBe(false)
                expect(chess.board.getItem([1, 0])).toBe(actionPiece)
                expect(chess.board.getItem([2, 0])).toBe(obstructingPiece)
            })

            it('cannot move 2 tiles forwards if has not been moved and there is a piece in front of it', () => {
                const obstructingPiece = new Knight(chess.board, 'black')
                chess.board.setItem([2, 0], obstructingPiece)

                const actionPiece = chess.board.getItem([1, 0])
                const moveResult = chess.move([1, 0], [3, 0])

                expect(moveResult).toBe(false)
                expect(chess.board.getItem([1, 0])).toBe(actionPiece)
                expect(chess.board.getItem([2, 0])).toBe(obstructingPiece)
                expect(chess.board.getItem([3, 0])).toBe(null)
            })

            it('cannot move 2 tiles forwards if has been moved', () => {
                const actionPiece = chess.board.getItem([1, 0])
                chess.move([1, 0], [2, 0])
                const moveResult = chess.move([2, 0], [4, 0])

                expect(moveResult).toBe(false)
                expect(chess.board.getItem([1, 0])).toBe(null)
                expect(chess.board.getItem([2, 0])).toBe(actionPiece)
                expect(chess.board.getItem([3, 0])).toBe(null)
            })

            it('cannot move diagonally', () => {
                const actionPiece = chess.board.getItem([1, 0])
                const moveResult = chess.move([1, 0], [2, 1])

                expect(moveResult).toBe(false)
                expect(chess.board.getItem([1, 0])).toBe(actionPiece)
                expect(chess.board.getItem([2, 1])).toBe(null)
            })
        })

        describe('capturing', () => {
            describe('when there is a piece diagonally 1 tile away from and in front of the pawn', () => {
                it('captures a piece when it is white', () => {
                    chess.board.setItem([2, 1], new Knight(chess.board, 'white'))

                    const actionPiece = chess.board.getItem([1, 0])
                    const moveResult = chess.move([1, 0], [2, 1])

                    expect(moveResult).toBe(true)
                    expect(chess.board.getItem([1, 0])).toBe(null)
                    expect(chess.board.getItem([2, 1])).toBe(actionPiece)
                })

                it('does not capture a piece when it is black', () => {
                    const targetPiece = new Knight(chess.board, 'black')
                    chess.board.setItem([2, 1], targetPiece)

                    const actionPiece = chess.board.getItem([1, 0])
                    const moveResult = chess.move([1, 0], [2, 1])

                    expect(moveResult).toBe(false)
                    expect(chess.board.getItem([1, 0])).toBe(actionPiece)
                    expect(chess.board.getItem([2, 1])).toBe(targetPiece)
                })
            })
        })
    })
})
