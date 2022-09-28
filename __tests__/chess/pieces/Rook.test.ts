import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Rook } from '../../../src/chess/pieces'
import { point, pointToString } from '../../../src/chess/utils'

describe('Rook', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    it('when pawn next to the rook is removed', () => {
        const rook = board.getItem(point('a8')) as Rook
        board.setItem(point('a7'), null)
        const movesWithoutCapture = rook._movesWithoutCapture().map(pointToString)
        const movesWithCapture = rook._movesWithCapture().map(pointToString)

        expect(movesWithoutCapture).toEqual(['a7', 'a6', 'a5', 'a4', 'a3'])
        expect(movesWithCapture).toEqual(['a2'])
    })

    it('when rook is next to the enemy\'s row', () => {
        const rook = board.getItem(point('a8')) as Rook
        board.moveItem(point('a8'), point('d3'))
        const movesWithoutCapture = rook._movesWithoutCapture().map(pointToString)
        const movesWithCapture = rook._movesWithCapture().map(pointToString)

        expect(movesWithoutCapture.sort()).toEqual(['a3', 'b3', 'c3', 'd4', 'd5', 'd6', 'e3', 'f3', 'g3', 'h3'])
        expect(movesWithCapture).toEqual(['d2'])
    })
})
