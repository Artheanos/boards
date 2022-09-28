import { Board } from '../../../src/chess/Board'
import { Chess } from '../../../src/chess'
import { Queen } from '../../../src/chess/pieces'
import { point, pointToString } from '../../../src/chess/utils'

describe('Queen', () => {
    let board: Board

    beforeEach(() => {
        board = new Chess().board
    })

    it('when pawn next to the queen is removed', () => {
        const queen = board.getItem(point('d8')) as Queen
        board.setItem(point('d7'), null)
        const movesWithoutCapture = queen._movesWithoutCapture().map(pointToString)
        const movesWithCapture = queen._movesWithCapture().map(pointToString)

        expect(movesWithoutCapture).toEqual(['d7', 'd6', 'd5', 'd4', 'd3'])
        expect(movesWithCapture).toEqual(['d2'])
    })

    it('when queen is next to the enemy\'s row', () => {
        const queen = board.getItem(point('d8')) as Queen
        board.moveItem(point('d8'), point('d3'))
        const movesWithoutCapture = queen._movesWithoutCapture().map(pointToString)
        const movesWithCapture = queen._movesWithCapture().map(pointToString)

        expect(movesWithoutCapture.sort()).toEqual(['a3', 'a6', 'b3', 'b5', 'c3', 'c4', 'd4', 'd5', 'd6', 'e3', 'e4', 'f3', 'f5', 'g3', 'g6', 'h3'])
        expect(movesWithCapture.sort()).toEqual(['c2', 'd2', 'e2'])
    })
})
