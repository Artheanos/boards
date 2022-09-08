import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Knight, Pawn } from '../../../src/chess/pieces'
import { point } from '../../../src/chess/utils'

describe('Pawn', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    describe('moving', () => {
        describe('when there is no piece in front', () => {
            it('when pawn has not been moved', () => {
                const pawn = board.getItem(point('a7')) as Pawn
                expect(pawn.movesWithoutCapture(point('a7'))).toEqual([point('a6'), point('a5')])
                expect(pawn.movesWithCapture(point('a7'))).toEqual([])
            })

            it('when pawn has been moved', () => {
                const pawn = board.getItem(point('a7')) as Pawn
                pawn.moved = true

                expect(pawn.movesWithoutCapture(point('a7'))).toEqual([point('a6')])
                expect(pawn.movesWithCapture(point('a7'))).toEqual([])
            })
        })

        it('when there is a friendly piece in front', () => {
            const pawn = board.getItem(point('a7')) as Pawn
            const obstructingPiece = new Knight(board, 'black')
            board.setItem(point('a6'), obstructingPiece)
            expect(pawn.movesWithoutCapture(point('a7'))).toEqual([])
            expect(pawn.movesWithCapture(point('a7'))).toEqual([])
        })

        it('when there is a friendly piece 2 tiles away in front', () => {
            const pawn = board.getItem(point('a7')) as Pawn
            const obstructingPiece = new Knight(board, 'black')
            board.setItem(point('a5'), obstructingPiece)
            expect(pawn.movesWithoutCapture(point('a7'))).toEqual([point('a6')])
            expect(pawn.movesWithCapture(point('a7'))).toEqual([])
        })
    })

    it('when there is an enemy piece diagonally 1 tile away from and in front of the pawn', () => {
        board.setItem(point('b6'), new Knight(board, 'white'))
        const from = point('a7')

        const pawn = board.getItem(from) as Pawn

        expect(pawn.movesWithoutCapture(from)).toEqual([point('a6'), point('a5')])
        expect(pawn.movesWithCapture(from)).toEqual([point('b6')])
    })

    it('when there is a friendly piece diagonally 1 tile away from and in front of the pawn', () => {
        const targetPiece = new Knight(board, 'black')
        board.setItem(point('b6'), targetPiece)

        const pawn = board.getItem(point('a7')) as Pawn

        expect(pawn.movesWithoutCapture(point('a7'))).toEqual([point('a6'), point('a5')])
        expect(pawn.movesWithCapture(point('a7'))).toEqual([])
    })
})
