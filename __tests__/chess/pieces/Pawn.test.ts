import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Knight, Pawn } from '../../../src/chess/pieces'
import { point } from '../../../src/chess/utils'

describe('Pawn', () => {
    let board: Board
    let pawn: Pawn

    beforeEach(() => {
        board = new Chess().board
    })

    describe('black pawn', () => {
        beforeEach(() => {
            pawn = board.getItem(point('a7')) as Pawn
        })

        describe('when there is no piece in front', () => {
            it('when pawn has not been moved', () => {
                expect(pawn.movesWithoutCapture()).toEqual([point('a6'), point('a5')])
                expect(pawn.movesWithCapture()).toEqual([])
            })

            it('when pawn has been moved', () => {
                pawn.moved = true

                expect(pawn.movesWithoutCapture()).toEqual([point('a6')])
                expect(pawn.movesWithCapture()).toEqual([])
            })
        })

        it('when there is a friendly piece in front', () => {
            const obstructingPiece = new Knight(board, 'black')
            board.setItem(point('a6'), obstructingPiece)
            expect(pawn.movesWithoutCapture()).toEqual([])
            expect(pawn.movesWithCapture()).toEqual([])
        })

        it('when there is a friendly piece 2 tiles away in front', () => {
            const obstructingPiece = new Knight(board, 'black')
            board.setItem(point('a5'), obstructingPiece)
            expect(pawn.movesWithoutCapture()).toEqual([point('a6')])
            expect(pawn.movesWithCapture()).toEqual([])
        })

        it('when there is an enemy piece diagonally 1 tile away from and in front of the pawn', () => {
            board.setItem(point('b6'), new Knight(board, 'white'))

            expect(pawn.movesWithoutCapture()).toEqual([point('a6'), point('a5')])
            expect(pawn.movesWithCapture()).toEqual([point('b6')])
        })

        it('when there is a friendly piece diagonally 1 tile away from and in front of the pawn', () => {
            const targetPiece = new Knight(board, 'black')
            board.setItem(point('b6'), targetPiece)

            expect(pawn.movesWithoutCapture()).toEqual([point('a6'), point('a5')])
            expect(pawn.movesWithCapture()).toEqual([])
        })
    })

    describe('white pawn', () => {
        beforeEach(() => {
            pawn = board.getItem(point('a2')) as Pawn
        })
        it('when pawn has not been moved', () => {
            expect(pawn.movesWithoutCapture()).toEqual([point('a3'), point('a4')])
            expect(pawn.movesWithCapture()).toEqual([])
        })

        it('when pawn is on a3', () => {
            board.moveItem(point('a2'), point('a3'))
            pawn.moved = true
            expect(pawn.movesWithoutCapture()).toEqual([point('a4')])
            expect(pawn.movesWithCapture()).toEqual([])
        })

        it('when pawn is on the of the board', () => {
            board.moveItem(point('a2'), point('a8'))
            expect(pawn.movesWithoutCapture()).toEqual([])
            expect(pawn.movesWithCapture()).toEqual([])
        })
    })
})
